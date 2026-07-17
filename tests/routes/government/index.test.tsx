import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import GovernmentIndex, { loader } from "../../../app/routes/government/index";

describe("GovernmentIndex", () => {
  it("groups offices under Executive and Legislative headings", async () => {
    const router = createMemoryRouter(
      [{ path: "/government", Component: GovernmentIndex, loader }],
      { initialEntries: ["/government"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Executive" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Legislative" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sangguniang Panlungsod" }),
    ).toHaveAttribute("href", "/government/sangguniang-panlungsod");
  });

  it("links to the three civic transparency pages", async () => {
    const router = createMemoryRouter(
      [{ path: "/government", Component: GovernmentIndex, loader }],
      { initialEntries: ["/government"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Civic Transparency" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Budget & Fiscal Transparency" }),
    ).toHaveAttribute("href", "/government/transparency");
    expect(
      screen.getByRole("link", { name: "Ordinances & Resolutions" }),
    ).toHaveAttribute("href", "/government/ordinances-resolutions");
    expect(
      screen.getByRole("link", { name: "Statistics & Demographics" }),
    ).toHaveAttribute("href", "/government/statistics");
  });
});
