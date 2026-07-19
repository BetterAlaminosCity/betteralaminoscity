import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { CityAtAGlance } from "../../../app/components/home/CityAtAGlance";
import type { CityStatistics } from "../../../app/lib/content.server";

const STATISTICS: CityStatistics = {
  lastUpdated: "2026-01-15",
  source: "Sample source",
  totalPopulation: 100000,
  barangays: [
    { name: "Sample Barangay 1", population: 18000 },
    { name: "Sample Barangay 2", population: 15500 },
  ],
  economicIndicators: [
    { label: "Poverty Incidence", value: "12.5% (Sample)" },
    { label: "Employment Rate", value: "94.0% (Sample)" },
  ],
};

describe("CityAtAGlance", () => {
  it("renders the population, barangay count, and economic indicators", () => {
    render(
      <I18nProvider>
        <CityAtAGlance statistics={STATISTICS} />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading", { name: "City at a Glance" })).toBeInTheDocument();
    expect(screen.getByText("100000")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Poverty Incidence")).toBeInTheDocument();
    expect(screen.getByText("12.5% (Sample)")).toBeInTheDocument();
  });

  it("renders nothing when statistics is null", () => {
    const { container } = render(
      <I18nProvider>
        <CityAtAGlance statistics={null} />
      </I18nProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
