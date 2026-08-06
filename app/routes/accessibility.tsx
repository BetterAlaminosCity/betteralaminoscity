import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/accessibility";

const GITHUB_ISSUES_URL = "https://github.com/BetterAlaminosCity/betteralaminoscity/issues";
const WCAG_URL = "https://www.w3.org/TR/WCAG21/";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Accessibility",
    description: "BetterAlaminosCity.org's commitment to digital accessibility.",
    path: "/accessibility",
  });
}

export default function Accessibility() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
        {t("accessibility.heading")}
      </h1>
      <p className="mt-4 text-base text-[var(--color-kapwa-text-support)]">
        {t("accessibility.intro")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("accessibility.targetHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("accessibility.targetBody")}
      </p>
      <a
        href={WCAG_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("accessibility.targetLinkLabel")}
      </a>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("accessibility.featuresHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("accessibility.featuresBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("accessibility.limitationsHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("accessibility.limitationsBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("accessibility.feedbackHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("accessibility.feedbackBody")}
      </p>
      <a
        href={GITHUB_ISSUES_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("accessibility.feedbackLinkLabel")}
      </a>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("accessibility.techHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("accessibility.techBody")}
      </p>
    </section>
  );
}
