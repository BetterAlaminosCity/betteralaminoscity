import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Home, { loader } from "../../app/routes/home";

function renderHome() {
  const router = createMemoryRouter([{ path: "/", Component: Home, loader }], {
    initialEntries: ["/"],
  });
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Home", () => {
  it("renders the hero heading", async () => {
    renderHome();
    expect(
      await screen.findByRole("heading", { name: "BetterAlaminosCity.org" }),
    ).toBeInTheDocument();
  });

  it("renders primary and secondary hero CTAs", async () => {
    renderHome();
    expect(await screen.findByRole("link", { name: "Browse Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(screen.getByRole("link", { name: "Learn About This Project" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("renders the Popular Services section with category cards from real content", async () => {
    renderHome();
    expect(await screen.findByRole("heading", { name: "Popular Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Education/i })).toHaveAttribute(
      "href",
      "/services/education",
    );
  });

  it("renders the City at a Glance stats", async () => {
    renderHome();
    expect(await screen.findByRole("heading", { name: "City at a Glance" })).toBeInTheDocument();
    expect(screen.getByText("100000")).toBeInTheDocument();
  });

  it("renders the Discover Hundred Islands section", async () => {
    renderHome();
    expect(
      await screen.findByRole("heading", { name: "Discover Hundred Islands National Park" }),
    ).toBeInTheDocument();
  });

  it("renders City Leadership cards for the mayor and legislative head", async () => {
    renderHome();
    expect(await screen.findByRole("heading", { name: "City Leadership" })).toBeInTheDocument();
    expect(screen.getByText("City Mayor")).toBeInTheDocument();
  });

  it("renders the Contact & Hotlines and map sections", async () => {
    renderHome();
    expect(
      await screen.findByRole("heading", { name: "Emergency Hotlines & Contact" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where to Find Us" })).toBeInTheDocument();
  });
});
