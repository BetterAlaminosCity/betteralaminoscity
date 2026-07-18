import { Link, useLoaderData } from "react-router";

import { listCategories } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Services",
    description: "Directory of Alaminos City government services by category.",
    path: "/services",
  });
}

export function loader() {
  return { categories: listCategories("services") };
}

export default function ServicesIndex() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <section>
      <h1>Services</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link to={`/services/${category.slug}`}>{category.title}</Link>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
