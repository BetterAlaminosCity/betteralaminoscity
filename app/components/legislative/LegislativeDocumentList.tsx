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
  numberHeader: string;
  titleHeader: string;
  dateHeader: string;
  statusHeader: string;
}

const STATUS_BADGE_STYLES: Record<string, string> = {
  Enacted:
    "border-[var(--color-kapwa-border-success)] bg-[var(--color-kapwa-bg-success-weak)] text-[var(--color-kapwa-text-success)]",
  Adopted:
    "border-[var(--color-kapwa-border-success)] bg-[var(--color-kapwa-bg-success-weak)] text-[var(--color-kapwa-text-success)]",
  Pending:
    "border-[var(--color-kapwa-border-info)] bg-[var(--color-kapwa-bg-info-weak)] text-[var(--color-kapwa-text-info)]",
};
const DEFAULT_STATUS_BADGE =
  "border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-gray-default)] text-[var(--color-kapwa-text-support)]";

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
  numberHeader,
  titleHeader,
  dateHeader,
  statusHeader,
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

      <div className="mt-6 flex flex-wrap gap-4">
        <label className="min-w-[200px] flex-1">
          <span className="mb-1 block text-sm font-medium text-[var(--color-kapwa-text-strong)]">
            {keywordLabel}
          </span>
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={keywordPlaceholder}
            className="w-full rounded-md border border-[var(--color-kapwa-border-weak)] px-4 py-2.5 text-sm text-[var(--color-kapwa-text-strong)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-kapwa-border-focus)]"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-[var(--color-kapwa-text-strong)]">
            {yearLabel}
          </span>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="rounded-md border border-[var(--color-kapwa-border-weak)] px-4 py-2.5 text-sm text-[var(--color-kapwa-text-strong)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-kapwa-border-focus)]"
          >
            <option value="">{allYearsLabel}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-kapwa-border-weak)]">
                <th className="py-2 pr-4 font-semibold text-[var(--color-kapwa-text-support)]">
                  {numberHeader}
                </th>
                <th className="py-2 pr-4 font-semibold text-[var(--color-kapwa-text-support)]">
                  {titleHeader}
                </th>
                <th className="py-2 pr-4 font-semibold text-[var(--color-kapwa-text-support)]">
                  {dateHeader}
                </th>
                <th className="py-2 font-semibold text-[var(--color-kapwa-text-support)]">
                  {statusHeader}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-kapwa-border-weak)]">
              {results.map((document) => (
                <tr key={document.id}>
                  <td className="py-3 pr-4 whitespace-nowrap text-[var(--color-kapwa-text-support)]">
                    {document.number}
                  </td>
                  <td className="py-3 pr-4 font-medium">
                    <a
                      href={document.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--color-kapwa-text-brand)] hover:underline"
                    >
                      {document.title}
                    </a>
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-[var(--color-kapwa-text-support)]">
                    {document.date}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                        STATUS_BADGE_STYLES[document.status] ?? DEFAULT_STATUS_BADGE
                      }`}
                    >
                      {document.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-[var(--color-kapwa-text-support)]">{emptyMessage}</p>
      )}
    </>
  );
}
