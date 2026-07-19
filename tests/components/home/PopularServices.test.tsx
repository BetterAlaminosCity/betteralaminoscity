import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { PopularServices } from "../../../app/components/home/PopularServices";
import type { CategorySummary } from "../../../app/lib/content.server";

const CATEGORIES: CategorySummary[] = [
  { slug: "health-services", title: "Health Services", description: "Public health programs." },
  { slug: "business", title: "Business", description: "Business permits and licenses." },
];

function renderPopularServices() {
  const router = createMemoryRouter([
    { path: "/", Component: () => <PopularServices categories={CATEGORIES} /> },
  ]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("PopularServices", () => {
  it("renders the section heading and a card per category", () => {
    renderPopularServices();

    expect(screen.getByRole("heading", { name: "Popular Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Health Services/i })).toHaveAttribute(
      "href",
      "/services/health-services",
    );
    expect(screen.getByRole("link", { name: /Business/i })).toHaveAttribute(
      "href",
      "/services/business",
    );
  });

  it("renders a link to the full services directory", () => {
    renderPopularServices();

    expect(screen.getByRole("link", { name: "View all services" })).toHaveAttribute(
      "href",
      "/services",
    );
  });
});
