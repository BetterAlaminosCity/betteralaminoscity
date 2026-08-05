import { describe, expect, it } from "vitest";

import { SITE_NAV_LINKS } from "../../app/lib/navLinks";

describe("SITE_NAV_LINKS", () => {
  it("does not include an About entry (About moved to footer-only)", () => {
    const hasAbout = SITE_NAV_LINKS.some((item) => item.type === "link" && item.to === "/about");
    expect(hasAbout).toBe(false);
  });

  it("keeps Home, Services, Government, and Transparency as top-level links, in order", () => {
    const linkPaths = SITE_NAV_LINKS.filter((item) => item.type === "link").map((item) =>
      item.type === "link" ? item.to : null,
    );
    expect(linkPaths).toEqual(["/", "/services", "/government", "/transparency"]);
  });

  it("includes a Legislative dropdown between Government and Transparency with a single Ordinances & Resolutions item", () => {
    const index = SITE_NAV_LINKS.findIndex(
      (item) => item.type === "dropdown" && item.labelKey === "nav.legislative",
    );
    expect(index).toBeGreaterThan(-1);
    expect(SITE_NAV_LINKS[index - 1]).toMatchObject({ type: "link", to: "/government" });
    expect(SITE_NAV_LINKS[index + 1]).toMatchObject({ type: "link", to: "/transparency" });

    const legislative = SITE_NAV_LINKS[index];
    if (legislative.type === "dropdown") {
      expect(legislative.items).toEqual([
        {
          to: "/government/ordinances-resolutions",
          labelKey: "nav.legislativeOrdinancesResolutions",
        },
      ]);
    }
  });
});
