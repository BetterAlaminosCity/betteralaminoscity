import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import type { CategorySummary } from "../../lib/content.server";
import { getCategoryIcon } from "../../lib/categoryIcons";
import { CategoryCard } from "../ui/CategoryCard";

export function PopularServices({ categories }: { categories: CategorySummary[] }) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
        {t("home.popularServices.heading")}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            icon={getCategoryIcon(category.slug)}
            title={category.title}
            description={category.description}
            href={`/services/${category.slug}`}
            linkLabel={t("home.popularServices.viewService")}
          />
        ))}
      </div>
      <Link
        to="/services"
        className="mt-8 inline-block text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
      >
        {t("home.popularServices.viewAll")}
      </Link>
    </section>
  );
}
