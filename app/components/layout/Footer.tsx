import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { SITE_NAV_LINKS } from "../../lib/navLinks";
import { Disclaimer } from "./Disclaimer";

const GITHUB_URL = "https://github.com/ljsalcedo-dev/betteralaminoscity";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-kapwa-bg-surface-bold)] text-[var(--color-kapwa-text-inverse)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2">
        <div>
          <p className="text-lg font-semibold">BetterAlaminosCity.org</p>
          <p className="mt-2 max-w-sm text-sm text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.aboutBlurb")}
          </p>
          <a
            href={GITHUB_URL}
            className="mt-4 inline-block text-sm font-medium underline underline-offset-2 hover:text-[var(--color-kapwa-text-inverse-subtle)]"
          >
            {t("footer.githubLink")}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.exploreHeading")}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {SITE_NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-kapwa-border-inverse)]/10 px-4 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.copyright", { year })}
          </p>
          <Disclaimer />
        </div>
      </div>
    </footer>
  );
}
