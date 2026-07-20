import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useSearchIndex } from "../../app/lib/useSearchIndex";
import type { SearchIndexEntry } from "../../app/lib/searchIndex.server";

const SAMPLE_INDEX: SearchIndexEntry[] = [
  {
    id: "services-business",
    title: "Business",
    description: "Business permits and licensing.",
    url: "/services/business",
    domain: "services",
    categoryTitle: "Business",
  },
  {
    id: "government-office-of-the-mayor",
    title: "Office of the Mayor",
    description: "Chief executive office.",
    url: "/government/office-of-the-mayor",
    domain: "government",
    categoryTitle: "Office of the Mayor",
  },
];

describe("useSearchIndex", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve(SAMPLE_INDEX),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches the search index and exposes the raw entries", async () => {
    const { result } = renderHook(() => useSearchIndex());

    await waitFor(() => expect(result.current.entries).toEqual(SAMPLE_INDEX));
  });

  it("search() returns fuzzy-matched entries for a query", async () => {
    const { result } = renderHook(() => useSearchIndex());

    await waitFor(() => expect(result.current.entries).toHaveLength(2));

    expect(result.current.search("Business")).toEqual([SAMPLE_INDEX[0]]);
  });

  it("search() returns an empty array for a blank query", async () => {
    const { result } = renderHook(() => useSearchIndex());

    await waitFor(() => expect(result.current.entries).toHaveLength(2));

    expect(result.current.search("   ")).toEqual([]);
  });

  it("search() returns an empty array for an unmatched query", async () => {
    const { result } = renderHook(() => useSearchIndex());

    await waitFor(() => expect(result.current.entries).toHaveLength(2));

    expect(result.current.search("zzz-no-match")).toEqual([]);
  });
});
