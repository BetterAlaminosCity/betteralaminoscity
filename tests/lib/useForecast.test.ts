import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useForecast } from "../../app/lib/useForecast";

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

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useForecast", () => {
  it("starts in the loading status", () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
    const { result } = renderHook(() => useForecast());
    expect(result.current.status).toBe("loading");
    expect(result.current.data).toBeNull();
  });

  it("resolves to success with parsed data on a valid response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(SAMPLE_RESPONSE),
      }),
    );
    const { result } = renderHook(() => useForecast());
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data?.current.temperature).toBe(26.4);
    expect(result.current.data?.hourly).toHaveLength(4);
    expect(result.current.data?.daily).toHaveLength(5);
  });

  it("resolves to error when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: () => Promise.resolve({}) }),
    );
    const { result } = renderHook(() => useForecast());
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.data).toBeNull();
  });

  it("resolves to error when the fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const { result } = renderHook(() => useForecast());
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.data).toBeNull();
  });

  it("resolves to error when the payload doesn't parse", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([]) }),
    );
    const { result } = renderHook(() => useForecast());
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.data).toBeNull();
  });
});
