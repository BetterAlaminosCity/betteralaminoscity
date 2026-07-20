import { useTranslation } from "react-i18next";

import type { Official } from "../../lib/content.server";
import { OfficialCard } from "../ui/OfficialCard";

interface LeadershipEntry {
  official: Official;
  href: string;
}

export function CityLeadership({
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
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
          {t("home.leadership.heading")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {entries.map((entry) => (
            <OfficialCard key={entry.href} official={entry.official} href={entry.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
