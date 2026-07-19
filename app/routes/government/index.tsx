import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

import { getOfficial, listCategories } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import { getCategoryIcon } from "../../lib/categoryIcons";
import { PageHeader } from "../../components/ui/PageHeader";
import { CategoryCard } from "../../components/ui/CategoryCard";
import { OfficialCard } from "../../components/ui/OfficialCard";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Government",
    description: "Directory of Alaminos City government offices and officials.",
    path: "/government",
  });
}

export function loader() {
  const offices = listCategories("government");
  return {
    mayor: getOfficial("office-of-the-mayor"),
    legislativeHead: getOfficial("sangguniang-panlungsod"),
    departments: offices.filter(
      (office) => office.branch === "executive" && office.slug !== "office-of-the-mayor",
    ),
    legislative: offices.filter((office) => office.branch === "legislative"),
  };
}

export default function GovernmentIndex() {
  const { mayor, legislativeHead, departments, legislative } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        badge={t("government.pageHeader.badge")}
        title={t("government.pageHeader.title")}
        subtitle={t("government.pageHeader.subtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
          {t("government.executiveLeadership")}
        </h2>
        {mayor && (
          <OfficialCard
            official={mayor}
            href="/government/office-of-the-mayor"
            className="mt-6 inline-block"
          />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
          {t("government.departmentOffices")}
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((office) => (
            <li key={office.slug}>
              <CategoryCard
                icon={getCategoryIcon(office.slug)}
                title={office.title}
                description={office.description}
                href={`/government/${office.slug}`}
                linkLabel={t("government.viewOffice")}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
          {t("government.legislative")}
        </h2>
        <ul>
          {legislative.map((office) => (
            <li key={office.slug}>
              <Link to={`/government/${office.slug}`}>{office.title}</Link>
            </li>
          ))}
        </ul>
        {legislativeHead && (
          <p className="mt-4 text-sm text-[var(--color-kapwa-text-support)]">
            {legislativeHead.title}: {legislativeHead.name}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
          {t("government.civicTransparency.heading")}
        </h2>
        <ul>
          <li>
            <Link to="/government/transparency">
              {t("government.civicTransparency.budgetFiscalTransparency")}
            </Link>
          </li>
          <li>
            <Link to="/government/ordinances-resolutions">
              {t("government.civicTransparency.ordinancesResolutions")}
            </Link>
          </li>
          <li>
            <Link to="/government/statistics">
              {t("government.civicTransparency.statisticsDemographics")}
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
