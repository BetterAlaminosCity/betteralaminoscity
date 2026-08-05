import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import Legislative from "../../../app/routes/legislative/index";

function renderPage() {
  const router = createMemoryRouter([{ path: "/legislative", Component: Legislative }], {
    initialEntries: ["/legislative"],
  });
  render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Legislative landing page", () => {
  it("renders the hero", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Legislative Documents" })).toBeInTheDocument();
  });

  it("links the Ordinance Framework card to the ordinances browse page", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /Browse Ordinances/ })).toHaveAttribute(
      "href",
      "/legislative/ordinances",
    );
  });

  it("links the Resolution Framework card to the resolutions browse page", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /Browse Resolutions/ })).toHaveAttribute(
      "href",
      "/legislative/resolutions",
    );
  });
});

describe("Legislative landing page flowchart", () => {
  it("shows the ordinance flow by default", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: "Flowchart for Legislative Proposal" }),
    ).toBeInTheDocument();
    expect(screen.getByText("File Proposed Ordinance")).toBeInTheDocument();
    expect(screen.queryByText("File Proposed Resolution")).not.toBeInTheDocument();
  });

  it("switches to the resolution flow when its tab is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /For Resolutions/ }));

    expect(screen.getByText("File Proposed Resolution")).toBeInTheDocument();
    expect(screen.queryByText("File Proposed Ordinance")).not.toBeInTheDocument();
  });
});

describe("Legislative landing page explainer", () => {
  it("renders all four explainer cards", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: "Understanding Local Legislation" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ordinances")).toBeInTheDocument();
    expect(screen.getByText("Resolutions")).toBeInTheDocument();
    expect(screen.getByText("Public Participation")).toBeInTheDocument();
    expect(screen.getByText("Transparency")).toBeInTheDocument();
  });
});
