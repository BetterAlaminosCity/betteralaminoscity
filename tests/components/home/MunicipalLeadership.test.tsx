import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { MunicipalLeadership } from "../../../app/components/home/MunicipalLeadership";
import type { Official } from "../../../app/lib/content.server";

const MAYOR: Official = { name: "Arth Bryan C. Celeste", title: "City Mayor" };
const LEGISLATIVE_HEAD: Official = {
  name: "Jose Antonio Miguel Y. Perez",
  title: "City Vice Mayor",
};

function renderLeadership(mayor: Official | null, legislativeHead: Official | null) {
  const router = createMemoryRouter([
    {
      path: "/",
      Component: () => <MunicipalLeadership mayor={mayor} legislativeHead={legislativeHead} />,
    },
  ]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("MunicipalLeadership", () => {
  it("renders a card for the mayor linking to their office page", () => {
    renderLeadership(MAYOR, null);

    expect(screen.getByRole("heading", { name: "City Leadership" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /City Mayor/i })).toHaveAttribute(
      "href",
      "/government/office-of-the-mayor",
    );
  });

  it("renders a card for the legislative head linking to their office page", () => {
    renderLeadership(null, LEGISLATIVE_HEAD);

    expect(screen.getByRole("link", { name: /City Vice Mayor/i })).toHaveAttribute(
      "href",
      "/government/sangguniang-panlungsod",
    );
  });

  it("renders nothing when both officials are null", () => {
    const { container } = renderLeadership(null, null);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders both cards when both mayor and legislative head are present", () => {
    renderLeadership(MAYOR, LEGISLATIVE_HEAD);

    expect(screen.getByRole("link", { name: /City Mayor/i })).toHaveAttribute(
      "href",
      "/government/office-of-the-mayor",
    );
    expect(screen.getByRole("link", { name: /City Vice Mayor/i })).toHaveAttribute(
      "href",
      "/government/sangguniang-panlungsod",
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
