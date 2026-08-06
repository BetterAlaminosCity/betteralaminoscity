import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/terms";

const GITHUB_ISSUES_URL = "https://github.com/BetterAlaminosCity/betteralaminoscity/issues";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Terms of Use",
    description:
      "Terms of use for BetterAlaminosCity.org, a volunteer-run civic information project.",
    path: "/terms",
  });
}

export default function Terms() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
        {t("terms.heading")}
      </h1>
      <p className="mt-4 text-base text-[var(--color-kapwa-text-support)]">{t("terms.intro")}</p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.acceptanceHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.acceptanceBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.openContentHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.openContentBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.noWarrantyHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.noWarrantyBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.liabilityHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.liabilityBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.responsibilitiesHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.responsibilitiesBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.notAdviceHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.notAdviceBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.externalLinksHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.externalLinksBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.availabilityHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.availabilityBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.changesHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.changesBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.governingLawHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.governingLawBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("terms.reportingHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("terms.reportingBody")}
      </p>
      <a
        href={GITHUB_ISSUES_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("terms.reportingLinkLabel")}
      </a>
    </section>
  );
}
