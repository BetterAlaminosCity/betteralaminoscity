import { useState } from "react";

export interface JumpToSectionLink {
  id: string;
  label: string;
}

export interface JumpToSectionNavProps {
  eyebrow: string;
  links: JumpToSectionLink[];
}

export function JumpToSectionNav({ eyebrow, links }: JumpToSectionNavProps) {
  const [activeId, setActiveId] = useState(links[0]?.id);

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
