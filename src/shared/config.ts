const defaultSocialUrl = "#";

const envKeys = [
  "VITE_PROFILE_TITLE",
  "VITE_PROFILE_NAME",
  "VITE_EMAIL",
  "VITE_PHONE",
  "VITE_LINKEDIN_URL",
  "VITE_LATTES_URL",
  "VITE_GOOGLE_SCHOLAR_URL",
  "VITE_ORCID_URL",
  "VITE_GITHUB_URL",
  "VITE_INSTAGRAM_URL",
] as const;

type EnvKey = (typeof envKeys)[number];
type EnvSource = Partial<Record<EnvKey, string>>;

const runtimeEnv =
  typeof globalThis !== "undefined"
    ? (globalThis as { __SITE_ENV__?: EnvSource }).__SITE_ENV__
    : undefined;

const globalEnv: EnvSource = runtimeEnv && typeof runtimeEnv === "object" ? runtimeEnv : {};

const buildEnv: EnvSource = {
  VITE_PROFILE_TITLE: import.meta.env.VITE_PROFILE_TITLE,
  VITE_PROFILE_NAME: import.meta.env.VITE_PROFILE_NAME,
  VITE_EMAIL: import.meta.env.VITE_EMAIL,
  VITE_PHONE: import.meta.env.VITE_PHONE,
  VITE_LINKEDIN_URL: import.meta.env.VITE_LINKEDIN_URL,
  VITE_LATTES_URL: import.meta.env.VITE_LATTES_URL,
  VITE_GOOGLE_SCHOLAR_URL: import.meta.env.VITE_GOOGLE_SCHOLAR_URL,
  VITE_ORCID_URL: import.meta.env.VITE_ORCID_URL,
  VITE_GITHUB_URL: import.meta.env.VITE_GITHUB_URL,
  VITE_INSTAGRAM_URL: import.meta.env.VITE_INSTAGRAM_URL,
};

const readEnv = (key: EnvKey): string | undefined => {
  const runtimeValue = globalEnv[key];
  if (typeof runtimeValue === "string" && runtimeValue.trim().length > 0) {
    return runtimeValue.trim();
  }

  const buildValue = buildEnv[key];
  if (typeof buildValue === "string" && buildValue.trim().length > 0) {
    return buildValue.trim();
  }

  return undefined;
};

const profileTitle = readEnv("VITE_PROFILE_TITLE") || "Prof. Dr.";
const profileName = readEnv("VITE_PROFILE_NAME") || "André Luiz Marques Serrano";

const normalizeOrcidId = (url: string | undefined) => {
  if (!url || url === defaultSocialUrl) {
    return undefined;
  }

  try {
    const trimmed = url.trim().replace(/\/$/, "");
    const parts = trimmed.split("/");
    const candidate = parts[parts.length - 1]?.split(/[?#]/)[0];
    return candidate && candidate.length >= 15 ? candidate : undefined;
  } catch {
    return undefined;
  }
};

const buildPhoneHref = (phone: string) => {
  const cleaned = phone.replace(/[^+\d]/g, "");
  return cleaned ? `tel:${cleaned}` : "#";
};
const orcidUrl = readEnv("VITE_ORCID_URL") || "https://orcid.org/0000-0001-5182-0496";
const orcidId = normalizeOrcidId(orcidUrl);

export const siteConfig = {
  profileTitle,
  profileName,
  profileDisplayName: [profileTitle, profileName].filter(Boolean).join(" ").trim(),
  email: readEnv("VITE_EMAIL") || "andre.serrano@unb.br",
  phone: readEnv("VITE_PHONE") || "+55 (61) 3107-5678",
  phoneHref: buildPhoneHref(readEnv("VITE_PHONE") || "+55 (61) 3107-5678"),
  orcidId,
  social: {
    linkedin: readEnv("VITE_LINKEDIN_URL") || defaultSocialUrl,
    lattes: readEnv("VITE_LATTES_URL") || "http://lattes.cnpq.br/9297412598307091",
    googleScholar:
      readEnv("VITE_GOOGLE_SCHOLAR_URL") || "https://scholar.google.com/citations?hl=en&user=fV1m-hMAAAAJ",
    orcid: orcidUrl || "https://orcid.org/0000-0001-5182-0496",
    github: readEnv("VITE_GITHUB_URL") || defaultSocialUrl,
    instagram: readEnv("VITE_INSTAGRAM_URL") || defaultSocialUrl,
  },
};
