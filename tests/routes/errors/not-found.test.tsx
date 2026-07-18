import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import NotFound from "../../../app/routes/errors/not-found";

describe("NotFound", () => {
  it("renders a 404 heading and a link home", () => {
    const router = createMemoryRouter([{ path: "/404", Component: NotFound }], {
      initialEntries: ["/404"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: /404/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to homepage" })).toHaveAttribute("href", "/");
  });
});
