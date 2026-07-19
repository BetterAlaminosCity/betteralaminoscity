import { useTranslation } from "react-i18next";

import type { CityStatistics } from "../../lib/content.server";

export function CityAtAGlance({ statistics }: { statistics: CityStatistics | null }) {
  const { t } = useTranslation();

  if (!statistics) return null;

  const topIndicators = statistics.economicIndicators.slice(0, 3);

  return (
    <section className="bg-[var(--color-kapwa-bg-gray-default)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
          {t("home.cityAtAGlance.heading")}
        </h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <dt className="text-sm text-[var(--color-kapwa-text-support)]">
              {t("home.cityAtAGlance.population")}
            </dt>
            <dd className="text-2xl font-extrabold text-[var(--color-kapwa-text-brand)]">
              {statistics.totalPopulation}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-[var(--color-kapwa-text-support)]">
              {t("home.cityAtAGlance.barangays")}
            </dt>
            <dd className="text-2xl font-extrabold text-[var(--color-kapwa-text-brand)]">
              {statistics.barangays.length}
            </dd>
          </div>
          {topIndicators.map((indicator) => (
            <div key={indicator.label}>
              <dt className="text-sm text-[var(--color-kapwa-text-support)]">{indicator.label}</dt>
              <dd className="text-2xl font-extrabold text-[var(--color-kapwa-text-brand)]">
                {indicator.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
