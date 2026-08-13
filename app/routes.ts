import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services/index.tsx"),
  route("services/:category", "routes/services/category.tsx"),
  route("services/:category/:article", "routes/services/article.tsx"),
  route("government", "routes/government/index.tsx"),
  route("transparency", "routes/transparency.tsx"),
  route("legislative", "routes/legislative/index.tsx"),
  route("legislative/ordinances", "routes/legislative/ordinances.tsx"),
  route("legislative/resolutions", "routes/legislative/resolutions.tsx"),
  route("government/statistics", "routes/government/statistics.tsx"),
  route("search", "routes/search.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("accessibility", "routes/accessibility.tsx"),
  route("faq", "routes/faq.tsx"),
  route("sitemap", "routes/sitemap.tsx"),
  route("403", "routes/errors/forbidden.tsx"),
  route("404", "routes/errors/not-found.tsx"),
  route("500", "routes/errors/server-error.tsx"),
] satisfies RouteConfig;
