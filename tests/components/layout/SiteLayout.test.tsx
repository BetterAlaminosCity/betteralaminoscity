import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { SiteLayout } from "../../../app/components/layout/SiteLayout";

describe("SiteLayout", () => {
  it("renders the Navbar, page content, Disclaimer, and Footer together", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        Component: () => (
          <SiteLayout>
            <p>Page content</p>
          </SiteLayout>
        ),
      },
    ]);
    render(
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("note")).toBeInTheDocument();
    expect(screen.getByText(/BetterAlaminosCity\.org\. MIT Licensed/)).toBeInTheDocument();
  });
});
