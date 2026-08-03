import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { WeatherAndMap } from "../../../app/components/home/WeatherAndMap";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("WeatherAndMap", () => {
  it("renders the section heading, the weather card, and the map", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));

    render(
      <I18nProvider>
        <WeatherAndMap />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Weather and Map of Alaminos City" }),
    ).toBeInTheDocument();
    const iframe = screen.getByTitle("Map of Alaminos City");
    expect(iframe.tagName).toBe("IFRAME");
  });
});
