import { Info, Map, Percent, Store, Users, type LucideIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLoaderData } from "react-router";

import { DataSourceNote } from "../../components/ui/DataSourceNote";
import { PageHeader } from "../../components/ui/PageHeader";
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

interface IndicatorStyle {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const INDICATOR_STYLES: Record<string, IndicatorStyle> = {
  "Poverty Incidence": {
    icon: Percent,
    iconBg: "bg-[var(--color-kapwa-bg-warning-weak)]",
    iconColor: "text-[var(--color-kapwa-text-warning)]",
  },
  "Land Area": {
    icon: Map,
    iconBg: "bg-[var(--color-kapwa-bg-info-weak)]",
    iconColor: "text-[var(--color-kapwa-text-info)]",
  },
  "Registered Businesses": {
    icon: Store,
    iconBg: "bg-[var(--color-kapwa-bg-success-weak)]",
    iconColor: "text-[var(--color-kapwa-text-success)]",
  },
};
const DEFAULT_INDICATOR_STYLE: IndicatorStyle = {
  icon: Info,
  iconBg: "bg-[var(--color-kapwa-bg-gray-default)]",
  iconColor: "text-[var(--color-kapwa-text-support)]",
};

export default function Statistics() {
  const { totalPopulation, barangays, economicIndicators, lastUpdated, source } =
    useLoaderData<typeof loader>();

  const rankedBarangays = [...barangays].sort((a, b) => b.population - a.population);
  const midpoint = Math.ceil(barangays.length / 2);
  const barangayColumns = [barangays.slice(0, midpoint), barangays.slice(midpoint)];
  const chartHeight = Math.max(320, rankedBarangays.length * 24);

  return (
    <>
      <PageHeader
        badge="Government · Open Data"
        title="Statistics & Demographics"
        subtitle="Population, barangay breakdown, and economic indicators for Alaminos City."
      />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <DataSourceNote lastUpdated={lastUpdated} source={source} />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-4 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-kapwa-bg-surface-brand)]">
              <Users className="h-5 w-5 text-[var(--color-kapwa-text-brand)]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-kapwa-text-support)]">Total Population</p>
              <p className="mt-1 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {totalPopulation.toLocaleString("en-PH")}
              </p>
            </div>
          </div>

          {economicIndicators.map((indicator) => {
            const {
              icon: Icon,
              iconBg,
              iconColor,
            } = INDICATOR_STYLES[indicator.label] ?? DEFAULT_INDICATOR_STYLE;
            return (
              <div
                key={indicator.label}
                className="flex items-start gap-4 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-kapwa-text-support)]">
                    {indicator.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                    {indicator.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-16 scroll-mt-24">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
            Demographics
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
            Barangay Population Breakdown
          </h2>
          <p className="mt-1.5 text-[var(--color-kapwa-text-support)]">
            Population across all {barangays.length} barangays, ranked highest to lowest.
          </p>

          <div className="mt-6 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
            <div style={{ width: "100%", height: chartHeight }}>
              <ResponsiveContainer>
                <BarChart data={rankedBarangays} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-kapwa-border-weak)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => Number(value).toLocaleString("en-PH")}
                  />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                  <Tooltip formatter={(value) => Number(value).toLocaleString("en-PH")} />
                  <Bar
                    dataKey="population"
                    fill="var(--color-kapwa-text-brand)"
                    name="Population"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {barangayColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--color-kapwa-border-weak)]">
                        <th className="py-2 pr-4 font-semibold text-[var(--color-kapwa-text-support)]">
                          Barangay
                        </th>
                        <th className="py-2 font-semibold text-[var(--color-kapwa-text-support)]">
                          Population
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-kapwa-border-weak)]">
                      {column.map((barangay) => (
                        <tr key={barangay.name}>
                          <td className="py-2.5 pr-4 text-[var(--color-kapwa-text-strong)]">
                            {barangay.name}
                          </td>
                          <td className="py-2.5 text-[var(--color-kapwa-text-support)]">
                            {barangay.population.toLocaleString("en-PH")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
