import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Hero } from "../../../app/components/home/Hero";

function renderHero() {
  const router = createMemoryRouter([{ path: "/", Component: Hero }]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Hero", () => {
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
});
