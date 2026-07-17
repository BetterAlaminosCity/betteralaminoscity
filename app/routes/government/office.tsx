import { Link, useLoaderData } from "react-router";

import { getCategory, getOfficial, listArticles } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/office";

export function meta({ loaderData, params }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta({
      title: "Not Found",
      description: "Office not found.",
      path: "/government",
    });
  }
  return buildMeta({
    title: loaderData.office.title,
    description: loaderData.office.description,
    path: `/government/${params.office}`,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const office = getCategory("government", params.office);
  if (!office) throw new Response("Not Found", { status: 404 });
  return {
    office,
    official: getOfficial(params.office),
    articles: listArticles("government", params.office),
  };
}

export default function GovernmentOffice() {
  const { office, official, articles } = useLoaderData<typeof loader>();

  return (
    <section>
      <h1>{office.title}</h1>
      <p>{office.description}</p>
      {official && (
        <p>
          {official.title}: {official.name}
        </p>
      )}
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link to={`/government/${office.slug}/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
