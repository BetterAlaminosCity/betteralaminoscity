import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLoaderData } from "react-router";

import { DataSourceNote } from "../../components/ui/DataSourceNote";
import { getCityStatistics } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/statistics";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Statistics & Demographics",
    description: "Population, barangay breakdown, and economic indicators for Alaminos City.",
    path: "/government/statistics",
  });
}

export function loader() {
  const data = getCityStatistics();
  if (!data) throw new Response("Not Found", { status: 404 });
  return data;
}

export default function Statistics() {
  const { totalPopulation, barangays, economicIndicators, lastUpdated, source } =
    useLoaderData<typeof loader>();

  return (
    <section>
      <h1>Statistics & Demographics</h1>
      <DataSourceNote lastUpdated={lastUpdated} source={source} />

      <dl>
        <div>
          <dt>Total Population</dt>
          <dd>{totalPopulation.toLocaleString("en-PH")}</dd>
        </div>
        {economicIndicators.map((indicator) => (
          <div key={indicator.label}>
            <dt>{indicator.label}</dt>
            <dd>{indicator.value}</dd>
          </div>
        ))}
      </dl>

      <h2>Barangay Population Breakdown</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={barangays}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="population" fill="#0066eb" name="Population" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table>
        <thead>
          <tr>
            <th>Barangay</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {barangays.map((barangay) => (
            <tr key={barangay.name}>
              <td>{barangay.name}</td>
              <td>{barangay.population.toLocaleString("en-PH")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
