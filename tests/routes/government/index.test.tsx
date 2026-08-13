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
    expect(screen.getByRole("link", { name: "Barangay Officials" })).toHaveAttribute(
      "href",
      "#barangay-officials",
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

  it("lists the four non-mayor executive offices under Departments & Key Offices, with no link to a detail page", async () => {
    renderGovernmentIndex();
    expect(
      await screen.findByRole("heading", { name: "Departments & Key Offices" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City Engineer's Office" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City Health Office" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City Treasurer's Office" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Civil Registrar's Office" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /view office/i })).not.toBeInTheDocument();
  });

  it("renders the Barangay Officials roster under Barangay Officials", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Barangay Officials" })).toBeInTheDocument();
    expect(screen.getByText("Alos")).toBeInTheDocument();
    expect(screen.getByText(/Kap\. Nardenio D\. Castro Jr\./)).toBeInTheDocument();
    expect(screen.getByText("Poblacion")).toBeInTheDocument();
    expect(screen.getByText(/Kap\. German U\. Rabago/)).toBeInTheDocument();
    expect(screen.getByText(/DILG Barangay Officials Directory/)).toBeInTheDocument();
  });

  it("renders the seeded Sangguniang Panlungsod roster under Legislative Branch", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Legislative Branch" })).toBeInTheDocument();
    expect(screen.getByText("Jan Marionne R. Fontelera")).toBeInTheDocument();
    expect(screen.getByText("Alex A. Recosana")).toBeInTheDocument();
    expect(screen.getByText("Loverly B. Paredes")).toBeInTheDocument();
    expect(screen.getByText("Luz B. Vale")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Sangguniang Panlungsod member profiles will be published here in a future update to this site.",
      ),
    ).not.toBeInTheDocument();
  });

  it("links to the statistics page but not Ordinances & Resolutions (moved to the Legislative nav)", async () => {
    renderGovernmentIndex();
    expect(await screen.findByRole("heading", { name: "Civic Transparency" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Statistics & Demographics" })).toHaveAttribute(
      "href",
      "/government/statistics",
    );
    expect(
      screen.queryByRole("link", { name: "Ordinances & Resolutions" }),
    ).not.toBeInTheDocument();
  });
});
