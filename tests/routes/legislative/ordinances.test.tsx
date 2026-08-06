import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import LegislativeOrdinances, { loader } from "../../../app/routes/legislative/ordinances";

function renderPage() {
  const router = createMemoryRouter(
    [
      {
        path: "/legislative/ordinances",
        Component: LegislativeOrdinances,
        loader,
      },
    ],
    { initialEntries: ["/legislative/ordinances"] },
  );
  render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

function dataRows() {
  // getAllByRole("row") includes the header row, so data rows are one fewer.
  return screen.getAllByRole("row").slice(1);
}

describe("LegislativeOrdinances", () => {
  it("lists only the seeded ordinances by default", async () => {
    renderPage();

    expect(await screen.findByRole("heading", { name: "Ordinances" })).toBeInTheDocument();
    expect(dataRows()).toHaveLength(3);
    expect(screen.queryByText(/Coastal Road Rehabilitation/)).not.toBeInTheDocument();
  });

  it("filters by year", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("heading", { name: "Ordinances" });

    await user.selectOptions(screen.getByLabelText("Year"), "2023");

    expect(dataRows()).toHaveLength(1);
    expect(screen.getByText(/Disaster Risk Reduction Fund/)).toBeInTheDocument();
  });

  it("filters by keyword", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("heading", { name: "Ordinances" });

    await user.type(screen.getByPlaceholderText("Search by title or number"), "Plastics");

    expect(dataRows()).toHaveLength(1);
    expect(screen.getByText(/Single-Use Plastics/)).toBeInTheDocument();
  });
});
