import type { Config } from "@react-router/dev/config";

import { listArticles, listCategories } from "./app/lib/content.server";

function contentPaths(domain: "services" | "government"): string[] {
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
    return [...getStaticPaths(), ...contentPaths("services")];
  },
} satisfies Config;
