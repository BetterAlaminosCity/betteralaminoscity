import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { BriefHistory } from "../../../app/components/home/BriefHistory";

describe("BriefHistory", () => {
  it("renders the history heading and narrative body", () => {
    render(
      <I18nProvider>
        <BriefHistory />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "A Brief History of Alaminos City" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/chartered as a city in 2001/i)).toBeInTheDocument();
  });
});
