import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import ServerError from "../../../app/routes/errors/server-error";

describe("ServerError", () => {
  it("renders a 500 heading and a link home", () => {
    const router = createMemoryRouter([{ path: "/500", Component: ServerError }], {
      initialEntries: ["/500"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: /500/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to homepage" })).toHaveAttribute("href", "/");
  });
});
