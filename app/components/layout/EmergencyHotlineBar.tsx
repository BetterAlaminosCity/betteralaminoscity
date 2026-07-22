import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { Hotlines } from "../../lib/content.server";
import { getHotlineIcon } from "../../lib/hotlineIcons";
import { telHref } from "../../lib/phone";

const FEATURED_KEYS = ["police", "bfp", "cdrrmo", "cho"];

export function EmergencyHotlineBar({ hotlines }: { hotlines: Hotlines | null }) {
  const { t } = useTranslation();

  if (!hotlines) return null;

  const featured = FEATURED_KEYS.map((key) =>
    hotlines.hotlines.find((hotline) => hotline.key === key),
  ).filter((hotline): hotline is NonNullable<typeof hotline> => Boolean(hotline));

  return (
    <div className="bg-[var(--color-kapwa-bg-danger-default)] py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 text-sm">
        <a
          href={telHref(hotlines.emergencyNumber)}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 font-bold text-[var(--color-kapwa-bg-danger-default)]"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {t("emergencyBar.emergencyLabel")}: {hotlines.emergencyNumber}
        </a>
        {featured.map((hotline) => {
          const Icon = getHotlineIcon(hotline.icon);
          return (
            <a
              key={hotline.key}
              href={telHref(hotline.numbers[0])}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 hover:bg-white/25"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {hotline.name}: {hotline.numbers[0]}
            </a>
          );
        })}
      </div>
    </div>
  );
}
