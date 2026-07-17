import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  validateArticleFrontmatter,
  validateCategory,
  validateContentTree,
  validateOfficial,
} from "../../app/lib/contentValidation.server";

describe("validateCategory", () => {
  it("accepts a category with title and description", () => {
    expect(
      validateCategory({ title: "Health Services", description: "Public health programs." }),
    ).toEqual([]);
  });

  it("rejects a category missing description", () => {
    expect(validateCategory({ title: "Health Services" })).not.toEqual([]);
  });
});

describe("validateArticleFrontmatter", () => {
  it("accepts frontmatter with title and description", () => {
    expect(
      validateArticleFrontmatter({ title: "Overview", description: "An overview." }),
    ).toEqual([]);
  });

  it("rejects frontmatter missing title", () => {
    expect(validateArticleFrontmatter({ description: "An overview." })).not.toEqual([]);
  });
});

describe("validateOfficial", () => {
  it("accepts an official with name and title", () => {
    expect(validateOfficial({ name: "{PLACEHOLDER}", title: "City Mayor" })).toEqual([]);
  });

  it("rejects an official missing name", () => {
    expect(validateOfficial({ title: "City Mayor" })).not.toEqual([]);
  });
});

describe("validateContentTree", () => {
  it("reports no issues for a valid content tree", () => {
    const contentRoot = path.join(import.meta.dirname, "../fixtures/content-valid");
    expect(validateContentTree(contentRoot)).toEqual([]);
  });

  it("reports an issue for a category missing a required field", () => {
    const contentRoot = path.join(import.meta.dirname, "../fixtures/content-invalid");
    const issues = validateContentTree(contentRoot);
    expect(issues).toHaveLength(1);
    expect(issues[0].file).toContain("index.yaml");
  });
});
