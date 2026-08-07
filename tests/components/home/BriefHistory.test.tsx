import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { BriefHistory } from "../../../app/components/home/BriefHistory";

describe("BriefHistory", () => {
  it("renders the section heading", () => {
    render(
      <I18nProvider>
        <BriefHistory />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "A Brief History of Alaminos City" }),
    ).toBeInTheDocument();
  });

  it("renders era headings and their timeline entries", () => {
    render(
      <I18nProvider>
        <BriefHistory />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading", { name: "Early Settlers" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City of Alaminos" })).toBeInTheDocument();
    expect(screen.getByText(/during an official visit/)).toBeInTheDocument();
    expect(screen.getByText("1734")).toBeInTheDocument();
  });

  it("renders fun fact callout cards", () => {
    render(
      <I18nProvider>
        <BriefHistory />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Home to the Philippines' First National Park" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/burned down in 1758/)).toBeInTheDocument();
  });

  it("renders the source attribution line with a link to the city government's history page", () => {
    render(
      <I18nProvider>
        <BriefHistory />
      </I18nProvider>,
    );

    const link = screen.getByRole("link", { name: "City Government of Alaminos" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.alaminoscity.gov.ph/discover-alaminos/local-history.html",
    );
  });

  it("uses a gray section background for contrast with adjacent sections", () => {
    render(
      <I18nProvider>
        <BriefHistory />
      </I18nProvider>,
    );

    const heading = screen.getByRole("heading", { name: "A Brief History of Alaminos City" });
    expect(heading.closest("section")).toHaveClass("bg-[var(--color-kapwa-bg-gray-default)]");
  });
});
