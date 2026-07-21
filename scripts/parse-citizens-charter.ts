import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { parseCitizensCharterText } from "../app/lib/citizensCharterParser";

function extractPageRange(pdfPath: string, firstPage: number, lastPage: number): string {
  return execFileSync(
    "pdftotext",
    ["-layout", "-f", String(firstPage), "-l", String(lastPage), pdfPath, "-"],
    { encoding: "utf-8", maxBuffer: 1024 * 1024 * 20 },
  );
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function main() {
  const [, , pdfPathArg, firstPageArg, lastPageArg, outDirArg] = process.argv;
  if (!pdfPathArg || !firstPageArg || !lastPageArg || !outDirArg) {
    console.error(
      "Usage: tsx scripts/parse-citizens-charter.ts <pdf-path> <first-physical-page> <last-physical-page> <out-dir>",
    );
    process.exit(1);
  }

  const text = extractPageRange(pdfPathArg, Number(firstPageArg), Number(lastPageArg));
  const drafts = parseCitizensCharterText(text);
  fs.mkdirSync(outDirArg, { recursive: true });

  for (const draft of drafts) {
    const slug = slugifyTitle(draft.title);
    const lines = [
      "# DRAFT - hand-verify every field against the source PDF before committing.",
      "# Requirements and steps below are raw extracted text; restructure by hand into",
      "# requirements[]/steps[] following content/schemas/article-frontmatter.schema.json.",
      `title: "${draft.title}"`,
      `office: "${draft.officeOrDivision}"`,
      `classification: "${draft.classification}"`,
      `transactionType: "${draft.typeOfTransaction}"`,
      `whoMayAvail: "${draft.whoMayAvail}"`,
      "raw: |",
      ...draft.rawBody.split("\n").map((line) => `  ${line}`),
    ];
    const outPath = path.join(outDirArg, `${draft.number}-${slug}.draft.yaml`);
    fs.writeFileSync(outPath, lines.join("\n"));
  }

  console.log(`Wrote ${drafts.length} draft file(s) to ${outDirArg}`);
}

main();
