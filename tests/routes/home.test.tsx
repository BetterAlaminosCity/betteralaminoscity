import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Home from "../../app/routes/home";

// Home renders <Hero>, which uses <Link> for its CTAs, so it must be
// rendered inside a Router context — same pattern as
// tests/components/layout/Navbar.test.tsx and tests/components/home/Hero.test.tsx.
function renderHome() {
  const router = createMemoryRouter([{ path: "/", Component: Home }]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Home", () => {
  it("renders the hero heading", () => {
    renderHome();
    expect(
      screen.getByRole("heading", {
        name: "BetterAlaminosCity.org",
      }),
    ).toBeInTheDocument();
  });

  it("mentions the Hundred Islands National Park", () => {
    renderHome();
    expect(screen.getByText(/Hundred Islands/i)).toBeInTheDocument();
  });

  it("renders primary and secondary hero CTAs", () => {
    renderHome();
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
