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
});
