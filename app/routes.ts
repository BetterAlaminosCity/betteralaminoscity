import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services/index.tsx"),
  route("services/:category", "routes/services/category.tsx"),
  route("services/:category/:article", "routes/services/article.tsx"),
  route("government", "routes/government/index.tsx"),
  route("government/:office", "routes/government/office.tsx"),
  route("government/:office/:article", "routes/government/article.tsx"),
  route("government/transparency", "routes/government/transparency.tsx"),
  route("government/ordinances-resolutions", "routes/government/ordinances-resolutions.tsx"),
  route("government/statistics", "routes/government/statistics.tsx"),
  route("search", "routes/search.tsx"),
  route("403", "routes/errors/forbidden.tsx"),
  route("404", "routes/errors/not-found.tsx"),
  route("500", "routes/errors/server-error.tsx"),
] satisfies RouteConfig;
