import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import GovernmentIndex, { loader } from "../../../app/routes/government/index";

function renderGovernmentIndex() {
  const router = createMemoryRouter([{ path: "/government", Component: GovernmentIndex, loader }], {
    initialEntries: ["/government"],
  });
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("GovernmentIndex", () => {
  it("renders the page header", async () => {
    renderGovernmentIndex();
    expect(
      await screen.findByRole("heading", { name: "Government Directory" }),
    ).toBeInTheDocument();
  });

  it("renders the Mayor under Executive Leadership", async () => {
    renderGovernmentIndex();
    expect(
      await screen.findByRole("heading", { name: "Executive Leadership" }),
    ).toBeInTheDocument();
    expect(screen.getByText("City Mayor")).toBeInTheDocument();
  });

  it("lists the four non-mayor executive offices under Department Offices", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Department Offices" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /City Engineer's Office/i })).toHaveAttribute(
      "href",
      "/government/city-engineers-office",
    );
    expect(screen.getByRole("link", { name: /City Health Office/i })).toHaveAttribute(
      "href",
      "/government/city-health-office",
    );
    expect(screen.getByRole("link", { name: /City Treasurer's Office/i })).toHaveAttribute(
      "href",
      "/government/city-treasurers-office",
    );
    expect(screen.getByRole("link", { name: /Civil Registrar's Office/i })).toHaveAttribute(
      "href",
      "/government/civil-registrars-office",
    );
  });

  it("lists Sangguniang Panlungsod under Legislative", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Legislative" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sangguniang Panlungsod" })).toHaveAttribute(
      "href",
      "/government/sangguniang-panlungsod",
    );
  });

  it("links to the three civic transparency pages", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Civic Transparency" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Budget & Fiscal Transparency" })).toHaveAttribute(
      "href",
      "/government/transparency",
    );
    expect(screen.getByRole("link", { name: "Ordinances & Resolutions" })).toHaveAttribute(
      "href",
      "/government/ordinances-resolutions",
    );
    expect(screen.getByRole("link", { name: "Statistics & Demographics" })).toHaveAttribute(
      "href",
      "/government/statistics",
    );
  });
});
