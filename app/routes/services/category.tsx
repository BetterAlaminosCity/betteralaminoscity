import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

import {
  getArticleTranslations,
  getCategoryTranslations,
  listArticles,
  type Article,
} from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import { PageHeader } from "../../components/ui/PageHeader";
import { ServiceCard } from "../../components/services/ServiceCard";
import type { Route } from "./+types/category";

export function meta({ loaderData, params }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta({
      title: "Not Found",
      description: "Category not found.",
      path: "/services",
    });
  }
  return buildMeta({
    title: loaderData.category.en.title,
    description: loaderData.category.en.description,
    path: `/services/${params.category}`,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const category = getCategoryTranslations("services", params.category);
  if (!category) throw new Response("Not Found", { status: 404 });

  const articles = listArticles("services", params.category)
    .map((article) => getArticleTranslations("services", params.category, article.slug))
    .filter((pair): pair is { en: Article; fil: Article | null } => pair.en !== null);

  return { category, articles };
}

export default function ServicesCategory() {
  const { category, articles } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
  const isFil = i18n.resolvedLanguage === "fil";
  const categoryText = isFil && category.fil ? category.fil : category.en;

  return (
    <>
      <PageHeader
        badge={t("services.pageHeader.badge")}
        title={categoryText.title}
        subtitle={categoryText.description}
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="mb-6">
          <Link to="/services" className="text-sm font-medium text-[var(--color-kapwa-text-brand)]">
            ← {t("services.pageHeader.title")}
          </Link>
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(({ en, fil }) => {
            const articleText = isFil && fil ? fil : en;
            return (
              <li key={articleText.slug}>
                <ServiceCard
                  title={articleText.title}
                  description={articleText.description}
                  classification={articleText.classification}
                  totalProcessingTime={articleText.totalProcessingTime}
                  href={`/services/${category.en.slug}/${articleText.slug}`}
                  linkLabel={t("services.viewDetails")}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
