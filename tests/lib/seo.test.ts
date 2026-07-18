import { describe, expect, it } from "vitest";

import { buildMeta } from "../../app/lib/seo";

describe("buildMeta", () => {
  it("builds a title suffixed with the site name and default OG tags", () => {
    const meta = buildMeta({
      title: "About",
      description: "About BetterAlaminosCity.org.",
      path: "/about",
    });

    expect(meta).toContainEqual({ title: "About | BetterAlaminosCity.org" });
    expect(meta).toContainEqual({
      name: "description",
      content: "About BetterAlaminosCity.org.",
    });
    expect(meta).toContainEqual({
      property: "og:title",
      content: "About | BetterAlaminosCity.org",
    });
    expect(meta).toContainEqual({
      property: "og:description",
      content: "About BetterAlaminosCity.org.",
    });
    expect(meta).toContainEqual({ property: "og:type", content: "website" });
    expect(meta).toContainEqual({
      property: "og:url",
      content: "https://betteralaminoscity.org/about",
    });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://betteralaminoscity.org/about",
    });
  });

  it("falls back to the site default title and root path when none is given", () => {
    const meta = buildMeta({
      description: "Community guide to Alaminos City government services.",
    });

    expect(meta).toContainEqual({
      title: "BetterAlaminosCity.org — Community Guide to Alaminos City Government Services",
    });
    expect(meta).toContainEqual({
      property: "og:url",
      content: "https://betteralaminoscity.org/",
    });
  });
});
