import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, type LoaderFunction } from "react-router";
import { describe, expect, it } from "vitest";

import GovernmentArticle, { loader } from "../../../app/routes/government/article";

describe("GovernmentArticle", () => {
  it("renders the article title, body, and a link back to its office", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/government/:office/:article",
          Component: GovernmentArticle,
          loader: loader as LoaderFunction,
        },
      ],
      { initialEntries: ["/government/office-of-the-mayor/overview"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText(/chief executive office/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Office of the Mayor" })).toHaveAttribute(
      "href",
      "/government/office-of-the-mayor",
    );
  });

  it("throws a 404 response for an unknown article", () => {
    expect(() =>
      loader({
        params: { office: "office-of-the-mayor", article: "does-not-exist" },
      } as unknown as Parameters<typeof loader>[0]),
    ).toThrow();
  });
});
