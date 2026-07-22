import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { getArticleTranslations, getCategoryTranslations } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import { buildGovernmentServiceJsonLd, jsonLdScriptHtml } from "../../lib/structuredData";
import { RequirementsList } from "../../components/services/RequirementsList";
import { ProcessSteps } from "../../components/services/ProcessSteps";
import type { Route } from "./+types/article";

export function meta({ loaderData, params }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta({
      title: "Not Found",
      description: "Article not found.",
      path: "/services",
    });
  }
  return buildMeta({
    title: loaderData.article.en.title,
    description: loaderData.article.en.description,
    path: `/services/${params.category}/${params.article}`,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const category = getCategoryTranslations("services", params.category);
  const article = getArticleTranslations("services", params.category, params.article);
  if (!category || !article.en) throw new Response("Not Found", { status: 404 });
  return { category, article: { en: article.en, fil: article.fil } };
}

export default function ServicesArticle() {
  const { category, article } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
  const isFil = i18n.resolvedLanguage === "fil";
  const categoryText = isFil && category.fil ? category.fil : category.en;
  const articleText = isFil && article.fil ? article.fil : article.en;

  const jsonLd = buildGovernmentServiceJsonLd({
    name: articleText.title,
    description: articleText.description,
    path: `/services/${category.en.slug}/${articleText.slug}`,
    serviceType: categoryText.title,
  });

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptHtml(jsonLd)} />
      <p className="mb-4">
        <Link
          to={`/services/${category.en.slug}`}
          className="text-sm font-medium text-[var(--color-kapwa-text-brand)]"
        >
          <span aria-hidden="true">← </span>
          {categoryText.title}
        </Link>
      </p>
      <h1 className="text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
        {articleText.title}
      </h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {articleText.classification ? (
          <span className="rounded-full bg-[var(--color-kapwa-bg-gray-default)] px-3 py-1 text-xs font-medium text-[var(--color-kapwa-text-support)]">
            {t("services.article.classification")}: {articleText.classification}
          </span>
        ) : null}
        {articleText.totalProcessingTime ? (
          <span className="rounded-full bg-[var(--color-kapwa-bg-brand-default)] px-3 py-1 text-xs font-medium text-[var(--color-kapwa-text-inverse)]">
            {t("services.article.totalProcessingTime")}: {articleText.totalProcessingTime}
          </span>
        ) : null}
        {articleText.totalFees ? (
          <span className="rounded-full bg-[var(--color-kapwa-bg-gray-default)] px-3 py-1 text-xs font-medium text-[var(--color-kapwa-text-support)]">
            {t("services.article.totalFees")}: {articleText.totalFees}
          </span>
        ) : null}
      </div>

      <div className="mt-6 text-base text-[var(--color-kapwa-text-support)]">
        <ReactMarkdown>{articleText.body}</ReactMarkdown>
      </div>

      {articleText.whoMayAvail ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
            {t("services.article.whoMayAvail")}
          </h2>
          <p className="mt-2 text-[var(--color-kapwa-text-support)]">{articleText.whoMayAvail}</p>
        </div>
      ) : null}

      {articleText.requirements && articleText.requirements.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
            {t("services.article.requirements")}
          </h2>
          <div className="mt-3">
            <RequirementsList
              requirements={articleText.requirements}
              itemLabel={t("services.article.requirements")}
              whereToSecureLabel={t("services.article.whereToSecure")}
            />
          </div>
        </div>
      ) : null}

      {articleText.steps && articleText.steps.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
            {t("services.article.process")}
          </h2>
          <div className="mt-3">
            <ProcessSteps
              steps={articleText.steps}
              labels={{
                clientStep: t("services.article.clientStep"),
                agencyAction: t("services.article.agencyAction"),
                fee: t("services.article.fee"),
                processingTime: t("services.article.processingTime"),
                personResponsible: t("services.article.personResponsible"),
              }}
            />
          </div>
        </div>
      ) : null}

      {articleText.office ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
            {t("services.article.officesConcerned")}
          </h2>
          <p className="mt-2 text-[var(--color-kapwa-text-support)]">{articleText.office}</p>
        </div>
      ) : null}
    </section>
  );
}
