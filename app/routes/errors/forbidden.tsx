import { ErrorPage } from "../../components/ui/ErrorPage";
import { buildMeta } from "../../lib/seo";
import type { Route } from "./+types/forbidden";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Forbidden",
    description: "You don't have permission to view this page.",
    path: "/403",
  });
}

export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      title="Forbidden"
      message="You don't have permission to view this page."
    />
  );
}
