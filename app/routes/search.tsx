import { useState } from "react";
import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import { useSearchIndex } from "../lib/useSearchIndex";
import type { Route } from "./+types/search";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Search",
    description:
      "Search services, government offices, and legislative documents on BetterAlaminosCity.org.",
    path: "/search",
  });
}

export default function Search() {
  const { t } = useTranslation();
  const { search } = useSearchIndex();
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  const results = trimmedQuery ? search(query) : [];

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
