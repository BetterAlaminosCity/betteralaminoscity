import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import OrdinancesResolutions, {
  loader,
} from "../../../app/routes/government/ordinances-resolutions";

function renderPage() {
  const router = createMemoryRouter(
    [
      {
        path: "/government/ordinances-resolutions",
        Component: OrdinancesResolutions,
        loader,
      },
    ],
    { initialEntries: ["/government/ordinances-resolutions"] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

describe("OrdinancesResolutions", () => {
  it("lists all seeded ordinances and resolutions by default", async () => {
    renderPage();

    expect(
      await screen.findByRole("heading", { name: "Ordinances & Resolutions" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });

  it("filters by year", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("heading", { name: "Ordinances & Resolutions" });

    await user.selectOptions(screen.getByLabelText("Year"), "2023");

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/Disaster Risk Reduction Fund/)).toBeInTheDocument();
  });

  it("filters by keyword", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("heading", { name: "Ordinances & Resolutions" });

    await user.type(screen.getByPlaceholderText("Search by title or number"), "Plastics");

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/Single-Use Plastics/)).toBeInTheDocument();
  });
});
