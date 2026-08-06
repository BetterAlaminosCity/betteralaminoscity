import { useTranslation } from "react-i18next";

import { CurrentWeather } from "./CurrentWeather";
import { LocationMap } from "./LocationMap";

export function WeatherAndMap() {
  const { t } = useTranslation();

  return (
    <section className="bg-[var(--color-kapwa-bg-gray-default)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
          {t("home.weatherAndMap.heading")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <CurrentWeather />
          </div>
          <div className="lg:col-span-2">
            <LocationMap title={t("home.weatherAndMap.mapTitle")} />
          </div>
        </div>
      </div>
    </section>
  );
}
