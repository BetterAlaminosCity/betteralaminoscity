import { buildMeta } from "../lib/seo";
import { Hero } from "../components/home/Hero";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    description:
      "BetterAlaminosCity.org is a community-run guide to Alaminos City government services, home of the Hundred Islands National Park.",
  });
}

export default function Home() {
  return <Hero />;
}
