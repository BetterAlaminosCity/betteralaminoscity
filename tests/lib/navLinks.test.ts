import { describe, expect, it } from "vitest";

import { SITE_NAV_LINKS } from "../../app/lib/navLinks";

describe("SITE_NAV_LINKS", () => {
  it("does not include an About entry (About moved to footer-only)", () => {
    const hasAbout = SITE_NAV_LINKS.some((item) => item.to === "/about");
    expect(hasAbout).toBe(false);
  });

  it("keeps Home, Services, Government, Legislative, and Transparency as top-level links, in order", () => {
    const linkPaths = SITE_NAV_LINKS.map((item) => item.to);
    expect(linkPaths).toEqual(["/", "/services", "/government", "/legislative", "/transparency"]);
  });

  it("includes a Legislative link between Government and Transparency", () => {
    const index = SITE_NAV_LINKS.findIndex((item) => item.labelKey === "nav.legislative");
    expect(index).toBeGreaterThan(-1);
    expect(SITE_NAV_LINKS[index]).toMatchObject({ to: "/legislative" });
    expect(SITE_NAV_LINKS[index - 1]).toMatchObject({ to: "/government" });
    expect(SITE_NAV_LINKS[index + 1]).toMatchObject({ to: "/transparency" });
  });
});
