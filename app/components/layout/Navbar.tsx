import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useTranslation } from "react-i18next";

import { SITE_NAV_LINKS } from "../../lib/navLinks";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

function navLinkClassName(isActive: boolean) {
  return [
    "border-b-2 pb-1 text-sm font-medium transition-colors",
    isActive
      ? "border-[var(--color-kapwa-border-brand)] text-[var(--color-kapwa-text-brand)]"
      : "border-transparent text-[var(--color-kapwa-text-support)] hover:text-[var(--color-kapwa-text-brand)]",
  ].join(" ");
}

export function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)]/95 backdrop-blur">
      <nav
        aria-label={t("nav.mainLabel")}
        className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3"
      >
        <Link to="/" className="shrink-0">
          <img src="/wordmark.svg" alt="BetterAlaminosCity.org" height={32} />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {SITE_NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => navLinkClassName(isActive)}
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto hidden lg:flex">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-[var(--color-kapwa-text-strong)] hover:bg-[var(--color-kapwa-bg-gray-default)] lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={t("nav.menuToggle")}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-[var(--color-kapwa-border-weak)] px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {SITE_NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => navLinkClassName(isActive)}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
