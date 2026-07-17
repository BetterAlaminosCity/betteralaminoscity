import { describe, expect, it } from "vitest";

import { listCategories } from "../../app/lib/content.server";
import { validateContentTree } from "../../app/lib/contentValidation.server";

describe("real content tree", () => {
  it("has no schema validation issues", () => {
    expect(validateContentTree("content")).toEqual([]);
  });

  it("has all 10 seeded service categories", () => {
    expect(listCategories("services")).toHaveLength(10);
  });
});
