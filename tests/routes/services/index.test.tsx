import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import ServicesIndex, { loader } from "../../../app/routes/services/index";

describe("ServicesIndex", () => {
  it("lists all 10 service categories as links", async () => {
    const router = createMemoryRouter(
      [{ path: "/services", Component: ServicesIndex, loader }],
      { initialEntries: ["/services"] },
    );
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("link", { name: /Health Services/i }),
    ).toHaveAttribute("href", "/services/health-services");
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });
});
