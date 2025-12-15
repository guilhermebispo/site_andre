export type OrcidExternalId = {
  type: string;
  value: string;
  url?: string;
};

export type OrcidWork = {
  putCode: string;
  title: string;
  journal?: string;
  year?: string;
  type?: string;
  url?: string;
  externalIds: OrcidExternalId[];
  source?: string;
  authors?: string[];
};

const ORCID_BASE_URL = "https://pub.orcid.org/v3.0";

const generateFallbackId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `orcid-${Math.random().toString(36).slice(2, 10)}`;
};

const getWorkYear = (summary: any) => {
  const publicationDate = summary?.["publication-date"] || {};
  const yearValue = publicationDate?.year?.value || publicationDate?.year || publicationDate?.["year"]?.value;
  return typeof yearValue === "string" ? yearValue : yearValue ? String(yearValue) : undefined;
};

const extractExternalIds = (summary: any): OrcidExternalId[] => {
  const externalIds = summary?.["external-ids"]?.["external-id"];
  if (!Array.isArray(externalIds)) {
    return [];
  }

  return externalIds
    .map((entry: any) => {
      const type = entry?.["external-id-type"]?.toString() || "unknown";
      const value = entry?.["external-id-value"]?.toString();
      const url = entry?.["external-id-url"]?.value?.toString() || entry?.["external-id-url"]?.toString();

      if (!value) {
        return undefined;
      }

      return {
        type,
        value,
        url: url || undefined,
      } satisfies OrcidExternalId;
    })
    .filter(Boolean) as OrcidExternalId[];
};

const buildWorkUrl = (summary: any, externalIds: OrcidExternalId[]) => {
  const summaryUrl = summary?.url?.value?.toString() || summary?.url?.toString();
  if (summaryUrl) {
    return summaryUrl;
  }

  const doi = externalIds.find((id) => id.type.toLowerCase() === "doi");
  if (doi) {
    return `https://doi.org/${doi.value}`;
  }

  return undefined;
};

const extractContributors = (summary: any): string[] => {
  const contributors = summary?.contributors?.contributor;
  if (!Array.isArray(contributors)) {
    return [];
  }

  const names = contributors
    .map((entry: any) => {
      const creditName = entry?.["credit-name"]?.value?.toString();
      if (creditName) {
        return creditName.trim();
      }

      const orcidPath = entry?.["contributor-orcid"]?.path?.toString();
      if (orcidPath) {
        return orcidPath.trim();
      }

      const email = entry?.["contributor-email"]?.value?.toString();
      if (email) {
        return email.trim();
      }

      return undefined;
    })
    .filter((value: string | undefined): value is string => Boolean(value));

  const unique = Array.from(new Set(names)).slice(0, 12);
  return unique;
};

const mapSummaryToWork = (summary: any): OrcidWork | undefined => {
  if (!summary) {
    return undefined;
  }

  const putCode = summary?.["put-code"]?.toString() || generateFallbackId();
  const title = summary?.title?.title?.value?.toString() || "Publicação sem título";
  const journal = summary?.["journal-title"]?.value?.toString();
  const year = getWorkYear(summary);
  const type = summary?.type?.toString();
  const externalIds = extractExternalIds(summary);
  const url = buildWorkUrl(summary, externalIds);
  const source = summary?.source?.["source-name"]?.value?.toString();
  const authors = extractContributors(summary);

  return {
    putCode,
    title,
    journal,
    year,
    type,
    url,
    externalIds,
    source,
    authors,
  } satisfies OrcidWork;
};

const enrichWorkWithDetail = async (orcidId: string, work: OrcidWork): Promise<OrcidWork> => {
  const hasAuthors = Array.isArray(work.authors) && work.authors.length > 0;
  const hasJournal = Boolean(work.journal);
  const hasPutCode = Boolean(work.putCode) && !work.putCode.startsWith("fallback-");

  if ((hasAuthors && hasJournal) || !hasPutCode) {
    return work;
  }

  try {
    const response = await fetch(`${ORCID_BASE_URL}/${encodeURIComponent(orcidId)}/work/${encodeURIComponent(work.putCode)}`, {
      headers: {
        Accept: "application/vnd.orcid+json",
      },
    });

    if (!response.ok) {
      return work;
    }

    const detail = await response.json();
    const detailExternalIds = extractExternalIds(detail);
    const detailAuthors = extractContributors(detail);
    const detailJournal = detail?.["journal-title"]?.value?.toString();
    const detailSource = detail?.source?.["source-name"]?.value?.toString();
    const detailYear = getWorkYear(detail);
    const detailUrl = buildWorkUrl(detail, detailExternalIds);

    return {
      ...work,
      journal: detailJournal || work.journal,
      source: detailSource || work.source,
      year: detailYear || work.year,
      url: detailUrl || work.url,
      externalIds: work.externalIds.length > 0 ? work.externalIds : detailExternalIds,
      authors: detailAuthors.length > 0 ? detailAuthors : work.authors,
    } satisfies OrcidWork;
  } catch {
    return work;
  }
};

export async function fetchOrcidWorks(orcidId: string): Promise<OrcidWork[]> {
  if (!orcidId) {
    return [];
  }

  const response = await fetch(`${ORCID_BASE_URL}/${encodeURIComponent(orcidId)}/works`, {
    headers: {
      Accept: "application/vnd.orcid+json",
    },
  });

  if (!response.ok) {
    const error = new Error(`ORCID request failed with status ${response.status}`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const payload = await response.json();
  const groups = Array.isArray(payload?.group) ? payload.group : [];

  const works: OrcidWork[] = groups
    .map((group: any) => {
      const summary = Array.isArray(group?.["work-summary"]) ? group["work-summary"][0] : undefined;
      return mapSummaryToWork(summary);
    })
    .filter(Boolean) as OrcidWork[];

  works.sort((a, b) => {
    const yearA = a.year ? parseInt(a.year, 10) : Number.NEGATIVE_INFINITY;
    const yearB = b.year ? parseInt(b.year, 10) : Number.NEGATIVE_INFINITY;
    return yearB - yearA;
  });

  const topWorks = works.slice(0, 8);
  const enriched = await Promise.all(topWorks.map((work) => enrichWorkWithDetail(orcidId, work)));
  return enriched;
}
