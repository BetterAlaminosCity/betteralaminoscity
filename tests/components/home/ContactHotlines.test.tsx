import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { ContactHotlines } from "../../../app/components/home/ContactHotlines";

describe("ContactHotlines", () => {
  it("renders the hotline categories and city hall info", () => {
    render(
      <I18nProvider>
        <ContactHotlines />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Emergency Hotlines & Contact" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Police")).toBeInTheDocument();
    expect(screen.getByText("Fire Department")).toBeInTheDocument();
    expect(screen.getByText(/City Hall/i)).toBeInTheDocument();
  });
});
