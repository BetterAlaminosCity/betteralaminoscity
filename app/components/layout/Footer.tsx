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
            width={250}
            height={32}
            className="h-7 w-auto"
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
          <p className="mt-3 text-sm text-[var(--color-kapwa-text-inverse-subtle)]">
            {t("footer.costLabel")}:{" "}
            <span className="font-semibold text-[var(--color-kapwa-text-inverse)]">
              {t("footer.costValue")}
            </span>
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm font-medium underline underline-offset-2 hover:text-[var(--color-kapwa-text-inverse-subtle)]"
          >
            {t("footer.githubLink")}
          </a>
          <a href={BETTERGOV_URL} target="_blank" rel="noreferrer" className="mt-4 inline-block">
            <img
              src="/logos/bettergov-horizontal-white.svg"
              alt={t("footer.bettergovAlt")}
              className="h-6 w-auto opacity-90 hover:opacity-100"
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
