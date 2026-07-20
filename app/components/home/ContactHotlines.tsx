import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Anchor,
  Building,
  Droplet,
  Flame,
  GraduationCap,
  HeartPulse,
  Phone,
  Radio,
  Scale,
  Search,
  ShieldAlert,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { Hotlines } from "../../lib/content.server";

const ICONS: Record<string, LucideIcon> = {
  "shield-alert": ShieldAlert,
  flame: Flame,
  "alert-triangle": AlertTriangle,
  "heart-pulse": HeartPulse,
  phone: Phone,
  radio: Radio,
  droplet: Droplet,
  anchor: Anchor,
  building: Building,
  "graduation-cap": GraduationCap,
  scale: Scale,
  search: Search,
  zap: Zap,
};

function telHref(number: string): string {
  const trimmed = number.trim();
  const sign = trimmed.startsWith("+") ? "+" : "";
  return `tel:${sign}${trimmed.replace(/[^\d]/g, "")}`;
}

export function ContactHotlines({ hotlines }: { hotlines: Hotlines | null }) {
  const { t } = useTranslation();

  if (!hotlines) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
        {t("home.contact.heading")}
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hotlines.hotlines.map(({ key, name, description, icon, numbers }) => {
          const Icon = (icon && ICONS[icon]) || Phone;
          return (
            <div
              key={key}
              className="flex items-start gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] p-4"
            >
              <Icon
                className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-kapwa-text-brand)]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-[var(--color-kapwa-text-strong)]">
                  {name}
                </p>
                {description ? (
                  <p className="text-xs text-[var(--color-kapwa-text-support)]">{description}</p>
                ) : null}
                <div className="mt-1 flex flex-col">
                  {numbers.map((number) => (
                    <a
                      key={number}
                      href={telHref(number)}
                      className="text-sm text-[var(--color-kapwa-text-support)] hover:text-[var(--color-kapwa-text-brand)]"
                    >
                      {number}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 rounded-lg border border-[var(--color-kapwa-border-danger)] bg-[var(--color-kapwa-bg-danger-weak)] p-4 text-center">
        <p className="text-sm font-semibold text-[var(--color-kapwa-text-danger)]">
          {t("home.contact.emergencyLabel")}{" "}
          <a href={telHref(hotlines.emergencyNumber)} className="underline">
            {hotlines.emergencyNumber}
          </a>
        </p>
      </div>
      <p className="mt-6 text-sm text-[var(--color-kapwa-text-support)]">
        {t("home.contact.cityHall")}
      </p>
    </section>
  );
}
