import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import Forbidden from "../../../app/routes/errors/forbidden";

describe("Forbidden", () => {
  it("renders a 403 heading and a link home", () => {
    const router = createMemoryRouter([{ path: "/403", Component: Forbidden }], {
      initialEntries: ["/403"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: /403/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to homepage" })).toHaveAttribute("href", "/");
  });
});
