import { ErrorPage } from "../../components/ui/ErrorPage";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/server-error";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    title: "Something Went Wrong",
    description: "An unexpected error occurred.",
    path: "/500",
  });
}

export default function ServerError() {
  return (
    <ErrorPage
      code="500"
      title="Something Went Wrong"
      message="An unexpected error occurred. Please try again later."
    />
  );
}
