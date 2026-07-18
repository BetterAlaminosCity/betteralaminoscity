import path from "node:path";

import {
  getLegislativeDocuments,
  listArticles,
  listCategories,
  type ContentDomain,
} from "./content.server";

export interface SearchIndexEntry {
  id: string;
  title: string;
  description: string;
  url: string;
  domain: ContentDomain | "legislative";
  categoryTitle: string;
}

const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), "content");

function buildDomainEntries(domain: ContentDomain, contentRoot: string): SearchIndexEntry[] {
  return listCategories(domain, contentRoot).flatMap((category) => {
    const categoryEntry: SearchIndexEntry = {
      id: `${domain}-${category.slug}`,
      title: category.title,
      description: category.description,
      url: `/${domain}/${category.slug}`,
      domain,
      categoryTitle: category.title,
    };
    const articleEntries = listArticles(domain, category.slug, contentRoot).map(
      (article): SearchIndexEntry => ({
        id: `${domain}-${category.slug}-${article.slug}`,
        title: article.title,
        description: article.description,
        url: `/${domain}/${category.slug}/${article.slug}`,
        domain,
        categoryTitle: category.title,
      }),
    );
    return [categoryEntry, ...articleEntries];
  });
}

function buildLegislativeEntries(contentRoot: string): SearchIndexEntry[] {
  const legislativeDocuments = getLegislativeDocuments(contentRoot);
  if (!legislativeDocuments) return [];
  return legislativeDocuments.documents.map((document): SearchIndexEntry => ({
    id: `legislative-${document.id}`,
    title: `${document.type === "ordinance" ? "Ordinance" : "Resolution"} No. ${document.number}: ${document.title}`,
    description: `Status: ${document.status} · Dated ${document.date}`,
    url: document.link,
    domain: "legislative",
    categoryTitle: "Ordinances & Resolutions",
  }));
}

export function buildSearchIndex(contentRoot: string = DEFAULT_CONTENT_ROOT): SearchIndexEntry[] {
  return [
    ...buildDomainEntries("services", contentRoot),
    ...buildDomainEntries("government", contentRoot),
    ...buildLegislativeEntries(contentRoot),
  ];
}
