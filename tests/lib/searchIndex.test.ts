import path from "node:path";
import { describe, expect, it } from "vitest";

import { buildSearchIndex } from "../../app/lib/searchIndex.server";

const FIXTURE_ROOT = path.join(import.meta.dirname, "../fixtures/content-valid");

describe("buildSearchIndex", () => {
  it("includes an entry for each category and article in both domains", () => {
    const index = buildSearchIndex(FIXTURE_ROOT);
    const urls = index.map((entry) => entry.url);

    expect(urls).toContain("/services/sample-category");
    expect(urls).toContain("/services/sample-category/overview");
    expect(urls).toContain("/government/sample-office");
    expect(urls).toContain("/government/sample-office/overview");
  });

  it("includes an entry for each legislative document", () => {
    const index = buildSearchIndex(FIXTURE_ROOT);
    const legislativeEntries = index.filter((entry) => entry.domain === "legislative");

    expect(legislativeEntries).toHaveLength(1);
    expect(legislativeEntries[0].url).toBe("https://example.com/ordinances/2025-01.pdf");
  });
});
