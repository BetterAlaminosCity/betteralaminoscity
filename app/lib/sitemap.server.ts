import { SITE_URL } from "./seo";

export function buildSitemapXml(paths: string[]): string {
  const urls = paths
    .map((path) => `  <url>\n    <loc>${SITE_URL}${path === "/" ? "" : path}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobotsTxt(): string {
  return `User-agent: *\nAllow: /\nDisallow: /404\nDisallow: /403\nDisallow: /500\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
