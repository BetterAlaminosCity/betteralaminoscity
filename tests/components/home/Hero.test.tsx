import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Hero } from "../../../app/components/home/Hero";
import type { CategorySummary } from "../../../app/lib/content.server";

const POPULAR_CATEGORIES: CategorySummary[] = [
  { slug: "business", title: "Business", description: "Business permits." },
];

function renderHero() {
  const router = createMemoryRouter([
    { path: "/", Component: () => <Hero popularCategories={POPULAR_CATEGORIES} /> },
    { path: "/search", Component: () => <p>Search results page</p> },
  ]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Hero", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve([]),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the website name", () => {
    renderHero();

    expect(
      screen.getByRole("heading", {
        name: "BetterAlaminosCity.org",
      }),
    ).toBeInTheDocument();
  });

  it("mentions the Hundred Islands National Park", () => {
    renderHero();

    expect(screen.getByText(/Hundred Islands National Park/i)).toBeInTheDocument();
  });

  it("links the primary CTA to /services and the secondary CTA to /about", () => {
    renderHero();

    expect(screen.getByRole("link", { name: "Browse Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(screen.getByRole("link", { name: "Learn About This Project" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("uses a blue section background", () => {
    renderHero();

    const heading = screen.getByRole("heading", { name: "BetterAlaminosCity.org" });
    expect(heading.closest("section")).toHaveClass("bg-[var(--color-kapwa-bg-brand-default)]");
  });

  it("renders the HeroSearch widget", () => {
    renderHero();

    expect(screen.getByRole("heading", { name: "Find a Service" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
