import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

export interface DepartmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  branchLabel?: string;
  headLine?: string;
  href: string;
  linkLabel: string;
}

export function DepartmentCard({
  icon: Icon,
  title,
  description,
  branchLabel,
  headLine,
  href,
  linkLabel,
}: DepartmentCardProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-surface-brand)]">
          <Icon className="h-5 w-5 text-[var(--color-kapwa-text-brand)]" aria-hidden="true" />
        </div>
        {branchLabel && (
          <span className="mt-1 rounded-full border border-[var(--color-kapwa-border-weak)] px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[var(--color-kapwa-text-support)]">
            {branchLabel}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-[var(--color-kapwa-text-strong)]">{title}</h3>
      <p className="grow text-sm text-[var(--color-kapwa-text-support)]">{description}</p>
      {headLine && <p className="text-sm text-[var(--color-kapwa-text-support)]">{headLine}</p>}
      <Link
        to={href}
        aria-label={`${title} – ${linkLabel}`}
        className="mt-auto text-sm font-medium text-[var(--color-kapwa-text-brand)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-kapwa-border-focus)]"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
