import { Link, useLoaderData } from "react-router";

import { listCategories } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Government",
    description: "Directory of Alaminos City government offices and officials.",
    path: "/government",
  });
}

export function loader() {
  return { offices: listCategories("government") };
}

export default function GovernmentIndex() {
  const { offices } = useLoaderData<typeof loader>();
  const executive = offices.filter((office) => office.branch === "executive");
  const legislative = offices.filter((office) => office.branch === "legislative");

  return (
    <section>
      <h1>Government</h1>
      <h2>Executive</h2>
      <ul>
        {executive.map((office) => (
          <li key={office.slug}>
            <Link to={`/government/${office.slug}`}>{office.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Legislative</h2>
      <ul>
        {legislative.map((office) => (
          <li key={office.slug}>
            <Link to={`/government/${office.slug}`}>{office.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Civic Transparency</h2>
      <ul>
        <li>
          <Link to="/government/transparency">Budget & Fiscal Transparency</Link>
        </li>
        <li>
          <Link to="/government/ordinances-resolutions">Ordinances & Resolutions</Link>
        </li>
        <li>
          <Link to="/government/statistics">Statistics & Demographics</Link>
        </li>
      </ul>
    </section>
  );
}
