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
import { telHref } from "../../lib/phone";

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

const SM_COL_SPAN: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
};

const LG_COL_SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

export function spanFor(columns: number, count: number): number {
  const remainder = count % columns;
  return remainder === 0 ? columns : columns - remainder;
}

export function ContactHotlines({ hotlines }: { hotlines: Hotlines | null }) {
  const { t } = useTranslation();

  if (!hotlines) return null;

  const count = hotlines.hotlines.length;
  const smSpanClass = SM_COL_SPAN[spanFor(2, count)];
  const lgSpanClass = LG_COL_SPAN[spanFor(3, count)];

  return (
    <section className="bg-[var(--color-kapwa-bg-gray-default)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
          {t("home.contact.heading")}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotlines.hotlines.map(({ key, name, description, icon, numbers }) => {
            const Icon = (icon && ICONS[icon]) || Phone;
            return (
              <div
                key={key}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-4"
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
          <a
            href={telHref(hotlines.emergencyNumber)}
            className={`group flex flex-col items-center justify-center rounded-lg border border-[var(--color-kapwa-border-danger)] bg-[var(--color-kapwa-bg-danger-weak)] p-4 text-center transition-colors hover:bg-[var(--color-kapwa-bg-danger-default)] ${smSpanClass} ${lgSpanClass}`}
          >
            <p className="text-lg font-bold text-[var(--color-kapwa-text-danger)] group-hover:text-white sm:text-xl">
              {t("home.contact.emergencyLabel")}{" "}
              <span className="underline">{hotlines.emergencyNumber}</span>
            </p>
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--color-kapwa-text-support)]">
          {t("home.contact.cityHall")}
        </p>
      </div>
    </section>
  );
}
