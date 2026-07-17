import { Link, useLoaderData } from "react-router";

import { getCategory, listArticles } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/category";

export function meta({ loaderData, params }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta({
      title: "Not Found",
      description: "Category not found.",
      path: "/services",
    });
  }
  return buildMeta({
    title: loaderData.category.title,
    description: loaderData.category.description,
    path: `/services/${params.category}`,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const category = getCategory("services", params.category);
  if (!category) throw new Response("Not Found", { status: 404 });
  return { category, articles: listArticles("services", params.category) };
}

export default function ServicesCategory() {
  const { category, articles } = useLoaderData<typeof loader>();

  return (
    <section>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link to={`/services/${category.slug}/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
