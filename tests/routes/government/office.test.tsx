import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, type LoaderFunction } from "react-router";
import { describe, expect, it } from "vitest";

import GovernmentOffice, { loader } from "../../../app/routes/government/office";

describe("GovernmentOffice", () => {
  it("renders the office title, official, and its articles", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/government/:office",
          Component: GovernmentOffice,
          loader: loader as LoaderFunction,
        },
      ],
      { initialEntries: ["/government/office-of-the-mayor"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Office of the Mayor" })).toBeInTheDocument();
    expect(screen.getByText(/City Mayor: \{PLACEHOLDER\}/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "/government/office-of-the-mayor/overview",
    );
  });

  it("throws a 404 response for an unknown office", () => {
    expect(() =>
      loader({ params: { office: "does-not-exist" } } as unknown as Parameters<typeof loader>[0]),
    ).toThrow();
  });
});
