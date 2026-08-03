import { Droplets, MapPin, Wind } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useForecast } from "../../lib/useForecast";
import { getWeatherCondition } from "../../lib/weather";

function formatHour(time: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { hour: "numeric", hour12: true }).format(new Date(time));
}

export function formatWeekday(date: string, locale: string): string {
  // A bare date-only string (e.g. "2026-08-04") parses as UTC midnight per
  // the ECMAScript spec, but Intl.DateTimeFormat renders it in the viewer's
  // local timezone — for timezones west of UTC that shifts the weekday back
  // by one day. Appending a time-of-day makes it parse as local time instead,
  // matching how formatHour's datetime-without-offset strings behave.
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(`${date}T00:00`));
}

export function CurrentWeather() {
  const { t, i18n } = useTranslation();
  const { status, data } = useForecast();

  if (status === "loading") {
    return (
      <div className="flex h-full flex-col gap-4 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
        <span className="sr-only" role="status">
          {t("home.weatherAndMap.loading")}
        </span>
        <div className="h-16 animate-pulse rounded bg-[var(--color-kapwa-bg-gray-default)]" />
        <div className="h-24 animate-pulse rounded bg-[var(--color-kapwa-bg-gray-default)]" />
        <div className="h-20 animate-pulse rounded bg-[var(--color-kapwa-bg-gray-default)]" />
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6 text-center">
        <p className="text-sm text-[var(--color-kapwa-text-support)]">
          {t("home.weatherAndMap.error")}
        </p>
      </div>
    );
  }

  const currentCondition = getWeatherCondition(data.current.code);
  const CurrentIcon = currentCondition.icon;

  return (
    <div className="flex h-full flex-col rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-6">
      <div className="flex items-center gap-4">
        <CurrentIcon
          className="h-12 w-12 shrink-0 text-[var(--color-kapwa-text-brand)]"
          aria-hidden="true"
        />
        <div>
          <p className="text-4xl font-extrabold text-[var(--color-kapwa-text-strong)]">
            {Math.round(data.current.temperature)}°C
          </p>
          <p className="text-[var(--color-kapwa-text-support)]">
            {t(`home.weatherAndMap.conditions.${currentCondition.conditionKey}`)}
          </p>
        </div>
      </div>
      <p className="mt-2 flex items-center gap-1 text-sm text-[var(--color-kapwa-text-support)]">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {t("home.weatherAndMap.location")}
      </p>

      <div className="mt-4 flex gap-6 border-t border-[var(--color-kapwa-border-weak)] pt-4 text-sm text-[var(--color-kapwa-text-support)]">
        <span
          className="flex items-center gap-1"
          aria-label={`${t("home.weatherAndMap.humidity")}: ${Math.round(data.current.humidity)}%`}
        >
          <Droplets className="h-4 w-4" aria-hidden="true" />
          {Math.round(data.current.humidity)}%
        </span>
        <span
          className="flex items-center gap-1"
          aria-label={`${t("home.weatherAndMap.wind")}: ${Math.round(data.current.windSpeed)} km/h`}
        >
          <Wind className="h-4 w-4" aria-hidden="true" />
          {Math.round(data.current.windSpeed)} km/h
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-[var(--color-kapwa-border-weak)] pt-4">
        {data.hourly.map((hour) => {
          const HourIcon = getWeatherCondition(hour.code).icon;
          return (
            <div key={hour.time} className="flex flex-col items-center gap-1 text-center">
              <span className="text-xs text-[var(--color-kapwa-text-support)]">
                {formatHour(hour.time, i18n.language)}
              </span>
              <HourIcon
                className="h-5 w-5 text-[var(--color-kapwa-text-brand)]"
                aria-hidden="true"
              />
              <span className="text-sm font-bold text-[var(--color-kapwa-text-strong)]">
                {Math.round(hour.temperature)}°
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-[var(--color-kapwa-border-weak)] pt-4">
        {data.daily.map((day, index) => {
          const DayIcon = getWeatherCondition(day.code).icon;
          return (
            <div key={day.date} className="flex items-center justify-between text-sm">
              <span className="w-16 text-[var(--color-kapwa-text-support)]">
                {index === 0
                  ? t("home.weatherAndMap.today")
                  : formatWeekday(day.date, i18n.language)}
              </span>
              <DayIcon
                className="h-5 w-5 text-[var(--color-kapwa-text-brand)]"
                aria-hidden="true"
              />
              <span className="text-[var(--color-kapwa-text-strong)]">
                {Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°
              </span>
            </div>
          );
        })}
      </div>

      <a
        href="https://open-meteo.com/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 block text-xs text-[var(--color-kapwa-text-support)] hover:text-[var(--color-kapwa-text-brand)]"
      >
        {t("home.weatherAndMap.attribution")}
      </a>
    </div>
  );
}
