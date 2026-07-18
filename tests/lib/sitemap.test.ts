import { describe, expect, it } from "vitest";

import { buildRobotsTxt, buildSitemapXml } from "../../app/lib/sitemap.server";

describe("buildSitemapXml", () => {
  it("wraps each path in a <url><loc> entry using the site origin", () => {
    const xml = buildSitemapXml(["/", "/about", "/services/business"]);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain("<loc>https://betteralaminoscity.org</loc>");
    expect(xml).toContain("<loc>https://betteralaminoscity.org/about</loc>");
    expect(xml).toContain("<loc>https://betteralaminoscity.org/services/business</loc>");
  });
});

describe("buildRobotsTxt", () => {
  it("allows crawling, points to the sitemap, and disallows the error pages", () => {
    const robots = buildRobotsTxt();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Disallow: /404");
    expect(robots).toContain("Disallow: /403");
    expect(robots).toContain("Disallow: /500");
    expect(robots).toContain("Sitemap: https://betteralaminoscity.org/sitemap.xml");
  });
});
