import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import Transparency, { loader } from "../../../app/routes/government/transparency";

describe("Transparency", () => {
  it("renders income, expenditure, and infrastructure project data", async () => {
    const router = createMemoryRouter(
      [{ path: "/government/transparency", Component: Transparency, loader }],
      { initialEntries: ["/government/transparency"] },
    );
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", { name: "Budget & Fiscal Transparency" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Real Property Tax")).toBeInTheDocument();
    expect(screen.getByText("Personnel Services")).toBeInTheDocument();
    expect(screen.getByText("Barangay Road Concreting (Sample)")).toBeInTheDocument();
    expect(screen.getByText(/Data last updated/)).toBeInTheDocument();
  });
});
