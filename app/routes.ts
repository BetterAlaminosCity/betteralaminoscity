import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services/index.tsx"),
  route("services/:category", "routes/services/category.tsx"),
  route("services/:category/:article", "routes/services/article.tsx"),
] satisfies RouteConfig;
