import { Award, Flame, Vote, Waves, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HistoryTimelineEntry {
  year: string;
  text: string;
}

interface HistoryEra {
  heading: string;
  entries: HistoryTimelineEntry[];
}

interface HistoryFunFact {
  title: string;
  description: string;
}

const FUN_FACT_ICONS: LucideIcon[] = [Flame, Award, Vote, Waves];

export function BriefHistory() {
  const { t } = useTranslation();

  const eras = t("home.history.eras", { returnObjects: true }) as unknown as HistoryEra[];
  const funFacts = t("home.history.funFacts", {
    returnObjects: true,
  }) as unknown as HistoryFunFact[];

  const timelineRows = eras.flatMap((era) => [
    { key: era.heading, kind: "heading" as const, heading: era.heading },
    ...era.entries.map((entry) => ({
      key: `${era.heading}-${entry.year}`,
      kind: "entry" as const,
      year: entry.year,
      text: entry.text,
    })),
  ]);

  return (
    <section className="bg-[var(--color-kapwa-bg-gray-default)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
          {t("home.history.heading")}
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <ol className="flex flex-col lg:col-span-2">
            {timelineRows.map((row, index) => {
              const isLastRow = index === timelineRows.length - 1;
              return (
                <li key={row.key} className="flex gap-4">
                  <div className="flex w-5 shrink-0 flex-col items-center">
                    {row.kind === "entry" ? (
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-kapwa-bg-brand-default)]" />
                    ) : null}
                    {isLastRow ? null : (
                      <span className="w-px flex-1 bg-[var(--color-kapwa-border-weak)]" />
                    )}
                  </div>
                  {row.kind === "heading" ? (
                    <h3 className="pb-3 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
                      {row.heading}
                    </h3>
                  ) : (
                    <div className="flex-1 pb-6">
                      <div className="rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-4">
                        <span className="inline-block rounded-full bg-[var(--color-kapwa-bg-brand-default)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-kapwa-text-inverse)]">
                          {row.year}
                        </span>
                        <p className="mt-2 text-sm text-[var(--color-kapwa-text-support)]">
                          {row.text}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="flex flex-col gap-4">
            {funFacts.map((fact, index) => {
              const Icon = FUN_FACT_ICONS[index];
              return (
                <div
                  key={fact.title}
                  className="rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-brand-default)]">
                    <Icon
                      className="h-5 w-5 text-[var(--color-kapwa-text-inverse)]"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                    {fact.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-kapwa-text-support)]">
                    {fact.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-8 text-sm text-[var(--color-kapwa-text-support)]">
          {t("home.history.sourceLine")}
        </p>
      </div>
    </section>
  );
}
