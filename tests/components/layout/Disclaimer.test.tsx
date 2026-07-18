import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { Disclaimer } from "../../../app/components/layout/Disclaimer";

describe("Disclaimer", () => {
  it("states the site is not an official government site", () => {
    render(
      <I18nProvider>
        <Disclaimer />
      </I18nProvider>,
    );
    expect(screen.getByText(/not an official (website|page) of/i)).toBeInTheDocument();
  });
});
