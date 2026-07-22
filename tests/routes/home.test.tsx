import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

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
    const educationLinks = screen.getAllByRole("link", { name: /Education/i });
    expect(educationLinks.length).toBeGreaterThanOrEqual(1);
    expect(educationLinks[0]).toHaveAttribute("href", "/services/education");
  });

  it("renders the hero search widget with popular category chips", async () => {
    renderHome();
    expect(await screen.findByRole("heading", { name: "Find a Service" })).toBeInTheDocument();
    const businessLinks = screen.getAllByRole("link", { name: "Business" });
    expect(businessLinks.length).toBeGreaterThanOrEqual(1);
    expect(businessLinks[0]).toHaveAttribute("href", "/services/business");
  });

  it("renders the City at a Glance stats", async () => {
    renderHome();
    expect(await screen.findByRole("heading", { name: "City at a Glance" })).toBeInTheDocument();
    expect(screen.getByText("100430")).toBeInTheDocument();
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
    expect(screen.getByText("CDRRMO")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /911/ })).toHaveAttribute("href", "tel:911");
    expect(screen.getByRole("heading", { name: "Where to Find" })).toBeInTheDocument();
  });
});
