import { useLoaderData } from "react-router";

import { getCityStatistics, getOfficial, listCategories } from "../lib/content.server";
import { buildMeta } from "../lib/seo";
import { Hero } from "../components/home/Hero";
import { PopularServices } from "../components/home/PopularServices";
import { CityAtAGlance } from "../components/home/CityAtAGlance";
import { DiscoverHundredIslands } from "../components/home/DiscoverHundredIslands";
import { BriefHistory } from "../components/home/BriefHistory";
import { MunicipalLeadership } from "../components/home/MunicipalLeadership";
import { ContactHotlines } from "../components/home/ContactHotlines";
import { LocationMap } from "../components/home/LocationMap";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    description:
      "BetterAlaminosCity.org is a community-run guide to Alaminos City government services, home of the Hundred Islands National Park.",
  });
}

export function loader() {
  return {
    popularCategories: listCategories("services").slice(0, 6),
    statistics: getCityStatistics(),
    mayor: getOfficial("office-of-the-mayor"),
    legislativeHead: getOfficial("sangguniang-panlungsod"),
  };
}

export default function Home() {
  const { popularCategories, statistics, mayor, legislativeHead } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero />
      <PopularServices categories={popularCategories} />
      <CityAtAGlance statistics={statistics} />
      <DiscoverHundredIslands />
      <BriefHistory />
      <MunicipalLeadership mayor={mayor} legislativeHead={legislativeHead} />
      <ContactHotlines />
      <LocationMap />
    </>
  );
}
