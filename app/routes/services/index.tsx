import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

import { listCategories } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import { getCategoryIcon } from "../../lib/categoryIcons";
import { PageHeader } from "../../components/ui/PageHeader";
import { CategoryCard } from "../../components/ui/CategoryCard";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Services",
    description: "Directory of Alaminos City government services by category.",
    path: "/services",
  });
}

export function loader() {
  return { categories: listCategories("services") };
}

export default function ServicesIndex() {
  const { categories } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        badge={t("services.pageHeader.badge")}
        title={t("services.pageHeader.title")}
        subtitle={t("services.pageHeader.subtitle")}
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <CategoryCard
                icon={getCategoryIcon(category.slug)}
                title={category.title}
                description={category.description}
                href={`/services/${category.slug}`}
                linkLabel={t("services.viewService")}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
