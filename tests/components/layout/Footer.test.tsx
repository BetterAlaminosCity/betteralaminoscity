import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Footer } from "../../../app/components/layout/Footer";

function renderFooter() {
  const router = createMemoryRouter([{ path: "/", Component: Footer }]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Footer", () => {
  it("renders the current year in the copyright line", () => {
    renderFooter();

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("renders the Quick Links column pointing at the new pages", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Sitemap" })).toHaveAttribute("href", "/sitemap");
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

  it("renders the Citizen's Charter link as an external PDF link", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Citizen's Charter" })).toHaveAttribute(
      "href",
      "https://www.alaminoscity.gov.ph/public-service/city-services/CitizensCharter/CC_CGO%20ALAMINOS_2026.pdf",
    );
  });

  it("renders the Resources column with external government/partner links", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Open Data Philippines" })).toHaveAttribute(
      "href",
      "https://data.gov.ph",
    );
    expect(screen.getByRole("link", { name: "Freedom of Information" })).toHaveAttribute(
      "href",
      "https://foi.gov.ph",
    );
    expect(screen.getByRole("link", { name: "Official Alaminos City Website" })).toHaveAttribute(
      "href",
      "https://alaminoscity.gov.ph",
    );
    expect(screen.getByRole("link", { name: "LGU Alaminos City Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/cityofalaminos.pangasinan",
    );
    expect(screen.getByRole("link", { name: "BLGF Portal" })).toHaveAttribute(
      "href",
      "https://blgf.gov.ph",
    );
    expect(screen.getByRole("link", { name: "CMCI DTI Portal" })).toHaveAttribute(
      "href",
      "https://cmci.dti.gov.ph",
    );
  });

  it("renders the cost statement and a GitHub contribute link pointing at the BetterAlaminosCity org", () => {
    renderFooter();

    expect(screen.getByText(/Cost to the People of Alaminos City/)).toBeInTheDocument();
    expect(screen.getByText("₱0.00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contribute Code With Us" })).toHaveAttribute(
      "href",
      "https://github.com/BetterAlaminosCity/betteralaminoscity",
    );
  });

  it("renders the BetterGov.ph logo link", () => {
    renderFooter();

    const link = screen.getByRole("link", { name: "BetterGov.ph" });
    expect(link).toHaveAttribute("href", "https://bettergov.ph");
  });

  it("renders the disclaimer note", () => {
    renderFooter();

    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});
