import { describe, expect, it } from "vitest";

import {
  getCityStatistics,
  getFiscalTransparency,
  getLegislativeDocuments,
  listCategories,
} from "../../app/lib/content.server";
import { validateContentTree } from "../../app/lib/contentValidation.server";

describe("real content tree", () => {
  it("has no schema validation issues", () => {
    expect(validateContentTree("content")).toEqual([]);
  });

  it("has all 16 seeded service categories", () => {
    expect(listCategories("services")).toHaveLength(16);
  });

  it("includes the Civil Registry & Vital Records category", () => {
    const category = listCategories("services").find(
      (c) => c.slug === "civil-registry-vital-records",
    );
    expect(category?.title).toBe("Civil Registry & Vital Records");
  });

  it("includes the Taxes & Payments category", () => {
    const category = listCategories("services").find((c) => c.slug === "taxes-payments");
    expect(category?.title).toBe("Taxes & Payments");
  });

  it("includes the Community Facilities & Events category", () => {
    const category = listCategories("services").find(
      (c) => c.slug === "community-facilities-events",
    );
    expect(category?.title).toBe("Community Facilities & Events");
  });

  it("includes the Transportation & Public Safety category", () => {
    const category = listCategories("services").find(
      (c) => c.slug === "transportation-public-safety",
    );
    expect(category?.title).toBe("Transportation & Public Safety");
  });

  it("includes the Tourism category", () => {
    const category = listCategories("services").find((c) => c.slug === "tourism");
    expect(category?.title).toBe("Tourism");
  });

  it("includes the Markets & Public Cemetery category", () => {
    const category = listCategories("services").find((c) => c.slug === "markets-public-cemetery");
    expect(category?.title).toBe("Markets & Public Cemetery");
  });

  it("has all 6 seeded government categories", () => {
    expect(listCategories("government")).toHaveLength(6);
  });

  it("has valid civic transparency data", () => {
    expect(getFiscalTransparency("content")).not.toBeNull();
    expect(getLegislativeDocuments("content")?.documents.length).toBeGreaterThan(0);
    expect(getCityStatistics("content")).not.toBeNull();
  });
});
