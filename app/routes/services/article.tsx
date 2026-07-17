import { Link, useLoaderData } from "react-router";
import ReactMarkdown from "react-markdown";

import { getArticle, getCategory } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/article";

export function meta({ loaderData, params }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta({
      title: "Not Found",
      description: "Article not found.",
      path: "/services",
    });
  }
  return buildMeta({
    title: loaderData.article.title,
    description: loaderData.article.description,
    path: `/services/${params.category}/${params.article}`,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const category = getCategory("services", params.category);
  const article = getArticle("services", params.category, params.article);
  if (!category || !article) throw new Response("Not Found", { status: 404 });
  return { category, article };
}

export default function ServicesArticle() {
  const { category, article } = useLoaderData<typeof loader>();

  return (
    <section>
      <p>
        <Link to={`/services/${category.slug}`}>{category.title}</Link>
      </p>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </section>
  );
}
