import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/about";

const GITHUB_URL = "https://github.com/ljsalcedo-dev/betteralaminoscity";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "About",
    description:
      "BetterAlaminosCity.org is a volunteer-run civic project, not an official Alaminos City government website.",
    path: "/about",
  });
}

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
        {t("nav.about")}
      </h1>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("about.missionHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("about.missionBody")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("about.contributeHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("about.contributeBody")}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        <li>
          <a
            href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
            className="text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
          >
            {t("about.contributingLink")}
          </a>
        </li>
        <li>
          <a
            href={`${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md`}
            className="text-sm font-medium text-[var(--color-kapwa-text-brand)] hover:underline"
          >
            {t("about.codeOfConductLink")}
          </a>
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-[var(--color-kapwa-text-strong)]">
        {t("about.techStackHeading")}
      </h2>
      <p className="mt-3 text-base text-[var(--color-kapwa-text-support)]">
        {t("about.techStackBody")}
      </p>
    </section>
  );
}
