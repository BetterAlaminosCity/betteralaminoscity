import { Link } from "react-router";
import { useTranslation } from "react-i18next";

// Kapwa's <Button> only renders a <button>, never an <a>, so it can't be
// used for these CTAs — they're real navigable links styled by hand to
// match Button's "primary"/"outline" variants, using the same public
// Kapwa tokens Button itself uses internally.
const heroPrimaryCtaClassName =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-lg font-medium shadow-xs transition-colors bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)] hover:bg-[var(--color-kapwa-bg-brand-hover)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-kapwa-border-focus)]";

const heroSecondaryCtaClassName =
  "inline-flex items-center justify-center rounded-md border border-[var(--color-kapwa-border-strong)] px-6 py-3 text-lg font-medium transition-colors text-[var(--color-kapwa-text-support)] hover:bg-[var(--color-kapwa-bg-gray-default)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-kapwa-border-focus)]";

export function Hero() {
  const { t } = useTranslation();
  const title = t("home.hero.title");
  const highlight = t("home.hero.titleHighlight");
  const highlightIndex = title.indexOf(highlight);

  const titleContent =
    highlightIndex === -1 ? (
      title
    ) : (
      <>
        {title.slice(0, highlightIndex)}
        <span className="text-kapwa-brand-500">{highlight}</span>
        {title.slice(highlightIndex + highlight.length)}
      </>
    );

  return (
    <section className="bg-gradient-to-br from-kapwa-brand-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
          {t("home.hero.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight break-words text-kapwa-brand-950 sm:text-5xl">
          {titleContent}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--color-kapwa-text-support)]">
          {t("home.hero.description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/services" className={heroPrimaryCtaClassName}>
            {t("home.hero.primaryCta")}
          </Link>
          <Link to="/about" className={heroSecondaryCtaClassName}>
            {t("home.hero.secondaryCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
