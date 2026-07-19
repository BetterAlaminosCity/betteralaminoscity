import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { LocationMap } from "../../../app/components/home/LocationMap";

describe("LocationMap", () => {
  it("renders the map heading and an OpenStreetMap embed", () => {
    render(
      <I18nProvider>
        <LocationMap />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading", { name: "Where to Find Us" })).toBeInTheDocument();
    const iframe = screen.getByTitle("Where to Find Us");
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute("src", expect.stringContaining("openstreetmap.org"));
  });
});
