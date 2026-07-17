import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Home from "../../app/routes/home";

describe("Home", () => {
  it("renders the Alaminos hero heading and Hundred Islands mention", () => {
    render(
      <I18nProvider>
        <Home />
      </I18nProvider>,
    );
    expect(
      screen.getByRole("heading", { name: /BetterAlaminosCity.org/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Hundred Islands/i)).toBeInTheDocument();
  });
});
