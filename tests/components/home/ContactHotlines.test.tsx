import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { ContactHotlines } from "../../../app/components/home/ContactHotlines";
import type { Hotlines } from "../../../app/lib/content.server";

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

  it("renders the 911 emergency callout", () => {
    render(
      <I18nProvider>
        <ContactHotlines hotlines={HOTLINES} />
      </I18nProvider>,
    );

    expect(screen.getByRole("link", { name: "911" })).toHaveAttribute("href", "tel:911");
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
