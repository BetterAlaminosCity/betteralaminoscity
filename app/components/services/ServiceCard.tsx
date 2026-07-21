import { Link } from "react-router";

export interface ServiceCardProps {
  title: string;
  description: string;
  classification?: string;
  totalProcessingTime?: string;
  href: string;
  linkLabel: string;
}

export function ServiceCard({
  title,
  description,
  classification,
  totalProcessingTime,
  href,
  linkLabel,
}: ServiceCardProps) {
  return (
    <Link
      to={href}
      className="flex h-full flex-col gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6 transition-colors hover:border-[var(--color-kapwa-border-brand)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-kapwa-border-focus)]"
    >
      <h3 className="text-lg font-semibold text-[var(--color-kapwa-text-strong)]">{title}</h3>
      <p className="text-sm text-[var(--color-kapwa-text-support)]">{description}</p>
      {classification || totalProcessingTime ? (
        <div className="flex flex-wrap items-center gap-2">
          {classification ? (
            <span className="rounded-full bg-[var(--color-kapwa-bg-gray-default)] px-2.5 py-1 text-xs font-medium text-[var(--color-kapwa-text-support)]">
              {classification}
            </span>
          ) : null}
          {totalProcessingTime ? (
            <span className="rounded-full bg-[var(--color-kapwa-bg-gray-default)] px-2.5 py-1 text-xs font-medium text-[var(--color-kapwa-text-support)]">
              {totalProcessingTime}
            </span>
          ) : null}
        </div>
      ) : null}
      <span className="mt-auto text-sm font-medium text-[var(--color-kapwa-text-brand)]">
        {linkLabel} →
      </span>
    </Link>
  );
}
