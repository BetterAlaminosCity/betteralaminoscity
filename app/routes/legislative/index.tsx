import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { BookOpen, FileText, Info, ShieldCheck, Users, Workflow } from "lucide-react";

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

const ORDINANCE_STEP_KEYS = [
  "fileProposal",
  "firstReading",
  "publicHearing",
  "committeeReport",
  "secondReading",
  "thirdReading",
  "mayorApproval",
  "spSubmission",
  "spReview",
  "posting",
  "implementation",
] as const;

const RESOLUTION_STEP_KEYS = [
  "fileProposal",
  "sessionAgenda",
  "committeeApproval",
  "finalDraft",
  "officialSigning",
  "postingTransmittal",
] as const;

export default function Legislative() {
  const { t } = useTranslation();
  const [flow, setFlow] = useState<"ordinance" | "resolution">("ordinance");
  const stepKeys = flow === "ordinance" ? ORDINANCE_STEP_KEYS : RESOLUTION_STEP_KEYS;
  const stepNamespace = flow === "ordinance" ? "ordinanceSteps" : "resolutionSteps";

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

        <div className="mt-14 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-role-legislative-bg)] px-3 py-1 text-xs font-bold text-[var(--color-role-legislative-text)]">
            <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
            {t("legislative.flowchart.eyebrow")}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[var(--color-kapwa-text-strong)]">
            {t("legislative.flowchart.heading")}
          </h2>
          <p className="mt-1.5 text-[var(--color-kapwa-text-support)]">
            {t("legislative.flowchart.subtitle")}
          </p>

          <div className="mt-6 inline-flex gap-1 rounded-xl border border-[var(--color-kapwa-border-weak)] p-1">
            <button
              type="button"
              onClick={() => setFlow("ordinance")}
              aria-pressed={flow === "ordinance"}
              className={
                flow === "ordinance"
                  ? "rounded-lg bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 text-sm font-bold text-[var(--color-kapwa-text-inverse)]"
                  : "rounded-lg px-4 py-2 text-sm font-bold text-[var(--color-kapwa-text-support)]"
              }
            >
              {t("legislative.flowchart.ordinanceTab")}{" "}
              <span className="opacity-70">
                {t("legislative.flowchart.stepsCount", { count: ORDINANCE_STEP_KEYS.length })}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFlow("resolution")}
              aria-pressed={flow === "resolution"}
              className={
                flow === "resolution"
                  ? "rounded-lg bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 text-sm font-bold text-[var(--color-kapwa-text-inverse)]"
                  : "rounded-lg px-4 py-2 text-sm font-bold text-[var(--color-kapwa-text-support)]"
              }
            >
              {t("legislative.flowchart.resolutionTab")}{" "}
              <span className="opacity-70">
                {t("legislative.flowchart.stepsCount", { count: RESOLUTION_STEP_KEYS.length })}
              </span>
            </button>
          </div>

          <div className="mt-8 grid gap-3.5 text-left sm:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((key, index) => {
              const isLast = index === stepKeys.length - 1;
              return (
                <div
                  key={key}
                  className="rounded-xl border border-[var(--color-kapwa-border-weak)] p-4"
                >
                  <span
                    className={
                      isLast
                        ? "inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-kapwa-bg-success-default)] text-xs font-extrabold text-[var(--color-kapwa-text-inverse)]"
                        : "inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] text-xs font-extrabold text-[var(--color-kapwa-text-inverse)]"
                    }
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                    {t(`legislative.flowchart.${stepNamespace}.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-kapwa-text-support)]">
                    {t(`legislative.flowchart.${stepNamespace}.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-kapwa-bg-info-weak)] px-3 py-1 text-xs font-bold text-[var(--color-kapwa-text-info)]">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            {t("legislative.explainer.eyebrow")}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[var(--color-kapwa-text-strong)]">
            {t("legislative.explainer.heading")}
          </h2>
          <p className="mt-1.5 text-[var(--color-kapwa-text-support)]">
            {t("legislative.explainer.subtitle")}
          </p>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[var(--color-kapwa-border-weak)] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                {t("legislative.explainer.ordinances.title")}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-kapwa-text-support)]">
                {t("legislative.explainer.ordinances.description")}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-kapwa-border-weak)] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]">
                <FileText className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                {t("legislative.explainer.resolutions.title")}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-kapwa-text-support)]">
                {t("legislative.explainer.resolutions.description")}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-kapwa-border-weak)] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]">
                <Users className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                {t("legislative.explainer.publicParticipation.title")}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-kapwa-text-support)]">
                {t("legislative.explainer.publicParticipation.description")}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-kapwa-border-weak)] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                {t("legislative.explainer.transparency.title")}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-kapwa-text-support)]">
                {t("legislative.explainer.transparency.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
