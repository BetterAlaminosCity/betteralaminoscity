const SITE_NAME = "BetterAlaminosCity.org";
const SITE_URL = "https://betteralaminoscity.org";
const DEFAULT_TITLE = `${SITE_NAME} — Community Guide to Alaminos City Government Services`;

export interface SeoOptions {
  title?: string;
  description: string;
  type?: "website" | "article";
  path?: string;
}

export interface MetaDescriptor {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  tagName?: "link";
  rel?: string;
  href?: string;
}

export function buildMeta({
  title,
  description,
  type = "website",
  path = "/",
}: SeoOptions): MetaDescriptor[] {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const fullUrl = `${SITE_URL}${path}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:url", content: fullUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { tagName: "link", rel: "canonical", href: fullUrl },
  ];
}
