import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import ServicesIndex, { loader } from "../../../app/routes/services/index";

function renderServicesIndex() {
  const router = createMemoryRouter([{ path: "/services", Component: ServicesIndex, loader }], {
    initialEntries: ["/services"],
  });
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("ServicesIndex", () => {
  it("renders the page header", async () => {
    renderServicesIndex();

    expect(
      await screen.findByRole("heading", { name: "City Services Directory" }),
    ).toBeInTheDocument();
  });

  it("lists all 14 service categories as links", async () => {
    renderServicesIndex();

    expect(await screen.findByRole("link", { name: /Health Services/i })).toHaveAttribute(
      "href",
      "/services/health-services",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(14);
  });
});
