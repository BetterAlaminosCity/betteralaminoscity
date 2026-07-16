import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Better Alaminos City" },
    {
      name: "description",
      content:
        "Better Alaminos City is a community-run guide to Alaminos City government services.",
    },
  ];
}

export default function Home() {
  return <h1>Better Alaminos City</h1>;
}
