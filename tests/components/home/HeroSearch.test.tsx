import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { HeroSearch } from "../../../app/components/home/HeroSearch";
import type { SearchIndexEntry } from "../../../app/lib/searchIndex.server";
import type { CategorySummary } from "../../../app/lib/content.server";

const SAMPLE_INDEX: SearchIndexEntry[] = [
  {
    id: "services-business",
    title: "Business",
    description: "Business permits and licensing.",
    url: "/services/business",
    domain: "services",
    categoryTitle: "Business",
  },
];

const POPULAR_CATEGORIES: CategorySummary[] = [
  { slug: "health-services", title: "Health Services", description: "Health programs." },
  { slug: "disaster-preparedness", title: "Disaster Preparedness", description: "Safety info." },
];

function renderHeroSearch() {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        Component: () => <HeroSearch popularCategories={POPULAR_CATEGORIES} />,
      },
      { path: "/search", Component: () => <p>Search results page</p> },
    ],
    { initialEntries: ["/"] },
  );
  render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
  return router;
}

describe("HeroSearch", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve(SAMPLE_INDEX),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a live dropdown result as the user types", async () => {
    const user = userEvent.setup();
    renderHeroSearch();

    await user.type(await screen.findByRole("searchbox"), "Business");

    expect(await screen.findByRole("link", { name: "Business" })).toHaveAttribute(
      "href",
      "/services/business",
    );
  });

  it("renders popular category chips linking to their service pages", async () => {
    renderHeroSearch();

    expect(await screen.findByRole("link", { name: "Health Services" })).toHaveAttribute(
      "href",
      "/services/health-services",
    );
    expect(screen.getByRole("link", { name: "Disaster Preparedness" })).toHaveAttribute(
      "href",
      "/services/disaster-preparedness",
    );
  });

  it("navigates to /search?q=<query> on submit", async () => {
    const user = userEvent.setup();
    const router = renderHeroSearch();

    await user.type(await screen.findByRole("searchbox"), "Business");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(await screen.findByText("Search results page")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/search");
    expect(router.state.location.search).toBe("?q=Business");
  });
});
