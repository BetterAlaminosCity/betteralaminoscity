import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import Statistics, { loader } from "../../../app/routes/government/statistics";

describe("Statistics", () => {
  it("renders population, barangay breakdown, and economic indicators", async () => {
    const router = createMemoryRouter(
      [{ path: "/government/statistics", Component: Statistics, loader }],
      { initialEntries: ["/government/statistics"] },
    );
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", { name: "Statistics & Demographics" }),
    ).toBeInTheDocument();
    expect(screen.getByText("100,430")).toBeInTheDocument();
    expect(screen.getByText("Poblacion")).toBeInTheDocument();
    expect(screen.getByText(/Poverty Incidence/)).toBeInTheDocument();
  });
});
