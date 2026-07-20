import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

import type { SearchIndexEntry } from "./searchIndex.server";

export interface UseSearchIndexResult {
  entries: SearchIndexEntry[];
  search: (query: string) => SearchIndexEntry[];
}

export function useSearchIndex(): UseSearchIndexResult {
  const [entries, setEntries] = useState<SearchIndexEntry[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: SearchIndexEntry[]) => setEntries(data))
      .catch((error) => {
        console.error("Failed to load search index:", error);
      });
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: ["title", "description", "categoryTitle"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [entries],
  );

  function search(query: string): SearchIndexEntry[] {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return fuse.search(trimmed).map((result) => result.item);
  }

  return { entries, search };
}
