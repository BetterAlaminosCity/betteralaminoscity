import { SITE_URL } from "./seo";

export interface GovernmentServiceJsonLdOptions {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}

export function buildGovernmentServiceJsonLd({
  name,
  description,
  path,
  serviceType,
}: GovernmentServiceJsonLdOptions): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name,
    description,
    url: `${SITE_URL}${path}`,
    serviceType,
    areaServed: {
      "@type": "City",
      name: "Alaminos City",
    },
  };
}

export function jsonLdScriptHtml(data: unknown): { __html: string } {
  return {
    __html: JSON.stringify(data).replace(/[<>]/g, (char) => (char === "<" ? "\\u003c" : "\\u003e")),
  };
}
