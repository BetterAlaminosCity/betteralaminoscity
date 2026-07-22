import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { ContactHotlines, spanFor } from "../../../app/components/home/ContactHotlines";
import type { Hotline, Hotlines } from "../../../app/lib/content.server";

const HOTLINES: Hotlines = {
  lastUpdated: "2026-01-15",
  source: "Sample source",
  emergencyNumber: "911",
  hotlines: [
    {
      key: "cdrrmo",
      name: "CDRRMO",
      description: "City Disaster Risk Reduction and Management Office",
      icon: "alert-triangle",
      numbers: ["0947-000-0000", "(075) 000-0001"],
    },
    {
      key: "police",
      name: "Sample Police Station",
      numbers: ["0998-000-0000"],
    },
  ],
};

function hotlinesWithCount(count: number): Hotlines {
  const hotlines: Hotline[] = Array.from({ length: count }, (_, index) => ({
    key: `agency-${index}`,
    name: `Agency ${index}`,
    numbers: ["0900-000-0000"],
  }));
  return { ...HOTLINES, hotlines };
}

describe("spanFor", () => {
  it("spans the remaining empty columns when the last row is partially full", () => {
    // 13 hotlines: 13 % 3 = 1 remainder -> spans 2 of 3 columns
    expect(spanFor(3, 13)).toBe(2);
    // 13 % 2 = 1 remainder -> spans 1 of 2 columns
    expect(spanFor(2, 13)).toBe(1);
  });

  it("spans the full row when the count divides evenly into the columns", () => {
    expect(spanFor(3, 6)).toBe(3);
    expect(spanFor(2, 6)).toBe(2);
  });
});

describe("ContactHotlines", () => {
  it("renders the hotline agencies and city hall info", () => {
    render(
      <I18nProvider>
        <ContactHotlines hotlines={HOTLINES} />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Emergency Hotlines & Contact" }),
    ).toBeInTheDocument();
    expect(screen.getByText("CDRRMO")).toBeInTheDocument();
    expect(screen.getByText("Sample Police Station")).toBeInTheDocument();
    expect(screen.getByText(/City Hall/i)).toBeInTheDocument();
  });

  it("renders a tel: link for every number of a multi-number agency", () => {
    render(
      <I18nProvider>
        <ContactHotlines hotlines={HOTLINES} />
      </I18nProvider>,
    );

    expect(screen.getByRole("link", { name: "0947-000-0000" })).toHaveAttribute(
      "href",
      "tel:09470000000",
    );
    expect(screen.getByRole("link", { name: "(075) 000-0001" })).toHaveAttribute(
      "href",
      "tel:0750000001",
    );
  });

  it("renders the 911 emergency callout as the last grid item, spanning the empty columns", () => {
    render(
      <I18nProvider>
        <ContactHotlines hotlines={hotlinesWithCount(13)} />
      </I18nProvider>,
    );

    const emergencyLink = screen.getByRole("link", { name: /911/ });
    expect(emergencyLink).toHaveAttribute("href", "tel:911");
    expect(emergencyLink).toHaveClass("sm:col-span-1", "lg:col-span-2");
  });

  it("uses a gray section background for contrast with adjacent sections", () => {
    render(
      <I18nProvider>
        <ContactHotlines hotlines={HOTLINES} />
      </I18nProvider>,
    );

    const heading = screen.getByRole("heading", { name: "Emergency Hotlines & Contact" });
    expect(heading.closest("section")).toHaveClass("bg-[var(--color-kapwa-bg-gray-default)]");
  });

  it("renders nothing when hotlines is null", () => {
    const { container } = render(
      <I18nProvider>
        <ContactHotlines hotlines={null} />
      </I18nProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
