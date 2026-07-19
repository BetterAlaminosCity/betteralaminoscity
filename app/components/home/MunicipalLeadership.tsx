import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import type { Official } from "../../lib/content.server";

interface LeadershipEntry {
  official: Official;
  href: string;
}

export function MunicipalLeadership({
  mayor,
  legislativeHead,
}: {
  mayor: Official | null;
  legislativeHead: Official | null;
}) {
  const { t } = useTranslation();

  const entries: LeadershipEntry[] = [
    mayor ? { official: mayor, href: "/government/office-of-the-mayor" } : null,
    legislativeHead
      ? { official: legislativeHead, href: "/government/sangguniang-panlungsod" }
      : null,
  ].filter((entry): entry is LeadershipEntry => entry !== null);

  if (entries.length === 0) return null;

  return (
    <section className="bg-[var(--color-kapwa-bg-gray-default)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
          {t("home.leadership.heading")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              to={entry.href}
              className="rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6 transition-colors hover:border-[var(--color-kapwa-border-brand)]"
            >
              <p className="text-sm text-[var(--color-kapwa-text-support)]">
                {entry.official.title}
              </p>
              <p className="mt-1 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
                {entry.official.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
