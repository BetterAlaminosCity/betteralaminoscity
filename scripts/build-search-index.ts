import fs from "node:fs";
import path from "node:path";

import { buildSearchIndex } from "../app/lib/searchIndex.server";

const outputPath = path.join(process.cwd(), "public", "search-index.json");
const index = buildSearchIndex();
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
console.log(`Wrote ${index.length} search index entries to ${outputPath}`);
