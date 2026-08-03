import { useEffect, useState } from "react";

import { buildForecastUrl, parseForecastResponse, type ForecastData } from "./weather";

export type ForecastStatus = "loading" | "success" | "error";

export interface UseForecastResult {
  status: ForecastStatus;
  data: ForecastData | null;
}

export function useForecast(): UseForecastResult {
  const [status, setStatus] = useState<ForecastStatus>("loading");
  const [data, setData] = useState<ForecastData | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(buildForecastUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Forecast request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((raw) => {
        const parsed = parseForecastResponse(raw);
        if (!cancelled) {
          setData(parsed);
          setStatus("success");
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load weather forecast:", error);
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { status, data };
}
