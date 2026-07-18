import fs from "node:fs";
import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

function previewDirectoryIndexFallback(): Plugin {
  return {
    name: "preview-directory-index-fallback",
    configurePreviewServer(server) {
      const clientOutDir = path.join(server.config.root, "build", "client");
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        const [pathname, search = ""] = url.split("?");
        if (pathname && pathname !== "/" && !pathname.endsWith("/") && !path.extname(pathname)) {
          const indexPath = path.join(clientOutDir, pathname, "index.html");
          if (fs.existsSync(indexPath)) {
            req.url = `${pathname}/index.html${search ? `?${search}` : ""}`;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), previewDirectoryIndexFallback()],
});
