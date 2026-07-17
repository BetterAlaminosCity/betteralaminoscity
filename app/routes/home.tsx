import { useTranslation } from "react-i18next";

import { buildMeta } from "../lib/seo";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    description:
      "BetterAlaminosCity.org is a community-run guide to Alaminos City government services, home of the Hundred Islands National Park.",
  });
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("home.title")}</h1>
      <p>
        A community-run guide to Alaminos City government services, home of
        the Hundred Islands National Park.
      </p>
    </section>
  );
}
