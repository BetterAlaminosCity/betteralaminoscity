import { useLoaderData } from "react-router";

import { getCityStatistics, getHotlines, getOfficial, listCategories } from "../lib/content.server";
import { buildMeta } from "../lib/seo";
import { Hero } from "../components/home/Hero";
import { PopularServices } from "../components/home/PopularServices";
import { CityAtAGlance } from "../components/home/CityAtAGlance";
import { DiscoverHundredIslands } from "../components/home/DiscoverHundredIslands";
import { BriefHistory } from "../components/home/BriefHistory";
import { CityLeadership } from "../components/home/CityLeadership";
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
    hotlines: getHotlines(),
  };
}

export default function Home() {
  const { popularCategories, statistics, mayor, legislativeHead, hotlines } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Hero popularCategories={popularCategories} />
      <PopularServices categories={popularCategories} />
      <CityAtAGlance statistics={statistics} />
      <DiscoverHundredIslands />
      <BriefHistory />
      <CityLeadership mayor={mayor} legislativeHead={legislativeHead} />
      <ContactHotlines hotlines={hotlines} />
      <LocationMap />
    </>
  );
}
