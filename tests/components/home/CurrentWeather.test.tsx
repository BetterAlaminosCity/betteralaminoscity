import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { CurrentWeather } from "../../../app/components/home/CurrentWeather";

const SAMPLE_RESPONSE = {
  current: {
    time: "2026-08-03T14:00",
    temperature_2m: 26.4,
    relative_humidity_2m: 94,
    wind_speed_10m: 6.1,
    weather_code: 61,
  },
  hourly: {
    time: [
      "2026-08-03T14:00",
      "2026-08-03T15:00",
      "2026-08-03T16:00",
      "2026-08-03T17:00",
      "2026-08-03T18:00",
    ],
    temperature_2m: [26.4, 26.1, 25.9, 25.7, 25.5],
    weather_code: [61, 61, 61, 63, 3],
  },
  daily: {
    time: ["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"],
    weather_code: [61, 63, 3, 2, 0],
    temperature_2m_max: [28, 27, 29, 30, 31],
    temperature_2m_min: [24, 23, 24, 25, 24],
  },
};

function renderWeather() {
  return render(
    <I18nProvider>
      <CurrentWeather />
    </I18nProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CurrentWeather", () => {
  it("renders current temperature, condition, location, humidity, wind, hourly strip, and daily forecast on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(SAMPLE_RESPONSE) }),
    );

    renderWeather();

    expect(await screen.findByText("26°C")).toBeInTheDocument();
    expect(screen.getByText("Rain")).toBeInTheDocument();
    expect(screen.getByText("Alaminos City, Pangasinan")).toBeInTheDocument();
    expect(screen.getByText("94%")).toBeInTheDocument();
    expect(screen.getByText("6 km/h")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Weather data by Open-Meteo.com")).toBeInTheDocument();
  });

  it("renders a fallback message when the forecast request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    renderWeather();

    expect(await screen.findByText("Weather unavailable right now.")).toBeInTheDocument();
  });

  it("renders a fallback message when the payload is malformed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([]) }),
    );

    renderWeather();

    expect(await screen.findByText("Weather unavailable right now.")).toBeInTheDocument();
  });

  it("does not throw while the request is pending", () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));

    expect(() => renderWeather()).not.toThrow();
  });
});
