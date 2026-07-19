import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { OfficialCard } from "../../../app/components/ui/OfficialCard";
import type { Official } from "../../../app/lib/content.server";

const OFFICIAL: Official = { name: "{PLACEHOLDER}", title: "City Mayor" };

describe("OfficialCard", () => {
  it("renders the official's title, name, and links to their office page", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        Component: () => (
          <OfficialCard official={OFFICIAL} href="/government/office-of-the-mayor" />
        ),
      },
    ]);
    render(<RouterProvider router={router} />);

    expect(screen.getByText("City Mayor")).toBeInTheDocument();
    expect(screen.getByText("{PLACEHOLDER}")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/government/office-of-the-mayor");
  });
});
