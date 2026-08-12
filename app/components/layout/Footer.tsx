import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Disclaimer } from "./Disclaimer";

const GITHUB_URL = "https://github.com/BetterAlaminosCity/betteralaminoscity";
const CITIZENS_CHARTER_URL =
  "https://www.alaminoscity.gov.ph/public-service/city-services/CitizensCharter/CC_CGO%20ALAMINOS_2026.pdf";
const OPEN_DATA_PH_URL = "https://data.gov.ph";
const FOI_URL = "https://foi.gov.ph";
const OFFICIAL_CITY_URL = "https://alaminoscity.gov.ph";
const CITY_FACEBOOK_URL = "https://www.facebook.com/cityofalaminos.pangasinan";
const BLGF_URL = "https://blgf.gov.ph";
const CMCI_DTI_URL = "https://cmci.dti.gov.ph";
const BETTERGOV_URL = "https://bettergov.ph";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-kapwa-bg-surface-bold)] text-[var(--color-kapwa-text-inverse)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/wordmark-white.svg"
            alt="BetterAlaminosCity.org"
            width={1706}
            height={590}
            className="h-12 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.aboutBlurb")}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.quickLinksHeading")}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <Link
                to="/sitemap"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.quickLinks.sitemap")}
              </Link>
            </li>
            <li>
              <a
                href={CITIZENS_CHARTER_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.quickLinks.citizensCharter")}
              </a>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.quickLinks.terms")}
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.quickLinks.privacy")}
              </Link>
            </li>
            <li>
              <Link
                to="/accessibility"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.quickLinks.accessibility")}
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.quickLinks.faq")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.resourcesHeading")}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <a
                href={OPEN_DATA_PH_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.resourcesLinks.openData")}
              </a>
            </li>
            <li>
              <a
                href={FOI_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.resourcesLinks.foi")}
              </a>
            </li>
            <li>
              <a
                href={OFFICIAL_CITY_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.resourcesLinks.officialWebsite")}
              </a>
            </li>
            <li>
              <a
                href={CITY_FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.resourcesLinks.facebook")}
              </a>
            </li>
            <li>
              <a
                href={BLGF_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.resourcesLinks.blgf")}
              </a>
            </li>
            <li>
              <a
                href={CMCI_DTI_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-[var(--color-kapwa-text-inverse-subtle)]"
              >
                {t("footer.resourcesLinks.cmciDti")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.supportHeading")}
          </p>
          <div className="mt-3 flex flex-col items-start gap-3">
            <p className="rounded-full bg-white/15 px-4 py-2 text-xs text-[var(--color-kapwa-text-inverse-subtle)]">
              {t("footer.costLabel")}:{" "}
              <span className="font-semibold text-[var(--color-kapwa-text-inverse)]">
                {t("footer.costValue")}
              </span>
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-[var(--color-kapwa-text-inverse)] hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              {t("footer.githubLink")}
            </a>
          </div>
          <a href={BETTERGOV_URL} target="_blank" rel="noreferrer" className="mt-6 block w-fit">
            <img
              src="/logos/bettergov-icon-white.svg"
              alt={t("footer.bettergovAlt")}
              className="h-16 w-16 opacity-90 hover:opacity-100"
            />
          </a>
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
