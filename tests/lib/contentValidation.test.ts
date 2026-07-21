import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  validateArticleFrontmatter,
  validateCategory,
  validateCityStatistics,
  validateContentTree,
  validateFiscalTransparency,
  validateHotlines,
  validateLegislativeDocuments,
  validateOfficial,
} from "../../app/lib/contentValidation.server";

describe("validateCategory", () => {
  it("accepts a category with title and description", () => {
    expect(
      validateCategory({ title: "Health Services", description: "Public health programs." }),
    ).toEqual([]);
  });

  it("rejects a category missing description", () => {
    expect(validateCategory({ title: "Health Services" })).not.toEqual([]);
  });
});

describe("validateArticleFrontmatter", () => {
  it("accepts frontmatter with title and description", () => {
    expect(validateArticleFrontmatter({ title: "Overview", description: "An overview." })).toEqual(
      [],
    );
  });

  it("rejects frontmatter missing title", () => {
    expect(validateArticleFrontmatter({ description: "An overview." })).not.toEqual([]);
  });

  it("accepts service frontmatter with requirements and steps", () => {
    expect(
      validateArticleFrontmatter({
        title: "Sample Service",
        description: "A sample service.",
        office: "City Agriculture Office",
        classification: "Simple",
        transactionType: "G2C",
        whoMayAvail: "All residents",
        requirements: [{ item: "Request Slip Form", whereToSecure: "City Agriculture Office" }],
        steps: [
          {
            phase: "Submission",
            clientStep: "Sign the logbook",
            agencyAction: "Give the logbook",
            fee: "None",
            processingTime: "3 minutes",
          },
        ],
        totalProcessingTime: "3 minutes",
        totalFees: "None",
      }),
    ).toEqual([]);
  });

  it("rejects a classification outside the enum", () => {
    expect(
      validateArticleFrontmatter({
        title: "Sample Service",
        description: "A sample service.",
        classification: "Very Hard",
      }),
    ).not.toEqual([]);
  });

  it("rejects a steps entry missing processingTime", () => {
    expect(
      validateArticleFrontmatter({
        title: "Sample Service",
        description: "A sample service.",
        steps: [{ clientStep: "Sign the logbook", agencyAction: "Give the logbook", fee: "None" }],
      }),
    ).not.toEqual([]);
  });
});

describe("validateOfficial", () => {
  it("accepts an official with name and title", () => {
    expect(validateOfficial({ name: "{PLACEHOLDER}", title: "City Mayor" })).toEqual([]);
  });

  it("rejects an official missing name", () => {
    expect(validateOfficial({ title: "City Mayor" })).not.toEqual([]);
  });
});

describe("validateFiscalTransparency", () => {
  it("accepts a valid fiscal transparency payload", () => {
    expect(
      validateFiscalTransparency({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        fiscalYear: "2025",
        income: [{ label: "Local Taxes", amount: 1000 }],
        expenditure: [{ label: "Personnel Services", amount: 500 }],
        infrastructureProjects: [
          { name: "Sample Project", location: "Sample Barangay", budget: 200, status: "Ongoing" },
        ],
      }),
    ).toEqual([]);
  });

  it("rejects a payload missing income", () => {
    expect(
      validateFiscalTransparency({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        fiscalYear: "2025",
        expenditure: [],
        infrastructureProjects: [],
      }),
    ).not.toEqual([]);
  });
});

describe("validateLegislativeDocuments", () => {
  it("accepts a valid legislative documents payload", () => {
    expect(
      validateLegislativeDocuments({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        documents: [
          {
            id: "ord-1",
            type: "ordinance",
            number: "2025-01",
            title: "Sample Ordinance",
            date: "2025-01-10",
            status: "Enacted",
            link: "https://example.com/ord-1.pdf",
          },
        ],
      }),
    ).toEqual([]);
  });

  it("rejects a document with an invalid type", () => {
    expect(
      validateLegislativeDocuments({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        documents: [
          {
            id: "ord-1",
            type: "bill",
            number: "2025-01",
            title: "Sample Ordinance",
            date: "2025-01-10",
            status: "Enacted",
            link: "https://example.com/ord-1.pdf",
          },
        ],
      }),
    ).not.toEqual([]);
  });
});

describe("validateCityStatistics", () => {
  it("accepts a valid city statistics payload", () => {
    expect(
      validateCityStatistics({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        totalPopulation: 100000,
        barangays: [{ name: "Sample Barangay 1", population: 5000 }],
        economicIndicators: [{ label: "Poverty Incidence", value: "10%" }],
      }),
    ).toEqual([]);
  });

  it("rejects a payload missing totalPopulation", () => {
    expect(
      validateCityStatistics({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        barangays: [],
        economicIndicators: [],
      }),
    ).not.toEqual([]);
  });
});

describe("validateHotlines", () => {
  it("accepts a valid hotlines payload", () => {
    expect(
      validateHotlines({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        emergencyNumber: "911",
        hotlines: [
          {
            key: "cdrrmo",
            name: "CDRRMO",
            description: "City Disaster Risk Reduction and Management Office",
            icon: "alert-triangle",
            numbers: ["0947-000-0000", "(075) 000-0000"],
          },
          {
            key: "police",
            name: "Sample Police Station",
            numbers: ["0998-000-0000"],
          },
        ],
      }),
    ).toEqual([]);
  });

  it("rejects a payload missing emergencyNumber", () => {
    expect(
      validateHotlines({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        hotlines: [{ key: "cdrrmo", name: "CDRRMO", numbers: ["0947-000-0000"] }],
      }),
    ).not.toEqual([]);
  });

  it("rejects a hotline entry with no numbers", () => {
    expect(
      validateHotlines({
        lastUpdated: "2026-01-15",
        source: "Sample source",
        emergencyNumber: "911",
        hotlines: [{ key: "cdrrmo", name: "CDRRMO", numbers: [] }],
      }),
    ).not.toEqual([]);
  });
});

describe("validateContentTree", () => {
  it("reports no issues for a valid content tree", () => {
    const contentRoot = path.join(import.meta.dirname, "../fixtures/content-valid");
    expect(validateContentTree(contentRoot)).toEqual([]);
  });

  it("reports an issue for a category missing a required field", () => {
    const contentRoot = path.join(import.meta.dirname, "../fixtures/content-invalid");
    const issues = validateContentTree(contentRoot);
    expect(issues).toHaveLength(1);
    expect(issues[0].file).toContain("index.yaml");
  });

  it("reports an issue per missing fixed civic-data JSON file", () => {
    const contentRoot = path.join(import.meta.dirname, "../fixtures/content-invalid-civic-data");
    const issues = validateContentTree(contentRoot);
    expect(issues).toHaveLength(4);
    expect(issues.map((issue) => issue.errors[0])).toEqual([
      expect.stringContaining("missing"),
      expect.stringContaining("missing"),
      expect.stringContaining("missing"),
      expect.stringContaining("missing"),
    ]);
  });

  it("does not flag the civic-data folders as categories missing index.yaml", () => {
    const contentRoot = path.join(import.meta.dirname, "../fixtures/content-valid");
    const issues = validateContentTree(contentRoot);
    expect(issues.some((issue) => issue.file.includes("transparency-documents"))).toBe(false);
    expect(issues.some((issue) => issue.file.includes("ordinances-resolutions"))).toBe(false);
    expect(issues.some((issue) => issue.file.includes("statistics"))).toBe(false);
    expect(issues.some((issue) => issue.file.includes("emergency-hotlines"))).toBe(false);
  });
});
