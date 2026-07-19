import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

export interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export function CategoryCard({
  icon: Icon,
  title,
  description,
  href,
  linkLabel,
}: CategoryCardProps) {
  return (
    <Link
      to={href}
      className="flex h-full flex-col gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6 transition-colors hover:border-[var(--color-kapwa-border-brand)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-kapwa-border-focus)]"
    >
      <Icon className="h-8 w-8 text-[var(--color-kapwa-text-brand)]" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-[var(--color-kapwa-text-strong)]">{title}</h3>
      <p className="text-sm text-[var(--color-kapwa-text-support)]">{description}</p>
      <span className="mt-auto text-sm font-medium text-[var(--color-kapwa-text-brand)]">
        {linkLabel} →
      </span>
    </Link>
  );
}
