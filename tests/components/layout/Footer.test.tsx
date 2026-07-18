import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Footer } from "../../../app/components/layout/Footer";

describe("Footer", () => {
  it("renders the current year", () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    );
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });
});
