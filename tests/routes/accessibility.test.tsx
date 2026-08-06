import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Accessibility from "../../app/routes/accessibility";

function renderAccessibility() {
  return render(
    <I18nProvider>
      <Accessibility />
    </I18nProvider>,
  );
}

describe("Accessibility", () => {
  it("renders the page heading", () => {
    renderAccessibility();
    expect(screen.getByRole("heading", { name: "Accessibility", level: 1 })).toBeInTheDocument();
  });

  it("states WCAG 2.1 AA as a target, not a certified conformance claim", () => {
    renderAccessibility();
    expect(
      screen.getByText(/not a certified or independently audited conformance claim/),
    ).toBeInTheDocument();
  });

  it("links to GitHub Issues for accessibility feedback", () => {
    renderAccessibility();
    expect(screen.getByRole("link", { name: "Report an issue on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/BetterAlaminosCity/betteralaminoscity/issues",
    );
  });
});
