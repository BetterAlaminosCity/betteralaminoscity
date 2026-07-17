import type { Config } from "@react-router/dev/config";

import { listArticles, listCategories, type ContentDomain } from "./app/lib/content.server";

function contentPaths(domain: ContentDomain): string[] {
  return listCategories(domain).flatMap((category) => [
    `/${domain}/${category.slug}`,
    ...listArticles(domain, category.slug).map(
      (article) => `/${domain}/${category.slug}/${article.slug}`,
    ),
  ]);
}

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...contentPaths("services"), ...contentPaths("government")];
  },
} satisfies Config;
