import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useLoaderData } from "react-router";

import { DataSourceNote } from "../../components/ui/DataSourceNote";
import { getLegislativeDocuments, type LegislativeDocument } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/ordinances-resolutions";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    title: "Ordinances & Resolutions",
    description: "Searchable list of Alaminos City ordinances and resolutions.",
    path: "/government/ordinances-resolutions",
  });
}

export function loader() {
  const data = getLegislativeDocuments();
  if (!data) throw new Response("Not Found", { status: 404 });
  return data;
}

function documentYear(document: LegislativeDocument): string {
  return document.date.slice(0, 4);
}

export default function OrdinancesResolutions() {
  const { documents, lastUpdated, source } = useLoaderData<typeof loader>();
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  const years = useMemo(
    () =>
      Array.from(new Set(documents.map(documentYear))).sort((a, b) => b.localeCompare(a)),
    [documents],
  );

  const fuse = useMemo(
    () =>
      new Fuse(documents, {
        keys: ["title", "number"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [documents],
  );

  const keywordFiltered = keyword.trim()
    ? fuse.search(keyword).map((result) => result.item)
    : documents;
  const results = year
    ? keywordFiltered.filter((document) => documentYear(document) === year)
    : keywordFiltered;

  return (
    <section>
      <h1>Ordinances & Resolutions</h1>
      <DataSourceNote lastUpdated={lastUpdated} source={source} />

      <label>
        Keyword
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search by title or number"
        />
      </label>

      <label>
        Year
        <select value={year} onChange={(event) => setYear(event.target.value)}>
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {results.map((document) => (
          <li key={document.id}>
            <a href={document.link}>
              {document.type === "ordinance" ? "Ordinance" : "Resolution"} No.{" "}
              {document.number}: {document.title}
            </a>
            <p>
              {document.date} — {document.status}
            </p>
          </li>
        ))}
      </ul>
      {results.length === 0 && <p>No matching ordinances or resolutions found.</p>}
    </section>
  );
}
