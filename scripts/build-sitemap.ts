import fs from "node:fs";
import path from "node:path";

import { buildRobotsTxt, buildSitemapXml } from "../app/lib/sitemap.server";
import { getAllRoutePaths } from "../app/lib/siteRoutes.server";

const publicDir = path.join(process.cwd(), "public");
const paths = getAllRoutePaths();

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(paths));
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt());

console.log(`Wrote sitemap.xml with ${paths.length} URLs and robots.txt to ${publicDir}`);
