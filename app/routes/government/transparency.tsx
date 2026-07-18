import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLoaderData } from "react-router";

import { DataSourceNote } from "../../components/ui/DataSourceNote";
import { getFiscalTransparency } from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/transparency";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Budget & Fiscal Transparency",
    description: "Income, expenditure, and infrastructure project breakdown for Alaminos City.",
    path: "/government/transparency",
  });
}

export function loader() {
  const data = getFiscalTransparency();
  if (!data) throw new Response("Not Found", { status: 404 });
  return data;
}

function formatCurrency(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}

export default function Transparency() {
  const { fiscalYear, income, expenditure, infrastructureProjects, lastUpdated, source } =
    useLoaderData<typeof loader>();

  return (
    <section>
      <h1>Budget & Fiscal Transparency</h1>
      <p>Fiscal Year: {fiscalYear}</p>
      <DataSourceNote lastUpdated={lastUpdated} source={source} />

      <h2>Income</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={income}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="amount" fill="#0066eb" name="Income" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {income.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Expenditure</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={expenditure}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="amount" fill="#ff4d00" name="Expenditure" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenditure.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Infrastructure Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Location</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {infrastructureProjects.map((project) => (
            <tr key={project.name}>
              <td>{project.name}</td>
              <td>{project.location}</td>
              <td>{formatCurrency(project.budget)}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
