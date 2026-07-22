import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { SiteLayout } from "../../../app/components/layout/SiteLayout";
import type { Hotlines } from "../../../app/lib/content.server";

const HOTLINES: Hotlines = {
  lastUpdated: "2026-01-15",
  source: "Sample source",
  emergencyNumber: "911",
  hotlines: [{ key: "police", name: "Sample Police Station", numbers: ["0998-000-0003"] }],
};

function renderLayout(hotlines: Hotlines | null) {
  const router = createMemoryRouter([
    {
      path: "/",
      Component: () => (
        <SiteLayout hotlines={hotlines}>
          <p>Page content</p>
        </SiteLayout>
      ),
    },
  ]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("SiteLayout", () => {
  it("renders the Navbar, page content, Disclaimer, and Footer together", () => {
    renderLayout(HOTLINES);

    expect(
      within(screen.getByRole("banner")).getByRole("link", { name: "Home" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("note")).toBeInTheDocument();
    expect(screen.getByText(/MIT Licensed/)).toBeInTheDocument();
  });

  it("renders the EmergencyHotlineBar above the Navbar", () => {
    renderLayout(HOTLINES);

    expect(screen.getByRole("link", { name: /911/ })).toHaveAttribute("href", "tel:911");
  });

  it("renders nothing extra when hotlines is null", () => {
    renderLayout(null);

    expect(screen.queryByRole("link", { name: /911/ })).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("banner")).getByRole("link", { name: "Home" }),
    ).toBeInTheDocument();
  });
});
