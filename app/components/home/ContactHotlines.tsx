import { useTranslation } from "react-i18next";
import { AlertTriangle, Flame, HeartPulse, ShieldAlert } from "lucide-react";

const HOTLINES = [
  { key: "police", icon: ShieldAlert, number: "(075) 000-0000" },
  { key: "fire", icon: Flame, number: "(075) 000-0001" },
  { key: "mdrrmo", icon: AlertTriangle, number: "(075) 000-0002" },
  { key: "health", icon: HeartPulse, number: "(075) 000-0003" },
] as const;

export function ContactHotlines() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)] sm:text-3xl">
        {t("home.contact.heading")}
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOTLINES.map(({ key, icon: Icon, number }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] p-4"
          >
            <Icon className="h-6 w-6 text-[var(--color-kapwa-text-brand)]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[var(--color-kapwa-text-strong)]">
                {t(`home.contact.${key}`)}
              </p>
              <p className="text-sm text-[var(--color-kapwa-text-support)]">{number}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-[var(--color-kapwa-text-support)]">
        {t("home.contact.cityHall")}
      </p>
    </section>
  );
}
