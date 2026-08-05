import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { BookOpen, FileText } from "lucide-react";

import { PageHeader } from "../../components/ui/PageHeader";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Legislative",
    description: "Ordinances and resolutions of the Sangguniang Panlungsod ng Alaminos.",
    path: "/legislative",
  });
}

export default function Legislative() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        badge={t("legislative.pageHeader.badge")}
        title={t("legislative.pageHeader.title")}
        subtitle={t("legislative.pageHeader.subtitle")}
      />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-[var(--color-kapwa-text-strong)]">
              {t("legislative.cards.ordinanceTitle")}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-kapwa-text-support)]">
              {t("legislative.cards.ordinanceDescription")}
            </p>
            <Link
              to="/legislative/ordinances"
              className="mt-4 inline-block text-sm font-bold text-[var(--color-kapwa-text-brand)] hover:underline"
            >
              → {t("legislative.cards.ordinanceCta")}
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-[var(--color-kapwa-text-strong)]">
              {t("legislative.cards.resolutionTitle")}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-kapwa-text-support)]">
              {t("legislative.cards.resolutionDescription")}
            </p>
            <Link
              to="/legislative/resolutions"
              className="mt-4 inline-block text-sm font-bold text-[var(--color-kapwa-text-brand)] hover:underline"
            >
              → {t("legislative.cards.resolutionCta")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
