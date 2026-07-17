import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { SearchIndexEntry } from "../lib/searchIndex.server";
import type { Route } from "./+types/search";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    title: "Search",
    description:
      "Search services, government offices, and legislative documents on BetterAlaminosCity.org.",
    path: "/search",
  });
}

export default function Search() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<SearchIndexEntry[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: SearchIndexEntry[]) => setEntries(data));
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

  const trimmedQuery = query.trim();
  const results = trimmedQuery ? fuse.search(trimmedQuery).map((result) => result.item) : [];

  return (
    <section>
      <h1>{t("search.title")}</h1>
      <input
        type="search"
        aria-label={t("search.inputLabel")}
        placeholder={t("search.placeholder")}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {trimmedQuery && results.length === 0 && <p>{t("search.noResults")}</p>}
      <ul>
        {results.map((entry) => (
          <li key={entry.id}>
            <a href={entry.url}>{entry.title}</a>
            <p>{entry.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
