import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { SITE_NAV_LINKS, type SiteNavDropdownItem } from "../../lib/navLinks";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

function navLinkClassName(isActive: boolean) {
  return [
    "border-b-2 pb-1 text-sm font-medium transition-colors",
    isActive
      ? "border-[var(--color-kapwa-border-brand)] text-[var(--color-kapwa-text-brand)]"
      : "border-transparent text-[var(--color-kapwa-text-support)] hover:text-[var(--color-kapwa-text-brand)]",
  ].join(" ");
}

function NavDropdown({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: SiteNavDropdownItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isActive = item.items.some((link) => location.pathname === link.to);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={navLinkClassName(isActive)}
        onClick={onToggle}
      >
        {t(item.labelKey)}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 min-w-48 rounded-md border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] py-1 shadow-lg">
          {item.items.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 text-sm text-[var(--color-kapwa-text-strong)] hover:bg-[var(--color-kapwa-bg-gray-default)]"
              onClick={onClose}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function closeDropdown() {
    setOpenDropdown(null);
  }

  function toggleDropdown(labelKey: string) {
    setOpenDropdown((current) => (current === labelKey ? null : labelKey));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)]/95 backdrop-blur">
      <nav
        aria-label={t("nav.mainLabel")}
        className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3"
      >
        <Link to="/" className="shrink-0">
          <img
            src="/wordmark.svg"
            alt="BetterAlaminosCity.org"
            width={250}
            height={32}
            className="h-6 w-auto sm:h-8"
          />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          {SITE_NAV_LINKS.map((item) =>
            item.type === "dropdown" ? (
              <NavDropdown
                key={item.labelKey}
                item={item}
                isOpen={openDropdown === item.labelKey}
                onToggle={() => toggleDropdown(item.labelKey)}
                onClose={closeDropdown}
              />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => navLinkClassName(isActive)}
              >
                {t(item.labelKey)}
              </NavLink>
            ),
          )}
        </div>

        <div className="hidden lg:flex">
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
            {SITE_NAV_LINKS.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.labelKey} className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[var(--color-kapwa-text-strong)]">
                    {t(item.labelKey)}
                  </p>
                  {item.items.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="pl-3 text-sm font-medium text-[var(--color-kapwa-text-support)] hover:text-[var(--color-kapwa-text-brand)]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => navLinkClassName(isActive)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </NavLink>
              ),
            )}
            <div className="border-t border-[var(--color-kapwa-border-weak)] pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
