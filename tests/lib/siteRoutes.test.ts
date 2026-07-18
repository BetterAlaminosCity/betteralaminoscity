import path from "node:path";
import { describe, expect, it } from "vitest";

import { STATIC_ROUTES, contentPaths, getAllRoutePaths } from "../../app/lib/siteRoutes.server";

const FIXTURE_ROOT = path.join(import.meta.dirname, "../fixtures/content-valid");

describe("STATIC_ROUTES", () => {
  it("includes the core top-level and civic transparency pages", () => {
    expect(STATIC_ROUTES).toEqual([
      "/",
      "/about",
      "/services",
      "/government",
      "/government/transparency",
      "/government/ordinances-resolutions",
      "/government/statistics",
      "/search",
    ]);
  });
});

describe("contentPaths", () => {
  it("lists category and article paths for a domain", () => {
    expect(contentPaths("services", FIXTURE_ROOT)).toEqual([
      "/services/sample-category",
      "/services/sample-category/overview",
    ]);
  });

  it("excludes the civic-data folders from the government domain", () => {
    expect(contentPaths("government", FIXTURE_ROOT)).toEqual([
      "/government/sample-office",
      "/government/sample-office/overview",
    ]);
  });
});

describe("getAllRoutePaths", () => {
  it("combines static routes with services and government content paths", () => {
    expect(getAllRoutePaths(FIXTURE_ROOT)).toEqual([
      ...STATIC_ROUTES,
      "/services/sample-category",
      "/services/sample-category/overview",
      "/government/sample-office",
      "/government/sample-office/overview",
    ]);
  });
});
