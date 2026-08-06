import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/faq";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "FAQ",
    description:
      "Answers to common questions about Alaminos City services, grounded in this site's verified content.",
    path: "/faq",
  });
}

export default function Faq() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
        {t("faq.heading")}
      </h1>

      <h2 className="mt-10 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("faq.general.heading")}
      </h2>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.general.hoursQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.general.hoursAnswer")}
      </p>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.general.directoryQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.general.directoryAnswer")}
      </p>
      <Link
        to="/government"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.general.directoryLinkLabel")}
      </Link>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.general.onlineQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.general.onlineAnswer")}
      </p>
      <Link
        to="/services"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.general.onlineLinkLabel")}
      </Link>

      <h2 className="mt-10 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("faq.documents.heading")}
      </h2>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.documents.birthCertQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.documents.birthCertAnswer")}
      </p>
      <Link
        to="/services/civil-registry-vital-records"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.documents.birthCertLinkLabel")}
      </Link>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.documents.representativeQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.documents.representativeAnswer")}
      </p>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.documents.psaQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.documents.psaAnswer")}
      </p>
      <Link
        to="/government/civil-registrars-office"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.documents.psaLinkLabel")}
      </Link>

      <h2 className="mt-10 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("faq.business.heading")}
      </h2>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.business.newBusinessQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.business.newBusinessAnswer")}
      </p>
      <Link
        to="/services/business"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.business.newBusinessLinkLabel")}
      </Link>

      <h2 className="mt-10 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("faq.payments.heading")}
      </h2>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.payments.paymentMethodsQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.payments.paymentMethodsAnswer")}
      </p>
      <Link
        to="/government/city-treasurers-office"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.payments.paymentMethodsLinkLabel")}
      </Link>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.payments.propertyTaxQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.payments.propertyTaxAnswer")}
      </p>
      <Link
        to="/government/city-treasurers-office"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.payments.propertyTaxLinkLabel")}
      </Link>

      <h2 className="mt-10 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("faq.social.heading")}
      </h2>

      <h3 className="mt-6 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        {t("faq.social.seniorIdQuestion")}
      </h3>
      <p className="mt-2 text-base text-[var(--color-kapwa-text-support)]">
        {t("faq.social.seniorIdAnswer")}
      </p>
      <Link
        to="/services/social-welfare"
        className="mt-1 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("faq.social.seniorIdLinkLabel")}
      </Link>
    </section>
  );
}
