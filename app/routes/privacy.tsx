import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/privacy";

const GITHUB_ISSUES_URL = "https://github.com/BetterAlaminosCity/betteralaminoscity/issues";
const NPC_URL = "https://www.privacy.gov.ph";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Privacy Policy",
    description:
      "How BetterAlaminosCity.org handles visitor information, in line with the Philippines' Data Privacy Act of 2012.",
    path: "/privacy",
  });
}

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
        {t("privacy.heading")}
      </h1>
      <p className="mt-4 text-base text-[var(--color-kapwa-text-support)]">{t("privacy.intro")}</p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.noAccountsHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.noAccountsBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.serverLogsHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.serverLogsBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.noSensitiveDataHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.noSensitiveDataBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.contactHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.contactBody")}
      </p>
      <a
        href={GITHUB_ISSUES_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("privacy.contactLinkLabel")}
      </a>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.contactFollowUp")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.cookiesHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.cookiesBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.rightsHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.rightsBody")}
      </p>
      <a
        href={NPC_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("privacy.rightsLinkLabel")}
      </a>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.changesHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.changesBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("privacy.contactFooterHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("privacy.contactFooterBody")}
      </p>
      <a
        href={GITHUB_ISSUES_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("privacy.contactFooterLinkLabel")}
      </a>
    </section>
  );
}
