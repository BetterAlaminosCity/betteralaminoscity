import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import About from "../../app/routes/about";

function renderAbout() {
  return render(
    <I18nProvider>
      <About />
    </I18nProvider>,
  );
}

describe("About", () => {
  it("renders the mission section explaining the project isn't official", () => {
    renderAbout();
    expect(screen.getByRole("heading", { name: "Our Mission" })).toBeInTheDocument();
    expect(screen.getByText(/volunteer-run civic project/i)).toBeInTheDocument();
  });

  it("links to the Contributing Guide and Code of Conduct on GitHub", () => {
    renderAbout();
    expect(screen.getByRole("link", { name: "Read the Contributing Guide" })).toHaveAttribute(
      "href",
      "https://github.com/ljsalcedo-dev/betteralaminoscity/blob/main/CONTRIBUTING.md",
    );
    expect(screen.getByRole("link", { name: "Read the Code of Conduct" })).toHaveAttribute(
      "href",
      "https://github.com/ljsalcedo-dev/betteralaminoscity/blob/main/CODE_OF_CONDUCT.md",
    );
  });

  it("renders the tech stack & transparency section", () => {
    renderAbout();
    expect(screen.getByRole("heading", { name: "Tech Stack & Transparency" })).toBeInTheDocument();
  });
});
