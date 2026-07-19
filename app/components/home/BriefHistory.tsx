import { useTranslation } from "react-i18next";

// Placeholder narrative copy — replace with sourced/verified history
// before this project treats this section as factually authoritative.
export function BriefHistory() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
        {t("home.history.heading")}
      </h2>
      <p className="mt-4 max-w-3xl text-base text-[var(--color-kapwa-text-support)]">
        {t("home.history.body")}
      </p>
    </section>
  );
}
