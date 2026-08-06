import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import LegislativeResolutions, { loader } from "../../../app/routes/legislative/resolutions";

function renderPage() {
  const router = createMemoryRouter(
    [
      {
        path: "/legislative/resolutions",
        Component: LegislativeResolutions,
        loader,
      },
    ],
    { initialEntries: ["/legislative/resolutions"] },
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

describe("LegislativeResolutions", () => {
  it("lists only the seeded resolutions by default", async () => {
    renderPage();

    expect(await screen.findByRole("heading", { name: "Resolutions" })).toBeInTheDocument();
    expect(dataRows()).toHaveLength(3);
    expect(screen.queryByText(/Single-Use Plastics/)).not.toBeInTheDocument();
  });

  it("filters by year", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("heading", { name: "Resolutions" });

    await user.selectOptions(screen.getByLabelText("Year"), "2024");

    expect(dataRows()).toHaveLength(1);
    expect(screen.getByText(/Annual Investment Program/)).toBeInTheDocument();
  });

  it("filters by keyword", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("heading", { name: "Resolutions" });

    await user.type(screen.getByPlaceholderText("Search by title or number"), "Coastal");

    expect(dataRows()).toHaveLength(1);
    expect(screen.getByText(/Coastal Road Rehabilitation/)).toBeInTheDocument();
  });
});
