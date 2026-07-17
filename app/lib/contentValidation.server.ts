import fs from "node:fs";
import path from "node:path";

import Ajv, { type ErrorObject } from "ajv";
import matter from "gray-matter";
import { load } from "js-yaml";

import articleFrontmatterSchema from "../../content/schemas/article-frontmatter.schema.json";
import categorySchema from "../../content/schemas/category.schema.json";
import officialSchema from "../../content/schemas/official.schema.json";

const ajv = new Ajv({ allErrors: true });
const validateCategorySchema = ajv.compile(categorySchema);
const validateArticleFrontmatterSchema = ajv.compile(articleFrontmatterSchema);
const validateOfficialSchema = ajv.compile(officialSchema);

function formatErrors(errors: ErrorObject[] | null | undefined): string[] {
  return (errors ?? []).map((error) => `${error.instancePath || "/"} ${error.message}`);
}

export function validateCategory(data: unknown): string[] {
  validateCategorySchema(data);
  return formatErrors(validateCategorySchema.errors);
}

export function validateArticleFrontmatter(data: unknown): string[] {
  validateArticleFrontmatterSchema(data);
  return formatErrors(validateArticleFrontmatterSchema.errors);
}

export function validateOfficial(data: unknown): string[] {
  validateOfficialSchema(data);
  return formatErrors(validateOfficialSchema.errors);
}

export interface ContentValidationIssue {
  file: string;
  errors: string[];
}

const DOMAINS = ["services", "government"] as const;

export function validateContentTree(contentRoot: string): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];

  for (const domain of DOMAINS) {
    const domainDir = path.join(contentRoot, domain);
    if (!fs.existsSync(domainDir)) continue;

    const categorySlugs = fs
      .readdirSync(domainDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const categorySlug of categorySlugs) {
      const categoryDir = path.join(domainDir, categorySlug);

      const indexPath = path.join(categoryDir, "index.yaml");
      if (fs.existsSync(indexPath)) {
        const data = load(fs.readFileSync(indexPath, "utf-8"));
        const errors = validateCategory(data);
        if (errors.length > 0) issues.push({ file: indexPath, errors });
      } else {
        issues.push({ file: indexPath, errors: ["missing index.yaml"] });
      }

      const officialPath = path.join(categoryDir, "official.json");
      if (domain === "government" && fs.existsSync(officialPath)) {
        const data = JSON.parse(fs.readFileSync(officialPath, "utf-8"));
        const errors = validateOfficial(data);
        if (errors.length > 0) issues.push({ file: officialPath, errors });
      }

      for (const file of fs.readdirSync(categoryDir)) {
        if (!file.endsWith(".md")) continue;
        const articlePath = path.join(categoryDir, file);
        const { data } = matter(fs.readFileSync(articlePath, "utf-8"));
        const errors = validateArticleFrontmatter(data);
        if (errors.length > 0) issues.push({ file: articlePath, errors });
      }
    }
  }

  return issues;
}
