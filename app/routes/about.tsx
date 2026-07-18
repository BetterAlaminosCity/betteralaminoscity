import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/about";

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
    <section>
      <h1>{t("nav.about")}</h1>
      <p>
        BetterAlaminosCity.org is a volunteer-run civic project. It is not an official website of
        the Alaminos City government — it aggregates publicly available information to make
        government services easier to find.
      </p>
    </section>
  );
}
