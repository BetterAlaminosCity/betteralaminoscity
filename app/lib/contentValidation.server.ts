import fs from "node:fs";
import path from "node:path";

import Ajv, { type ErrorObject } from "ajv";
import matter from "gray-matter";
import { load } from "js-yaml";

import articleFrontmatterSchema from "../../content/schemas/article-frontmatter.schema.json";
import categorySchema from "../../content/schemas/category.schema.json";
import cityStatisticsSchema from "../../content/schemas/city-statistics.schema.json";
import fiscalTransparencySchema from "../../content/schemas/fiscal-transparency.schema.json";
import legislativeDocumentsSchema from "../../content/schemas/legislative-documents.schema.json";
import officialSchema from "../../content/schemas/official.schema.json";

const ajv = new Ajv({ allErrors: true });
const validateCategorySchema = ajv.compile(categorySchema);
const validateArticleFrontmatterSchema = ajv.compile(articleFrontmatterSchema);
const validateOfficialSchema = ajv.compile(officialSchema);
const validateFiscalTransparencySchema = ajv.compile(fiscalTransparencySchema);
const validateLegislativeDocumentsSchema = ajv.compile(legislativeDocumentsSchema);
const validateCityStatisticsSchema = ajv.compile(cityStatisticsSchema);

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

export function validateFiscalTransparency(data: unknown): string[] {
  validateFiscalTransparencySchema(data);
  return formatErrors(validateFiscalTransparencySchema.errors);
}

export function validateLegislativeDocuments(data: unknown): string[] {
  validateLegislativeDocumentsSchema(data);
  return formatErrors(validateLegislativeDocumentsSchema.errors);
}

export function validateCityStatistics(data: unknown): string[] {
  validateCityStatisticsSchema(data);
  return formatErrors(validateCityStatisticsSchema.errors);
}

export interface ContentValidationIssue {
  file: string;
  errors: string[];
}

const DOMAINS = ["services", "government"] as const;

// Folder names under content/government/ that hold a single fixed JSON data
// file rather than an index.yaml + articles category — kept in sync with the
// identically-named set in content.server.ts (see Global Constraints).
const CIVIC_DATA_SLUGS = new Set(["transparency-documents", "ordinances-resolutions", "statistics"]);

const FIXED_JSON_DATA_FILES: Array<{
  relativePath: string;
  validate: (data: unknown) => string[];
}> = [
  {
    relativePath: path.join("government", "transparency-documents", "fiscal-transparency.json"),
    validate: validateFiscalTransparency,
  },
  {
    relativePath: path.join("government", "ordinances-resolutions", "documents.json"),
    validate: validateLegislativeDocuments,
  },
  {
    relativePath: path.join("government", "statistics", "demographics.json"),
    validate: validateCityStatistics,
  },
];

export function validateContentTree(contentRoot: string): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];

  for (const domain of DOMAINS) {
    const domainDir = path.join(contentRoot, domain);
    if (!fs.existsSync(domainDir)) continue;

    const categorySlugs = fs
      .readdirSync(domainDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((slug) => !(domain === "government" && CIVIC_DATA_SLUGS.has(slug)));

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

  const governmentDir = path.join(contentRoot, "government");
  if (fs.existsSync(governmentDir)) {
    for (const { relativePath, validate } of FIXED_JSON_DATA_FILES) {
      const filePath = path.join(contentRoot, relativePath);
      if (!fs.existsSync(filePath)) {
        issues.push({ file: filePath, errors: [`missing ${relativePath}`] });
        continue;
      }
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const errors = validate(data);
      if (errors.length > 0) issues.push({ file: filePath, errors });
    }
  }

  return issues;
}
