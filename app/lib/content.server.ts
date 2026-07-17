import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { load } from "js-yaml";

export type ContentDomain = "services" | "government";

export interface CategorySummary {
  slug: string;
  title: string;
  description: string;
  branch?: "executive" | "legislative";
}

export interface Article {
  slug: string;
  categorySlug: string;
  domain: ContentDomain;
  title: string;
  description: string;
  lastUpdated?: string;
  body: string;
}

export interface Official {
  name: string;
  title: string;
  termStart?: string;
}

export interface DataSourceMeta {
  lastUpdated: string;
  source: string;
}

export interface BudgetLineItem {
  label: string;
  amount: number;
}

export interface InfrastructureProject {
  name: string;
  location: string;
  budget: number;
  status: string;
}

export interface FiscalTransparency extends DataSourceMeta {
  fiscalYear: string;
  income: BudgetLineItem[];
  expenditure: BudgetLineItem[];
  infrastructureProjects: InfrastructureProject[];
}

export interface LegislativeDocument {
  id: string;
  type: "ordinance" | "resolution";
  number: string;
  title: string;
  date: string;
  status: string;
  link: string;
}

export interface LegislativeDocuments extends DataSourceMeta {
  documents: LegislativeDocument[];
}

export interface BarangayStat {
  name: string;
  population: number;
}

export interface EconomicIndicator {
  label: string;
  value: string;
}

export interface CityStatistics extends DataSourceMeta {
  totalPopulation: number;
  barangays: BarangayStat[];
  economicIndicators: EconomicIndicator[];
}

// Folder names under content/government/ that hold a single fixed JSON data
// file rather than an index.yaml + articles category — kept in sync with the
// identically-named set in contentValidation.server.ts (see Global Constraints).
export const CIVIC_DATA_SLUGS = new Set([
  "transparency-documents",
  "ordinances-resolutions",
  "statistics",
]);

const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), "content");

function readCategorySlugs(domain: ContentDomain, contentRoot: string): string[] {
  const domainDir = path.join(contentRoot, domain);
  if (!fs.existsSync(domainDir)) return [];
  return fs
    .readdirSync(domainDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => !(domain === "government" && CIVIC_DATA_SLUGS.has(slug)))
    .sort();
}

function readCategorySummary(
  domain: ContentDomain,
  categorySlug: string,
  contentRoot: string,
): CategorySummary | null {
  const indexPath = path.join(contentRoot, domain, categorySlug, "index.yaml");
  if (!fs.existsSync(indexPath)) return null;
  const raw = load(fs.readFileSync(indexPath, "utf-8")) as Omit<CategorySummary, "slug">;
  return { ...raw, slug: categorySlug };
}

export function listCategories(
  domain: ContentDomain,
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): CategorySummary[] {
  return readCategorySlugs(domain, contentRoot)
    .map((slug) => readCategorySummary(domain, slug, contentRoot))
    .filter((category): category is CategorySummary => category !== null);
}

export function getCategory(
  domain: ContentDomain,
  categorySlug: string,
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): CategorySummary | null {
  return readCategorySummary(domain, categorySlug, contentRoot);
}

export function listArticles(
  domain: ContentDomain,
  categorySlug: string,
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): Article[] {
  const categoryDir = path.join(contentRoot, domain, categorySlug);
  if (!fs.existsSync(categoryDir)) return [];
  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.basename(file, ".md"))
    .sort()
    .map((articleSlug) => getArticle(domain, categorySlug, articleSlug, contentRoot))
    .filter((article): article is Article => article !== null);
}

export function getArticle(
  domain: ContentDomain,
  categorySlug: string,
  articleSlug: string,
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): Article | null {
  const articlePath = path.join(contentRoot, domain, categorySlug, `${articleSlug}.md`);
  if (!fs.existsSync(articlePath)) return null;
  const { data, content } = matter(fs.readFileSync(articlePath, "utf-8"));
  const frontmatter = data as Omit<Article, "slug" | "categorySlug" | "domain" | "body">;
  return {
    ...frontmatter,
    slug: articleSlug,
    categorySlug,
    domain,
    body: content.trim(),
  };
}

export function getOfficial(
  categorySlug: string,
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): Official | null {
  const officialPath = path.join(contentRoot, "government", categorySlug, "official.json");
  if (!fs.existsSync(officialPath)) return null;
  return JSON.parse(fs.readFileSync(officialPath, "utf-8")) as Official;
}

export function getFiscalTransparency(
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): FiscalTransparency | null {
  const filePath = path.join(
    contentRoot,
    "government",
    "transparency-documents",
    "fiscal-transparency.json",
  );
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as FiscalTransparency;
}

export function getLegislativeDocuments(
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): LegislativeDocuments | null {
  const filePath = path.join(
    contentRoot,
    "government",
    "ordinances-resolutions",
    "documents.json",
  );
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as LegislativeDocuments;
}

export function getCityStatistics(
  contentRoot: string = DEFAULT_CONTENT_ROOT,
): CityStatistics | null {
  const filePath = path.join(contentRoot, "government", "statistics", "demographics.json");
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as CityStatistics;
}
