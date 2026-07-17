import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  getArticle,
  getCategory,
  getOfficial,
  listArticles,
  listCategories,
} from "../../app/lib/content.server";

const FIXTURE_ROOT = path.join(import.meta.dirname, "../fixtures/content-valid");

describe("listCategories", () => {
  it("lists categories for the services domain from the content tree", () => {
    const categories = listCategories("services", FIXTURE_ROOT);
    expect(categories).toEqual([
      {
        slug: "sample-category",
        title: "Sample Category",
        description:
          "A sample category used for testing the content loader and schema validation.",
      },
    ]);
  });

  it("includes the branch field for government categories", () => {
    const categories = listCategories("government", FIXTURE_ROOT);
    expect(categories).toEqual([
      {
        slug: "sample-office",
        title: "Sample Office",
        description: "A sample government office used for testing.",
        branch: "executive",
      },
    ]);
  });
});

describe("getCategory", () => {
  it("returns the category matching the slug", () => {
    const category = getCategory("services", "sample-category", FIXTURE_ROOT);
    expect(category?.title).toBe("Sample Category");
  });

  it("returns null for an unknown slug", () => {
    expect(getCategory("services", "does-not-exist", FIXTURE_ROOT)).toBeNull();
  });
});

describe("listArticles / getArticle", () => {
  it("lists articles in a category with parsed frontmatter and body", () => {
    const articles = listArticles("services", "sample-category", FIXTURE_ROOT);
    expect(articles).toEqual([
      {
        slug: "overview",
        categorySlug: "sample-category",
        domain: "services",
        title: "Overview",
        description: "A sample article used for testing.",
        body: "This is sample article body content used only in tests.",
      },
    ]);
  });

  it("returns null for an unknown article slug", () => {
    expect(
      getArticle("services", "sample-category", "does-not-exist", FIXTURE_ROOT),
    ).toBeNull();
  });
});

describe("getOfficial", () => {
  it("returns the official for a government category", () => {
    expect(getOfficial("sample-office", FIXTURE_ROOT)).toEqual({
      name: "{PLACEHOLDER}",
      title: "Sample Official",
    });
  });

  it("returns null when no official.json exists for the category", () => {
    expect(getOfficial("does-not-exist", FIXTURE_ROOT)).toBeNull();
  });
});
