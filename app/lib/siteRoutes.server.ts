import { listArticles, listCategories, type ContentDomain } from "./content.server";

export const STATIC_ROUTES: string[] = [
  "/",
  "/about",
  "/services",
  "/government",
  "/government/transparency",
  "/government/ordinances-resolutions",
  "/government/statistics",
  "/search",
];

export function contentPaths(domain: ContentDomain, contentRoot?: string): string[] {
  return listCategories(domain, contentRoot).flatMap((category) => [
    `/${domain}/${category.slug}`,
    ...listArticles(domain, category.slug, contentRoot).map(
      (article) => `/${domain}/${category.slug}/${article.slug}`,
    ),
  ]);
}

export function getAllRoutePaths(contentRoot?: string): string[] {
  return [
    ...STATIC_ROUTES,
    ...contentPaths("services", contentRoot),
    ...contentPaths("government", contentRoot),
  ];
}
