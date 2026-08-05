import { useMemo, useState } from "react";
import Fuse from "fuse.js";

import { DataSourceNote } from "../ui/DataSourceNote";
import type { LegislativeDocument } from "../../lib/content.server";

export interface LegislativeDocumentListProps {
  documents: LegislativeDocument[];
  lastUpdated: string;
  source: string;
  keywordLabel: string;
  keywordPlaceholder: string;
  yearLabel: string;
  allYearsLabel: string;
  emptyMessage: string;
}

function documentYear(document: LegislativeDocument): string {
  return document.date.slice(0, 4);
}

export function LegislativeDocumentList({
  documents,
  lastUpdated,
  source,
  keywordLabel,
  keywordPlaceholder,
  yearLabel,
  allYearsLabel,
  emptyMessage,
}: LegislativeDocumentListProps) {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  const years = useMemo(
    () => Array.from(new Set(documents.map(documentYear))).sort((a, b) => b.localeCompare(a)),
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
    <>
      <DataSourceNote lastUpdated={lastUpdated} source={source} />

      <label>
        {keywordLabel}
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder={keywordPlaceholder}
        />
      </label>

      <label>
        {yearLabel}
        <select value={year} onChange={(event) => setYear(event.target.value)}>
          <option value="">{allYearsLabel}</option>
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
              No. {document.number}: {document.title}
            </a>
            <p>
              {document.date} — {document.status}
            </p>
          </li>
        ))}
      </ul>
      {results.length === 0 && <p>{emptyMessage}</p>}
    </>
  );
}
