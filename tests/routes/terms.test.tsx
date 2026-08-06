import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Terms from "../../app/routes/terms";

function renderTerms() {
  return render(
    <I18nProvider>
      <Terms />
    </I18nProvider>,
  );
}

describe("Terms", () => {
  it("renders the page heading", () => {
    renderTerms();
    expect(screen.getByRole("heading", { name: "Terms of Use", level: 1 })).toBeInTheDocument();
  });

  it("states the site is provided as-is without warranties", () => {
    renderTerms();
    expect(screen.getByRole("heading", { name: "No Warranty" })).toBeInTheDocument();
  });

  it("links to GitHub Issues for reporting content problems", () => {
    renderTerms();
    expect(screen.getByRole("link", { name: "our GitHub repository" })).toHaveAttribute(
      "href",
      "https://github.com/BetterAlaminosCity/betteralaminoscity/issues",
    );
  });
});
