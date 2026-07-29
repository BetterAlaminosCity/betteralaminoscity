import { Coins, HardHat, MapPin, Receipt, Scale } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLoaderData } from "react-router";

import { DataSourceNote } from "../components/ui/DataSourceNote";
import { PageHeader } from "../components/ui/PageHeader";
import { getFiscalTransparency } from "../lib/content.server";
import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/transparency";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Budget & Fiscal Transparency",
    description: "Income, expenditure, and infrastructure project breakdown for Alaminos City.",
    path: "/transparency",
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

function formatCompactCurrency(amount: number): string {
  return `₱${new Intl.NumberFormat("en-PH", { notation: "compact", maximumFractionDigits: 1 }).format(amount)}`;
}

const STATUS_BADGE_STYLES: Record<string, string> = {
  Ongoing:
    "border-[var(--color-kapwa-border-info)] bg-[var(--color-kapwa-bg-info-weak)] text-[var(--color-kapwa-text-info)]",
  Completed:
    "border-[var(--color-kapwa-border-success)] bg-[var(--color-kapwa-bg-success-weak)] text-[var(--color-kapwa-text-success)]",
  Planned:
    "border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-gray-default)] text-[var(--color-kapwa-text-support)]",
};
const DEFAULT_STATUS_BADGE =
  "border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-gray-default)] text-[var(--color-kapwa-text-support)]";

export default function Transparency() {
  const { fiscalYear, income, expenditure, infrastructureProjects, lastUpdated, source } =
    useLoaderData<typeof loader>();

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenditure = expenditure.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalExpenditure;

  return (
    <>
      <PageHeader
        badge="Government · Open Data"
        title="Budget & Fiscal Transparency"
        subtitle="Income, expenditure, and infrastructure project breakdown for Alaminos City."
      />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[var(--color-kapwa-text-support)]">
            Fiscal Year {fiscalYear}
          </p>
          <DataSourceNote lastUpdated={lastUpdated} source={source} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex items-start gap-4 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-success-weak)]">
              <Coins
                className="h-5 w-5 text-[var(--color-kapwa-text-success)]"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm text-[var(--color-kapwa-text-support)]">Total Income</p>
              <p className="mt-1 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {formatCompactCurrency(totalIncome)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-warning-weak)]">
              <Receipt
                className="h-5 w-5 text-[var(--color-kapwa-text-warning)]"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm text-[var(--color-kapwa-text-support)]">Total Expenditure</p>
              <p className="mt-1 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {formatCompactCurrency(totalExpenditure)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-surface-brand)]">
              <Scale className="h-5 w-5 text-[var(--color-kapwa-text-brand)]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-kapwa-text-support)]">Net Balance</p>
              <p className="mt-1 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {formatCompactCurrency(netBalance)}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-16 scroll-mt-24">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
            Revenue
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">Income</h2>

          <div className="mt-6 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={income}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-kapwa-border-weak)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-kapwa-text-success)"
                    name="Income"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-kapwa-border-weak)]">
                    <th className="py-2 pr-4 font-semibold text-[var(--color-kapwa-text-support)]">
                      Source
                    </th>
                    <th className="py-2 font-semibold text-[var(--color-kapwa-text-support)]">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-kapwa-border-weak)]">
                  {income.map((item) => (
                    <tr key={item.label}>
                      <td className="py-2.5 pr-4 text-[var(--color-kapwa-text-strong)]">
                        {item.label}
                      </td>
                      <td className="py-2.5 text-[var(--color-kapwa-text-support)]">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-16 scroll-mt-24">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
            Spending
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">Expenditure</h2>

          <div className="mt-6 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={expenditure}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-kapwa-border-weak)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-kapwa-text-warning)"
                    name="Expenditure"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-kapwa-border-weak)]">
                    <th className="py-2 pr-4 font-semibold text-[var(--color-kapwa-text-support)]">
                      Category
                    </th>
                    <th className="py-2 font-semibold text-[var(--color-kapwa-text-support)]">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-kapwa-border-weak)]">
                  {expenditure.map((item) => (
                    <tr key={item.label}>
                      <td className="py-2.5 pr-4 text-[var(--color-kapwa-text-strong)]">
                        {item.label}
                      </td>
                      <td className="py-2.5 text-[var(--color-kapwa-text-support)]">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-16 scroll-mt-24">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
            Capital Outlay
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
            Infrastructure Projects
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructureProjects.map((project) => (
              <li
                key={project.name}
                className="flex h-full flex-col gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-surface-brand)]">
                    <HardHat
                      className="h-5 w-5 text-[var(--color-kapwa-text-brand)]"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`mt-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
                      STATUS_BADGE_STYLES[project.status] ?? DEFAULT_STATUS_BADGE
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--color-kapwa-text-strong)]">
                  {project.name}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-[var(--color-kapwa-text-support)]">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {project.location}
                </p>
                <p className="mt-auto text-sm font-semibold text-[var(--color-kapwa-text-strong)]">
                  {formatCurrency(project.budget)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
