import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, type LoaderFunction } from "react-router";
import { describe, expect, it } from "vitest";

import ServicesArticle, { loader } from "../../../app/routes/services/article";

describe("ServicesArticle", () => {
  it("renders the article title, body, and a link back to its category", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/services/:category/:article",
          Component: ServicesArticle,
          loader: loader as LoaderFunction,
        },
      ],
      { initialEntries: ["/services/health-services/overview"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText(/City Health Office coordinates/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Health Services" })).toHaveAttribute(
      "href",
      "/services/health-services",
    );
  });

  it("throws a 404 response for an unknown article", () => {
    expect(() =>
      loader({
        params: { category: "health-services", article: "does-not-exist" },
      } as unknown as Parameters<typeof loader>[0]),
    ).toThrow();
  });
});
