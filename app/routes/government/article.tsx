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
      path: "/government",
    });
  }
  return buildMeta({
    title: loaderData.article.title,
    description: loaderData.article.description,
    path: `/government/${params.office}/${params.article}`,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const office = getCategory("government", params.office);
  const article = getArticle("government", params.office, params.article);
  if (!office || !article) throw new Response("Not Found", { status: 404 });
  return { office, article };
}

export default function GovernmentArticle() {
  const { office, article } = useLoaderData<typeof loader>();

  return (
    <section>
      <p>
        <Link to={`/government/${office.slug}`}>{office.title}</Link>
      </p>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </section>
  );
}
