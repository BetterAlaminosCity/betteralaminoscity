import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Privacy from "../../app/routes/privacy";

function renderPrivacy() {
  return render(
    <I18nProvider>
      <Privacy />
    </I18nProvider>,
  );
}

describe("Privacy", () => {
  it("renders the page heading", () => {
    renderPrivacy();
    expect(screen.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeInTheDocument();
  });

  it("does not claim analytics or cookie tracking, and states none is used", () => {
    renderPrivacy();
    expect(screen.getByRole("heading", { name: "Cookies" })).toBeInTheDocument();
    expect(
      screen.getByText("This site does not set tracking or advertising cookies."),
    ).toBeInTheDocument();
  });

  it("links to GitHub Issues as the contact channel", () => {
    renderPrivacy();
    const links = screen.getAllByRole("link", { name: "Open a GitHub issue" });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute(
        "href",
        "https://github.com/BetterAlaminosCity/betteralaminoscity/issues",
      );
    }
  });
});
