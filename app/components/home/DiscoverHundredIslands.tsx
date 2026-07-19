import { useTranslation } from "react-i18next";

export function DiscoverHundredIslands() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-kapwa-brand-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
          {t("home.hundredIslands.eyebrow")}
        </p>
        <h2 className="mt-2 max-w-2xl text-2xl font-bold text-kapwa-brand-950 sm:text-3xl">
          {t("home.hundredIslands.heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-[var(--color-kapwa-text-support)]">
          {t("home.hundredIslands.body")}
        </p>
      </div>
    </section>
  );
}
