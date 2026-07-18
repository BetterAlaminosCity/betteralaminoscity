import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Footer } from "../../../app/components/layout/Footer";

function renderFooter() {
  const router = createMemoryRouter([{ path: "/", Component: Footer }]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Footer", () => {
  it("renders the current year in the copyright line", () => {
    renderFooter();

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("renders Explore quick links to the main site sections", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: "Government" })).toHaveAttribute("href", "/government");
  });

  it("renders a GitHub source link", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "View source on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/ljsalcedo-dev/betteralaminoscity",
    );
  });

  it("renders the disclaimer note", () => {
    renderFooter();

    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});
