import { useTranslation } from "react-i18next";

import type { Hotlines } from "../../lib/content.server";
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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-1 px-4 text-sm">
        <a href={telHref(hotlines.emergencyNumber)} className="font-bold underline">
          {t("emergencyBar.emergencyLabel")}: {hotlines.emergencyNumber}
        </a>
        {featured.map((hotline) => (
          <a key={hotline.key} href={telHref(hotline.numbers[0])} className="hover:underline">
            {hotline.name}: {hotline.numbers[0]}
          </a>
        ))}
      </div>
    </div>
  );
}
