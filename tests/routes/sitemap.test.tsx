import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Sitemap, { loader } from "../../app/routes/sitemap";

async function renderSitemap() {
  const router = createMemoryRouter([{ path: "/", Component: Sitemap, loader }]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Sitemap", () => {
  it("renders the page heading", async () => {
    await renderSitemap();
    expect(await screen.findByRole("heading", { name: "Sitemap", level: 1 })).toBeInTheDocument();
  });

  it("lists main pages including the new legal/support pages", async () => {
    await renderSitemap();
    expect(await screen.findByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Terms of Use" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(screen.getByRole("link", { name: "Accessibility" })).toHaveAttribute(
      "href",
      "/accessibility",
    );
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });

  it("lists every service category from the content loader", async () => {
    await renderSitemap();
    expect(await screen.findByRole("link", { name: "Health Services" })).toHaveAttribute(
      "href",
      "/services/health-services",
    );
  });

  it("does not list individual government offices (detail pages are removed for now)", async () => {
    await renderSitemap();
    await screen.findByRole("heading", { name: "Sitemap", level: 1 });
    expect(screen.queryByRole("link", { name: "Office of the Mayor" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /emergency hotlines/i })).not.toBeInTheDocument();
  });
});
