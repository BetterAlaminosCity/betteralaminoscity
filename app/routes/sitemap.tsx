import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

import { listCategories } from "../lib/content.server";
import { buildMeta } from "../lib/seo";
import { PageHeader } from "../components/ui/PageHeader";
import type { Route } from "./+types/sitemap";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Sitemap",
    description: "Full directory of pages on BetterAlaminosCity.org.",
    path: "/sitemap",
  });
}

export function loader() {
  return {
    serviceCategories: listCategories("services"),
    governmentOffices: listCategories("government"),
  };
}

function LinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-kapwa-text-support)]">
        {heading}
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-[var(--color-kapwa-text-strong)] hover:text-[var(--color-kapwa-text-brand)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sitemap() {
  const { serviceCategories, governmentOffices } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        badge={t("sitemap.pageHeader.badge")}
        title={t("sitemap.pageHeader.title")}
        subtitle={t("sitemap.pageHeader.subtitle")}
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <LinkGroup
            heading={t("sitemap.mainPagesHeading")}
            links={[
              { to: "/", label: t("sitemap.home") },
              { to: "/services", label: t("sitemap.services") },
              { to: "/government", label: t("sitemap.government") },
              { to: "/legislative", label: t("sitemap.legislative") },
              { to: "/transparency", label: t("sitemap.transparency") },
              { to: "/about", label: t("sitemap.about") },
              { to: "/search", label: t("sitemap.search") },
            ]}
          />
          <LinkGroup
            heading={t("sitemap.serviceCategoriesHeading")}
            links={serviceCategories.map((category) => ({
              to: `/services/${category.slug}`,
              label: category.title,
            }))}
          />
          <LinkGroup
            heading={t("sitemap.governmentOfficesHeading")}
            links={governmentOffices.map((office) => ({
              to: `/government/${office.slug}`,
              label: office.title,
            }))}
          />
          <LinkGroup
            heading={t("sitemap.legislativeHeading")}
            links={[
              { to: "/legislative/ordinances", label: t("sitemap.ordinances") },
              { to: "/legislative/resolutions", label: t("sitemap.resolutions") },
            ]}
          />
          <LinkGroup
            heading={t("sitemap.legalHeading")}
            links={[
              { to: "/terms", label: t("sitemap.terms") },
              { to: "/privacy", label: t("sitemap.privacy") },
              { to: "/accessibility", label: t("sitemap.accessibility") },
              { to: "/faq", label: t("sitemap.faq") },
            ]}
          />
        </div>
      </section>
    </>
  );
}
