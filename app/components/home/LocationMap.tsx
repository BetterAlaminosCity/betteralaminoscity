import { useTranslation } from "react-i18next";

const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=119.9179%2C16.1147%2C120.0379%2C16.1947&layer=mapnik&marker=16.1547%2C119.9779";

export function LocationMap() {
  const { t } = useTranslation();
  const heading = t("home.map.heading");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-8 overflow-hidden rounded-lg border border-[var(--color-kapwa-border-weak)]">
        <iframe title={heading} src={MAP_EMBED_SRC} className="h-96 w-full" loading="lazy" />
      </div>
    </section>
  );
}
