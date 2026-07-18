import { ErrorPage } from "../../components/ui/ErrorPage";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/not-found";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
  });
}

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message="The page you're looking for doesn't exist or may have been moved."
    />
  );
}
