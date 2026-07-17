import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BetterAlaminosCity.org" },
    {
      name: "description",
      content:
        "BetterAlaminosCity.org is a community-run guide to Alaminos City government services.",
    },
  ];
}

export default function Home() {
  return <h1>BetterAlaminosCity.org</h1>;
}
