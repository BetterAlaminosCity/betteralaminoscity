import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Navbar } from "../../../app/components/layout/Navbar";

describe("Navbar", () => {
  it("renders Home and About nav links", () => {
    const router = createMemoryRouter([{ path: "/", Component: Navbar }]);
    render(
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("renders a Search nav link", () => {
    const router = createMemoryRouter([{ path: "/", Component: Navbar }]);
    render(
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>,
    );

    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute("href", "/search");
  });
});
