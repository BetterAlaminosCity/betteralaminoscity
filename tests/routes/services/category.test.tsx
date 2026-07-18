import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, type LoaderFunction } from "react-router";
import { describe, expect, it } from "vitest";

import ServicesCategory, { loader } from "../../../app/routes/services/category";

describe("ServicesCategory", () => {
  it("renders the category title and its articles", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/services/:category",
          Component: ServicesCategory,
          loader: loader as LoaderFunction,
        },
      ],
      { initialEntries: ["/services/health-services"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Health Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "/services/health-services/overview",
    );
  });

  it("throws a 404 response for an unknown category", () => {
    expect(() =>
      loader({ params: { category: "does-not-exist" } } as unknown as Parameters<typeof loader>[0]),
    ).toThrow();
  });
});
