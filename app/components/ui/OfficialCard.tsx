import { Link } from "react-router";

import type { Official } from "../../lib/content.server";

const BASE_CLASS_NAME =
  "rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6 transition-colors hover:border-[var(--color-kapwa-border-brand)]";

export interface OfficialCardProps {
  official: Official;
  href: string;
  className?: string;
}

export function OfficialCard({ official, href, className }: OfficialCardProps) {
  return (
    <Link to={href} className={className ? `${BASE_CLASS_NAME} ${className}` : BASE_CLASS_NAME}>
      <p className="text-sm text-[var(--color-kapwa-text-support)]">{official.title}</p>
      <p className="mt-1 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {official.name}
      </p>
    </Link>
  );
}
