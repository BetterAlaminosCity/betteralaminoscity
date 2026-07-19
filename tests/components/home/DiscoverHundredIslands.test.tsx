import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { DiscoverHundredIslands } from "../../../app/components/home/DiscoverHundredIslands";

describe("DiscoverHundredIslands", () => {
  it("renders the Hundred Islands National Park heading and body copy", () => {
    render(
      <I18nProvider>
        <DiscoverHundredIslands />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Discover Hundred Islands National Park" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Lingayen Gulf/i)).toBeInTheDocument();
  });
});
