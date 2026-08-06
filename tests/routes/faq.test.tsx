import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Faq from "../../app/routes/faq";

function renderFaq() {
  const router = createMemoryRouter([{ path: "/", Component: Faq }]);
  return render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Faq", () => {
  it("renders the page heading", () => {
    renderFaq();
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions", level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders all five topic groups", () => {
    renderFaq();
    expect(screen.getByRole("heading", { name: "General" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Certificates & Documents" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Business & Permits" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Payments & Fees" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Social Services" })).toBeInTheDocument();
  });

  it("states City Hall's real office hours", () => {
    renderFaq();
    expect(screen.getByText(/Monday to Friday, 8:00 AM to 5:00 PM/)).toBeInTheDocument();
  });

  it("does not invent a business permit renewal deadline", () => {
    renderFaq();
    expect(screen.queryByText(/January 20/)).not.toBeInTheDocument();
  });

  it("links to the Business services category from the new-business question", () => {
    renderFaq();
    expect(screen.getByRole("link", { name: "Business services" })).toHaveAttribute(
      "href",
      "/services/business",
    );
  });
});
