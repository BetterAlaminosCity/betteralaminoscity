import { Info } from "lucide-react";

export function DataSourceNote({ lastUpdated, source }: { lastUpdated: string; source: string }) {
  return (
    <p
      role="note"
      className="flex items-start gap-2 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-gray-default)] px-4 py-2.5 text-sm text-[var(--color-kapwa-text-support)]"
    >
      <Info
        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-kapwa-text-info)]"
        aria-hidden="true"
      />
      <span>
        <strong className="font-semibold text-[var(--color-kapwa-text-strong)]">
          Data last updated:
        </strong>{" "}
        {lastUpdated} — <em className="not-italic">{source}</em>
      </span>
    </p>
  );
}
