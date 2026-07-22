import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { Hotline, Hotlines } from "../../lib/content.server";
import { getHotlineIcon } from "../../lib/hotlineIcons";
import { telHref } from "../../lib/phone";

const FEATURED_KEYS = ["police", "bfp", "cdrrmo", "cho"];
const SCROLL_SPEED_PX_PER_FRAME = 0.5;

function HotlinePills({
  emergencyNumber,
  emergencyLabel,
  featured,
  interactive,
}: {
  emergencyNumber: string;
  emergencyLabel: string;
  featured: Hotline[];
  interactive: boolean;
}) {
  const tabIndex = interactive ? undefined : -1;

  return (
    <>
      <a
        href={telHref(emergencyNumber)}
        tabIndex={tabIndex}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 font-bold text-[var(--color-kapwa-bg-danger-default)]"
      >
        <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {emergencyLabel}: {emergencyNumber}
      </a>
      {featured.map((hotline) => {
        const Icon = getHotlineIcon(hotline.icon);
        return (
          <a
            key={hotline.key}
            href={telHref(hotline.numbers[0])}
            tabIndex={tabIndex}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 hover:bg-white/25"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {hotline.name}: {hotline.numbers[0]}
          </a>
        );
      })}
    </>
  );
}

export function EmergencyHotlineBar({ hotlines }: { hotlines: Hotlines | null }) {
  const { t } = useTranslation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const repeatRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Only a bar whose pills don't fit at the current viewport width needs to
  // scroll at all — everything else should sit still, centered.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;

    const checkOverflow = () => {
      setIsOverflowing(content.scrollWidth > scroller.clientWidth);
    };
    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Auto-scroll only kicks in once the bar is actually overflowing, once the
  // duplicate pill set (rendered below) exists to loop against.
  useEffect(() => {
    if (!isOverflowing) return;

    const scroller = scrollerRef.current;
    const loopStart = contentRef.current;
    const loopRepeat = repeatRef.current;
    if (!scroller || !loopStart || !loopRepeat) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const loopWidth =
      loopRepeat.getBoundingClientRect().left - loopStart.getBoundingClientRect().left;
    if (loopWidth <= 0) return;

    let frameId: number;
    const tick = () => {
      if (!pausedRef.current) {
        scroller.scrollLeft += SCROLL_SPEED_PX_PER_FRAME;
        if (scroller.scrollLeft >= loopWidth) {
          scroller.scrollLeft -= loopWidth;
        }
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isOverflowing]);

  if (!hotlines) return null;

  const featured = FEATURED_KEYS.map((key) =>
    hotlines.hotlines.find((hotline) => hotline.key === key),
  ).filter((hotline): hotline is NonNullable<typeof hotline> => Boolean(hotline));

  const emergencyLabel = t("emergencyBar.emergencyLabel");

  return (
    <div className="bg-[var(--color-kapwa-bg-danger-default)] py-2 text-white">
      <div
        ref={scrollerRef}
        className={`mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm ${
          isOverflowing
            ? "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "justify-center"
        }`}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onTouchStart={() => {
          pausedRef.current = true;
        }}
        onTouchEnd={() => {
          pausedRef.current = false;
        }}
      >
        <div ref={contentRef} className="flex shrink-0 items-center gap-2">
          <HotlinePills
            emergencyNumber={hotlines.emergencyNumber}
            emergencyLabel={emergencyLabel}
            featured={featured}
            interactive
          />
        </div>
        {isOverflowing && (
          <div ref={repeatRef} aria-hidden="true" className="flex shrink-0 items-center gap-2">
            <HotlinePills
              emergencyNumber={hotlines.emergencyNumber}
              emergencyLabel={emergencyLabel}
              featured={featured}
              interactive={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
