import { render, screen } from "@testing-library/react";
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
