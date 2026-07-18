import type { Config } from "@react-router/dev/config";

import { contentPaths } from "./app/lib/siteRoutes.server";

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...contentPaths("services"), ...contentPaths("government")];
  },
} satisfies Config;
