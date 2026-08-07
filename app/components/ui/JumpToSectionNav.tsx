import { useEffect, useState } from "react";

export interface JumpToSectionLink {
  id: string;
  label: string;
}

export interface JumpToSectionNavProps {
  eyebrow: string;
  links: JumpToSectionLink[];
}

// Matches the sections' `scroll-mt-24` (6rem = 96px) anchor-scroll offset,
// plus a small buffer, so a section counts as "active" once its heading has
// scrolled just past the sticky header.
const ACTIVE_SECTION_OFFSET_PX = 100;

export function JumpToSectionNav({ eyebrow, links }: JumpToSectionNavProps) {
  const [activeId, setActiveId] = useState(links[0]?.id);
  const linkIds = links.map((link) => link.id).join("|");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Picks the last section (in document order) whose top has scrolled up
    // past the offset — not a narrow "band" intersection — so a short final
    // section still gets picked up even if it never fills the band.
    function updateActiveSection() {
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= ACTIVE_SECTION_OFFSET_PX) {
          current = section.id;
        }
      }

      // A short final section's top can stay below the offset forever if
      // the page runs out of room to scroll further — once the page is
      // scrolled to (or past) its max, force the last section active
      // rather than leaving an earlier one stuck highlighted.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      if (scrolledToBottom) {
        current = sections[sections.length - 1].id;
      }

      setActiveId(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkIds]);

  return (
    <div className="sticky top-20 rounded-2xl border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-4">
      <p className="mb-2 ml-1 text-[0.65rem] font-bold uppercase tracking-wide text-[var(--color-kapwa-text-support)]">
        {eyebrow}
      </p>
      <nav aria-label={eyebrow} className="flex flex-col gap-0.5">
        {links.map((link) => {
          const isActive = link.id === activeId;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={() => setActiveId(link.id)}
              className={
                isActive
                  ? "rounded-lg bg-[var(--color-kapwa-bg-surface-brand)] px-2.5 py-2 text-sm font-bold text-[var(--color-kapwa-text-brand)]"
                  : "rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--color-kapwa-text-support)] hover:bg-[var(--color-kapwa-bg-gray-default)] hover:text-[var(--color-kapwa-text-strong)]"
              }
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
