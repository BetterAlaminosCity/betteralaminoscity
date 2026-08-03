import { describe, expect, it } from "vitest";

import {
  ALAMINOS_CITY_COORDINATES,
  buildForecastUrl,
  getWeatherCondition,
  parseForecastResponse,
} from "../../app/lib/weather";

describe("getWeatherCondition", () => {
  it.each([
    [0, "clear"],
    [1, "partlyCloudy"],
    [2, "partlyCloudy"],
    [3, "overcast"],
    [45, "fog"],
    [48, "fog"],
    [51, "drizzle"],
    [57, "drizzle"],
    [61, "rain"],
    [67, "rain"],
    [71, "snow"],
    [77, "snow"],
    [80, "rainShowers"],
    [82, "rainShowers"],
    [85, "snowShowers"],
    [86, "snowShowers"],
    [95, "thunderstorm"],
    [99, "thunderstorm"],
  ])("maps WMO code %i to conditionKey %s", (code, expected) => {
    expect(getWeatherCondition(code).conditionKey).toBe(expected);
  });

  it("falls back to overcast for an unrecognized code", () => {
    expect(getWeatherCondition(9999).conditionKey).toBe("overcast");
  });
});

describe("buildForecastUrl", () => {
  it("targets the Open-Meteo forecast endpoint with Alaminos City coordinates and all required params", () => {
    const url = new URL(buildForecastUrl());
    expect(url.origin + url.pathname).toBe("https://api.open-meteo.com/v1/forecast");
    expect(url.searchParams.get("latitude")).toBe(String(ALAMINOS_CITY_COORDINATES.latitude));
    expect(url.searchParams.get("longitude")).toBe(String(ALAMINOS_CITY_COORDINATES.longitude));
    expect(url.searchParams.get("current")).toBe(
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    );
    expect(url.searchParams.get("hourly")).toBe("temperature_2m,weather_code");
    expect(url.searchParams.get("daily")).toBe(
      "weather_code,temperature_2m_max,temperature_2m_min",
    );
    expect(url.searchParams.get("forecast_days")).toBe("5");
    expect(url.searchParams.get("timezone")).toBe("Asia/Manila");
  });
});

function buildSampleResponse() {
  return {
    current: {
      time: "2026-08-03T14:00",
      temperature_2m: 26.4,
      relative_humidity_2m: 94,
      wind_speed_10m: 6.1,
      weather_code: 61,
    },
    hourly: {
      time: [
        "2026-08-03T13:00",
        "2026-08-03T14:00",
        "2026-08-03T15:00",
        "2026-08-03T16:00",
        "2026-08-03T17:00",
        "2026-08-03T18:00",
      ],
      temperature_2m: [26.8, 26.4, 26.1, 25.9, 25.7, 25.5],
      weather_code: [61, 61, 61, 61, 63, 3],
    },
    daily: {
      time: ["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"],
      weather_code: [61, 63, 3, 2, 0],
      temperature_2m_max: [28, 27, 29, 30, 31],
      temperature_2m_min: [24, 23, 24, 25, 24],
    },
  };
}

describe("parseForecastResponse", () => {
  it("extracts current conditions, the 4 hours after the current one, and 5 daily entries", () => {
    const result = parseForecastResponse(buildSampleResponse());

    expect(result.current).toEqual({
      temperature: 26.4,
      humidity: 94,
      windSpeed: 6.1,
      code: 61,
    });

    expect(result.hourly).toHaveLength(4);
    expect(result.hourly[0]).toEqual({ time: "2026-08-03T15:00", temperature: 26.1, code: 61 });
    expect(result.hourly[3]).toEqual({ time: "2026-08-03T18:00", temperature: 25.5, code: 3 });

    expect(result.daily).toHaveLength(5);
    expect(result.daily[0]).toEqual({ date: "2026-08-03", code: 61, tempMax: 28, tempMin: 24 });
    expect(result.daily[4]).toEqual({ date: "2026-08-07", code: 0, tempMax: 31, tempMin: 24 });
  });

  it("throws when the payload is not an object", () => {
    expect(() => parseForecastResponse([])).toThrow();
  });

  it("throws when the current block is missing", () => {
    const response = buildSampleResponse();
    // @ts-expect-error intentionally malformed for the test
    delete response.current;
    expect(() => parseForecastResponse(response)).toThrow();
  });

  it("throws when the current time isn't present in the hourly series", () => {
    const response = buildSampleResponse();
    response.current.time = "2026-08-03T23:00";
    expect(() => parseForecastResponse(response)).toThrow();
  });

  it("throws when there are fewer than 5 daily entries", () => {
    const response = buildSampleResponse();
    response.daily.time = response.daily.time.slice(0, 3);
    expect(() => parseForecastResponse(response)).toThrow();
  });
});
