import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { LegislativeDocumentList } from "../../components/legislative/LegislativeDocumentList";
import { PageHeader } from "../../components/ui/PageHeader";
import { getLegislativeDocuments } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/ordinances";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Ordinances",
    description: "Searchable list of Alaminos City ordinances.",
    path: "/legislative/ordinances",
  });
}

export function loader() {
  const data = getLegislativeDocuments();
  if (!data) throw new Response("Not Found", { status: 404 });
  return {
    ...data,
    documents: data.documents.filter((document) => document.type === "ordinance"),
  };
}

export default function LegislativeOrdinances() {
  const { documents, lastUpdated, source } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        badge={t("nav.legislative")}
        title={t("legislative.browse.ordinancesTitle")}
        subtitle={t("legislative.browse.ordinancesSubtitle")}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <LegislativeDocumentList
          documents={documents}
          lastUpdated={lastUpdated}
          source={source}
          keywordLabel={t("legislative.browse.keywordLabel")}
          keywordPlaceholder={t("legislative.browse.keywordPlaceholder")}
          yearLabel={t("legislative.browse.yearLabel")}
          allYearsLabel={t("legislative.browse.allYears")}
          emptyMessage={t("legislative.browse.emptyOrdinances")}
          numberHeader={t("legislative.browse.numberHeader")}
          titleHeader={t("legislative.browse.titleHeader")}
          dateHeader={t("legislative.browse.dateHeader")}
          statusHeader={t("legislative.browse.statusHeader")}
        />
      </div>
    </>
  );
}
