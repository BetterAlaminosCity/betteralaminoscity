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

  it("renders the jump-to-section sidebar with links to each section", async () => {
    renderGovernmentIndex();
    await screen.findByRole("heading", { name: "Government Directory" });
    expect(screen.getByRole("link", { name: "Executive Branch" })).toHaveAttribute(
      "href",
      "#executive",
    );
    expect(screen.getByRole("link", { name: "Legislative Branch" })).toHaveAttribute(
      "href",
      "#legislative",
    );
    expect(screen.getByRole("link", { name: "Departments & Key Offices" })).toHaveAttribute(
      "href",
      "#departments",
    );
    expect(screen.getByRole("link", { name: "Civic Transparency" })).toHaveAttribute(
      "href",
      "#transparency",
    );
  });

  it("renders the Mayor and Vice Mayor under Executive Branch", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Executive Branch" })).toBeInTheDocument();
    expect(screen.getByText("City Mayor")).toBeInTheDocument();
    expect(screen.getByText(/City Vice Mayor · Presiding Officer, SP/)).toBeInTheDocument();
  });

  it("lists the four non-mayor executive offices under Departments & Key Offices", async () => {
    renderGovernmentIndex();
    expect(
      await screen.findByRole("heading", { name: "Departments & Key Offices" }),
    ).toBeInTheDocument();
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

  it("shows the Legislative Branch empty state when no SB members are authored yet", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Legislative Branch" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sangguniang Panlungsod member profiles will be published here in a future update to this site.",
      ),
    ).toBeInTheDocument();
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
