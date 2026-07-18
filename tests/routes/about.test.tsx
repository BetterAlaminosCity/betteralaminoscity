import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import About from "../../app/routes/about";

describe("About", () => {
  it("renders the disclaimer text explaining the project isn't official", () => {
    render(
      <I18nProvider>
        <About />
      </I18nProvider>,
    );
    expect(screen.getByText(/volunteer-run civic project/i)).toBeInTheDocument();
  });
});
