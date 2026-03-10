const defaultSocialUrl = "#";

const profileTitle = "Prof. Dr.";
const profileName = "André Luiz Marques Serrano";
const email = "andrelms@unb.br";
const phone = "+55 (61) 98127-9890";
const social = {
  linkedin: "https://www.linkedin.com/in/andre-serrano-b211061b3/",
  lattes: "http://lattes.cnpq.br/9297412598307091",
  googleScholar: "https://scholar.google.com/citations?user=fV1m-hMAAAAJ&hl=pt-BR&oi=ao",
  orcid: "https://orcid.org/0000-0001-5182-0496",
  github: "https://github.com/andrelmsunb",
  instagram: defaultSocialUrl,
};

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
const orcidUrl = social.orcid;
const orcidId = normalizeOrcidId(orcidUrl);

export const siteConfig = {
  profileTitle,
  profileName,
  profileDisplayName: [profileTitle, profileName].filter(Boolean).join(" ").trim(),
  email,
  phone,
  phoneHref: buildPhoneHref(phone),
  orcidId,
  social,
};
