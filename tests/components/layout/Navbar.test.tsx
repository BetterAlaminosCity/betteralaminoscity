import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Navbar } from "../../../app/components/layout/Navbar";

function renderNavbar() {
  const router = createMemoryRouter([
    { path: "/", Component: Navbar },
    { path: "*", Component: Navbar },
  ]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Navbar", () => {
  it("renders a Home nav link", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("does not render an About link (About lives in the footer only)", () => {
    renderNavbar();

    expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
  });

  it("renders a Transparency nav link pointing to the budget & fiscal transparency page", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Transparency" })).toHaveAttribute(
      "href",
      "/transparency",
    );
  });

  it("does not render a separate Search nav link (search lives in the hero)", () => {
    renderNavbar();

    expect(screen.queryByRole("link", { name: "Search" })).not.toBeInTheDocument();
  });

  it("keeps the mobile menu collapsed by default", () => {
    renderNavbar();

    const toggle = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(1);
  });

  it("expands the mobile menu and duplicates the nav links when toggled open", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggle = screen.getByRole("button", { name: "Toggle navigation menu" });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Government" })).toHaveLength(2);
  });

  it("centers the nav links between the logo and language switcher on desktop", () => {
    renderNavbar();

    const homeLink = screen.getAllByRole("link", { name: "Home" })[0];
    const linksContainer = homeLink.parentElement;
    expect(linksContainer).toHaveClass("flex-1", "justify-center");
  });

  it("renders a Legislative nav link pointing to the legislative page", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Legislative" })).toHaveAttribute(
      "href",
      "/legislative",
    );
  });

  it("shows a Legislative link in the mobile menu when open", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));

    const mobileNav = document.getElementById("mobile-nav-menu")!;
    expect(within(mobileNav).getByRole("link", { name: "Legislative" })).toHaveAttribute(
      "href",
      "/legislative",
    );
  });
});
