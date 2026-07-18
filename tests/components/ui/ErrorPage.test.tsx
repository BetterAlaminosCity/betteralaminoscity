import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { ErrorPage } from "../../../app/components/ui/ErrorPage";

describe("ErrorPage", () => {
  it("renders the code, title, message, and a link home", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        Component: () => (
          <ErrorPage
            code="404"
            title="Page Not Found"
            message="The page you're looking for doesn't exist."
          />
        ),
      },
    ]);
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: /404 — Page Not Found/ })).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to homepage" })).toHaveAttribute("href", "/");
  });
});
