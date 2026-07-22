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

  it("has all 11 seeded service categories", () => {
    expect(listCategories("services")).toHaveLength(11);
  });

  it("includes the Civil Registry & Vital Records category", () => {
    const category = listCategories("services").find(
      (c) => c.slug === "civil-registry-vital-records",
    );
    expect(category?.title).toBe("Civil Registry & Vital Records");
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
