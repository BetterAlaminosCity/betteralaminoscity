import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { LegislativeDocumentList } from "../../components/legislative/LegislativeDocumentList";
import { PageHeader } from "../../components/ui/PageHeader";
import { getLegislativeDocuments } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/resolutions";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Resolutions",
    description: "Searchable list of Alaminos City resolutions.",
    path: "/legislative/resolutions",
  });
}

export function loader() {
  const data = getLegislativeDocuments();
  if (!data) throw new Response("Not Found", { status: 404 });
  return {
    ...data,
    documents: data.documents.filter((document) => document.type === "resolution"),
  };
}

export default function LegislativeResolutions() {
  const { documents, lastUpdated, source } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        badge={t("nav.legislative")}
        title={t("legislative.browse.resolutionsTitle")}
        subtitle={t("legislative.browse.resolutionsSubtitle")}
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <LegislativeDocumentList
          documents={documents}
          lastUpdated={lastUpdated}
          source={source}
          keywordLabel={t("legislative.browse.keywordLabel")}
          keywordPlaceholder={t("legislative.browse.keywordPlaceholder")}
          yearLabel={t("legislative.browse.yearLabel")}
          allYearsLabel={t("legislative.browse.allYears")}
          emptyMessage={t("legislative.browse.emptyResolutions")}
        />
      </div>
    </>
  );
}
