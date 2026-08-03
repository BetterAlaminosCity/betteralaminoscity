import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react";

export const ALAMINOS_CITY_COORDINATES = {
  latitude: 16.1547,
  longitude: 119.9779,
};

export type ConditionKey =
  | "clear"
  | "partlyCloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "rainShowers"
  | "snowShowers"
  | "thunderstorm";

export interface WeatherCondition {
  icon: LucideIcon;
  conditionKey: ConditionKey;
}

const WEATHER_CONDITIONS: Array<{ codes: number[]; condition: WeatherCondition }> = [
  { codes: [0], condition: { icon: Sun, conditionKey: "clear" } },
  { codes: [1, 2], condition: { icon: CloudSun, conditionKey: "partlyCloudy" } },
  { codes: [3], condition: { icon: Cloud, conditionKey: "overcast" } },
  { codes: [45, 48], condition: { icon: CloudFog, conditionKey: "fog" } },
  { codes: [51, 53, 55, 56, 57], condition: { icon: CloudDrizzle, conditionKey: "drizzle" } },
  { codes: [61, 63, 65, 66, 67], condition: { icon: CloudRain, conditionKey: "rain" } },
  { codes: [71, 73, 75, 77], condition: { icon: CloudSnow, conditionKey: "snow" } },
  { codes: [80, 81, 82], condition: { icon: CloudRain, conditionKey: "rainShowers" } },
  { codes: [85, 86], condition: { icon: CloudSnow, conditionKey: "snowShowers" } },
  { codes: [95, 96, 99], condition: { icon: CloudLightning, conditionKey: "thunderstorm" } },
];

const DEFAULT_CONDITION: WeatherCondition = { icon: Cloud, conditionKey: "overcast" };

export function getWeatherCondition(code: number): WeatherCondition {
  const match = WEATHER_CONDITIONS.find((entry) => entry.codes.includes(code));
  return match ? match.condition : DEFAULT_CONDITION;
}

export function buildForecastUrl(): string {
  const params = new URLSearchParams({
    latitude: String(ALAMINOS_CITY_COORDINATES.latitude),
    longitude: String(ALAMINOS_CITY_COORDINATES.longitude),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "5",
    timezone: "Asia/Manila",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export interface HourlyForecastEntry {
  time: string;
  temperature: number;
  code: number;
}

export interface DailyForecastEntry {
  date: string;
  code: number;
  tempMax: number;
  tempMin: number;
}

export interface ForecastData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    code: number;
  };
  hourly: HourlyForecastEntry[];
  daily: DailyForecastEntry[];
}

function asRecord(value: unknown, message: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    throw new Error(message);
  }
  return value as Record<string, unknown>;
}

export function parseForecastResponse(raw: unknown): ForecastData {
  const root = asRecord(raw, "Invalid forecast response: not an object");

  const currentData = asRecord(root.current, "Invalid forecast response: missing current");
  const currentTime = currentData.time;
  const temperature = currentData.temperature_2m;
  const humidity = currentData.relative_humidity_2m;
  const windSpeed = currentData.wind_speed_10m;
  const code = currentData.weather_code;
  if (
    typeof currentTime !== "string" ||
    typeof temperature !== "number" ||
    typeof humidity !== "number" ||
    typeof windSpeed !== "number" ||
    typeof code !== "number"
  ) {
    throw new Error("Invalid forecast response: malformed current block");
  }

  const hourlyData = asRecord(root.hourly, "Invalid forecast response: missing hourly");
  const hourlyTimes = hourlyData.time;
  const hourlyTemps = hourlyData.temperature_2m;
  const hourlyCodes = hourlyData.weather_code;
  if (!Array.isArray(hourlyTimes) || !Array.isArray(hourlyTemps) || !Array.isArray(hourlyCodes)) {
    throw new Error("Invalid forecast response: malformed hourly block");
  }
  // Open-Meteo's `current` block updates every 15 minutes, but `hourly.time`
  // entries are only ever on the hour. Truncate `currentTime` down to its
  // hour before searching so the lookup succeeds regardless of which
  // quarter-hour `current.time` landed on.
  const currentHour = `${currentTime.slice(0, 13)}:00`;
  const currentIndex = hourlyTimes.indexOf(currentHour);
  if (currentIndex === -1) {
    throw new Error("Invalid forecast response: current time not found in hourly series");
  }
  const hourly: HourlyForecastEntry[] = [];
  for (let i = currentIndex + 1; i <= currentIndex + 4; i++) {
    const time = hourlyTimes[i];
    const hourlyTemperature = hourlyTemps[i];
    const hourlyCode = hourlyCodes[i];
    if (
      typeof time !== "string" ||
      typeof hourlyTemperature !== "number" ||
      typeof hourlyCode !== "number"
    ) {
      throw new Error("Invalid forecast response: incomplete hourly series");
    }
    hourly.push({ time, temperature: hourlyTemperature, code: hourlyCode });
  }

  const dailyData = asRecord(root.daily, "Invalid forecast response: missing daily");
  const dailyDates = dailyData.time;
  const dailyCodes = dailyData.weather_code;
  const dailyMax = dailyData.temperature_2m_max;
  const dailyMin = dailyData.temperature_2m_min;
  if (
    !Array.isArray(dailyDates) ||
    !Array.isArray(dailyCodes) ||
    !Array.isArray(dailyMax) ||
    !Array.isArray(dailyMin) ||
    dailyDates.length < 5
  ) {
    throw new Error("Invalid forecast response: malformed daily block");
  }
  const daily: DailyForecastEntry[] = [];
  for (let i = 0; i < 5; i++) {
    const date = dailyDates[i];
    const dailyCode = dailyCodes[i];
    const tempMax = dailyMax[i];
    const tempMin = dailyMin[i];
    if (
      typeof date !== "string" ||
      typeof dailyCode !== "number" ||
      typeof tempMax !== "number" ||
      typeof tempMin !== "number"
    ) {
      throw new Error("Invalid forecast response: incomplete daily series");
    }
    daily.push({ date, code: dailyCode, tempMax, tempMin });
  }

  return {
    current: { temperature, humidity, windSpeed, code },
    hourly,
    daily,
  };
}
