import { Link } from "react-router";

import type { Official } from "../../lib/content.server";

export type OfficialCardAccent = "brand" | "purple";

const BASE_CLASS_NAME =
  "block rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6 text-center transition-colors hover:border-[var(--color-kapwa-border-brand)]";

const BADGE_CLASS_NAME: Record<OfficialCardAccent, string> = {
  brand: "bg-[var(--color-kapwa-bg-surface-brand)] text-[var(--color-kapwa-text-brand-bold)]",
  purple: "bg-[var(--color-role-legislative-bg)] text-[var(--color-role-legislative-text)]",
};

export interface OfficialCardProps {
  official: Official;
  href: string;
  accent?: OfficialCardAccent;
  className?: string;
}

export function OfficialCard({ official, href, accent = "brand", className }: OfficialCardProps) {
  const classNames = [BASE_CLASS_NAME, className].filter(Boolean).join(" ");

  return (
    <Link to={href} className={classNames}>
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${BADGE_CLASS_NAME[accent]}`}
      >
        {official.title}
      </span>
      <p className="mt-3 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {official.name}
      </p>
    </Link>
  );
}
