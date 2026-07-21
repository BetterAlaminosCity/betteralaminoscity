import { describe, expect, it, vi } from "vitest";
import { parseCitizensCharterText } from "../../app/lib/citizensCharterParser";

const SAMPLE_TEXT = `1.1 Farm Inputs and Technology Assistance on Rice and Corn Production Service
  Distribution of High Quality and Hybrid Rice Seeds, Fertilizers and Corn Seeds to the farmers of Alaminos City
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government-to-Citizens
Who may avail:              Resident of the City of Alaminos and member of farmers' association/farmer's cooperative
                                   CHECKLIST OF REQUIREMENTS                                                             WHERE TO SECURE
Endorsement Letter signed by the Association President                                             Association
             CLIENT STEPS                                      AGENCY ACTIONS                       FEES TO BE PAID    PROCESSING TIME      PERSON RESPONSIBLE
1.Submission and Accomplishment of Requirements
1. Sign the Visitor's Logbook in the      1. Give the Visitor's Logbook                                  None              3 minutes           Senior Administrative
                                                                  TOTAL                                  None            26 MINUTES


1.2 Provision of Vegetable Seed/Seedlings for Backyard Gardening
  Distribution of Vegetable seeds/seedlings to the residents of Alaminos City for backyard gardening.
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government to the Transacting Public
Who may avail:                Bona fide residents of Alaminos City
                                   CHECKLIST OF REQUIREMENTS                                                                          WHERE TO SECURE
Request Slip Form                                                                                         City Agriculture Office
                                                                       TOTAL                                       None               21 MINUTES
`;

describe("parseCitizensCharterText", () => {
  it("splits the text into one draft per service heading", () => {
    const drafts = parseCitizensCharterText(SAMPLE_TEXT);
    expect(drafts).toHaveLength(2);
    expect(drafts[0].number).toBe("1.1");
    expect(drafts[1].number).toBe("1.2");
  });

  it("extracts the four labeled fields", () => {
    const [first] = parseCitizensCharterText(SAMPLE_TEXT);
    expect(first.title).toBe(
      "Farm Inputs and Technology Assistance on Rice and Corn Production Service",
    );
    expect(first.officeOrDivision).toBe("City Agriculture Office");
    expect(first.classification).toBe("Simple");
    expect(first.typeOfTransaction).toBe("G2C-Government-to-Citizens");
    expect(first.whoMayAvail).toBe(
      "Resident of the City of Alaminos and member of farmers' association/farmer's cooperative",
    );
  });

  it("keeps the requirements/steps tables as raw text for hand review", () => {
    const [first] = parseCitizensCharterText(SAMPLE_TEXT);
    expect(first.rawBody).toContain("CHECKLIST OF REQUIREMENTS");
    expect(first.rawBody).toContain("TOTAL");
  });
});

// Regression test for a real bug found against the source PDF (pages 11-21,
// City Agriculture Office): CLIENT STEPS/AGENCY ACTIONS table rows are
// numbered like "1.1 Request for farm input..." and "2.1 Present the
// Release Stub Form...", which match the same heading regex as real service
// numbers ("1.1 Farm Inputs and Technology Assistance..."). Without a
// lookahead for the Office or Division line, each numbered step row was
// mis-parsed as a new service heading, producing many spurious drafts and
// truncating the real service's rawBody.
const TABLE_SUBSTEPS_TEXT = `1.1 Farm Inputs and Technology Assistance on Rice and Corn Production Service
  Distribution of High Quality and Hybrid Rice Seeds, Fertilizers and Corn Seeds to the farmers of Alaminos City
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government-to-Citizens
Who may avail:              Resident of the City of Alaminos and member of farmers' association/farmer's cooperative
                                   CHECKLIST OF REQUIREMENTS                                                             WHERE TO SECURE
Endorsement Letter signed by the Association President                                             Association
             CLIENT STEPS                                      AGENCY ACTIONS                       FEES TO BE PAID    PROCESSING TIME      PERSON RESPONSIBLE
1.Submission and Accomplishment of Requirements
1.1 Request for farm input and submit    1.1 Validate the presented requirement          None              3 minutes           Senior Administrative
Endorsement Letter                                                                                                                          Assistant II, Agriculture Staff
2.1 Present the Release Stub Form        2.1 Release the requested farm inputs           None              5 minutes           Agricultural Technologist
                                                                  TOTAL                                  None            26 MINUTES


1.2 Provision of Vegetable Seed/Seedlings for Backyard Gardening
  Distribution of Vegetable seeds/seedlings to the residents of Alaminos City for backyard gardening.
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government to the Transacting Public
Who may avail:                Bona fide residents of Alaminos City
                                   CHECKLIST OF REQUIREMENTS                                                                          WHERE TO SECURE
Request Slip Form                                                                                         City Agriculture Office
                                                                       TOTAL                                       None               21 MINUTES
`;

describe("parseCitizensCharterText — table sub-step numbers", () => {
  it("does not split on CLIENT STEPS/AGENCY ACTIONS table row numbers", () => {
    const drafts = parseCitizensCharterText(TABLE_SUBSTEPS_TEXT);
    expect(drafts).toHaveLength(2);
    expect(drafts[0].number).toBe("1.1");
    expect(drafts[1].number).toBe("1.2");
  });

  it("keeps the numbered sub-step rows as raw body text on the real heading", () => {
    const [first] = parseCitizensCharterText(TABLE_SUBSTEPS_TEXT);
    expect(first.rawBody).toContain(
      "1.1 Request for farm input and submit    1.1 Validate the presented requirement",
    );
    expect(first.rawBody).toContain(
      "2.1 Present the Release Stub Form        2.1 Release the requested farm inputs",
    );
    expect(first.rawBody).toContain("TOTAL");
  });
});

// Regression test for a real bug found against the source PDF (pages 11-21,
// City Agriculture Office): pdftotext inserts a form-feed character (\f) to
// mark each page boundary. When a real service heading happened to be the
// first line on a new physical page, the raw line was
// "\f1.7 Requisition of E-Kawayan Products" — the leading \f prevented the
// start-anchored SERVICE_HEADING_PATTERN from matching, so heading 1.7 was
// silently dropped (its content folded into the previous service's body)
// rather than becoming its own draft. This fixture reproduces that exact
// shape: a form feed immediately before a real heading line.
const FORM_FEED_TEXT = `1.1 Farm Inputs and Technology Assistance on Rice and Corn Production Service
  Distribution of High Quality and Hybrid Rice Seeds, Fertilizers and Corn Seeds to the farmers of Alaminos City
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government-to-Citizens
Who may avail:              Resident of the City of Alaminos and member of farmers' association/farmer's cooperative
                                   CHECKLIST OF REQUIREMENTS                                                             WHERE TO SECURE
Endorsement Letter signed by the Association President                                             Association
             CLIENT STEPS                                      AGENCY ACTIONS                       FEES TO BE PAID    PROCESSING TIME      PERSON RESPONSIBLE
1.Submission and Accomplishment of Requirements
1. Sign the Visitor's Logbook in the      1. Give the Visitor's Logbook                                  None              3 minutes           Senior Administrative
                                                                  TOTAL                                  None            26 MINUTES


\f1.7 Requisition of E-Kawayan Products
  Provision of E-Kawayan products to farmers of Alaminos City
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government-to-Citizens
Who may avail:              Resident of the City of Alaminos
                                   CHECKLIST OF REQUIREMENTS                                                             WHERE TO SECURE
Request Form                                                                                              City Agriculture Office
                                                                       TOTAL                                       None               15 MINUTES
`;

describe("parseCitizensCharterText — form-feed page breaks", () => {
  it("still detects a real heading when a form-feed character precedes it", () => {
    const drafts = parseCitizensCharterText(FORM_FEED_TEXT);
    expect(drafts).toHaveLength(2);
    expect(drafts[0].number).toBe("1.1");
    expect(drafts[1].number).toBe("1.7");
    expect(drafts[1].title).toBe("Requisition of E-Kawayan Products");
  });

  it("still extracts the second heading's labeled fields correctly", () => {
    const [, second] = parseCitizensCharterText(FORM_FEED_TEXT);
    expect(second.officeOrDivision).toBe("City Agriculture Office");
    expect(second.classification).toBe("Simple");
    expect(second.typeOfTransaction).toBe("G2C-Government-to-Citizens");
    expect(second.whoMayAvail).toBe("Resident of the City of Alaminos");
  });
});

// Regression test for a real bug found while re-verifying the fix above
// against the real PDF: on at least one page, pdftotext -layout emitted the
// "Office or Division:"/"Classification:"/"Type of Transaction:"/
// "Who may avail:" label lines with an extra leading space (e.g.
// " Office or Division:          City Agriculture Office"). Because the
// label patterns and the heading lookahead were originally tested with
// `.trimEnd()` (leading whitespace preserved), the indented Office line was
// never recognized — the heading-lookahead check failed to find it, so the
// real heading (1.4 in the source PDF) was rejected and its content folded
// into the previous service's body.
const INDENTED_LABEL_TEXT = `1.3 Provision of Bamboo Planting Materials
  Distribution of bamboo planting materials to residents of Alaminos City
Office or Division:         City Agriculture Office
Classification:             Simple
Type of Transaction:        G2C-Government-to-Citizens
Who may avail:              Resident of the City of Alaminos
                                   CHECKLIST OF REQUIREMENTS                                                             WHERE TO SECURE
Request Form                                                                                              City Agriculture Office
                                                                       TOTAL                                       None               15 MINUTES


1.4 Issuance of Farmers Certification and Other Certifications
  Issuance of certification to farmers of Alaminos City
 Office or Division:         City Agriculture Office
 Classification:             Simple
 Type of Transaction:        G2C-Government-to-Citizens
 Who may avail:              Resident of the City of Alaminos and registered farmer
                                   CHECKLIST OF REQUIREMENTS                                                             WHERE TO SECURE
Request Form                                                                                              City Agriculture Office
                                                                       TOTAL                                       None               15 MINUTES
`;

describe("parseCitizensCharterText — indented label lines", () => {
  it("still recognizes the next heading when its Office or Division line has leading whitespace", () => {
    const drafts = parseCitizensCharterText(INDENTED_LABEL_TEXT);
    expect(drafts).toHaveLength(2);
    expect(drafts[0].number).toBe("1.3");
    expect(drafts[1].number).toBe("1.4");
    expect(drafts[1].title).toBe("Issuance of Farmers Certification and Other Certifications");
  });

  it("still extracts labeled fields whose lines have leading whitespace", () => {
    const [, second] = parseCitizensCharterText(INDENTED_LABEL_TEXT);
    expect(second.officeOrDivision).toBe("City Agriculture Office");
    expect(second.classification).toBe("Simple");
    expect(second.typeOfTransaction).toBe("G2C-Government-to-Citizens");
    expect(second.whoMayAvail).toBe("Resident of the City of Alaminos and registered farmer");
  });
});

// Diagnostic coverage: a line that "looks like" a heading (matches
// SERVICE_HEADING_PATTERN) but is never followed by an Office or Division
// line within the lookahead window is correctly treated as body text (not a
// new draft) — but the parser should also emit a console.warn naming that
// line, so a human running this against a new PDF page range gets a visible
// signal if a *real* heading is ever dropped this way (rather than a silent
// loss, which is exactly the failure mode that bit 1.7 and 1.4 above).
const REJECTED_HEADING_CANDIDATE_TEXT = `1.1 Real Service Heading
Office or Division:         Some Office
Classification:             Simple
Type of Transaction:        G2C-Government-to-Citizens
Who may avail:              Everyone
2.1 This looks like a heading but has no Office line nearby
Some unrelated body text
Some more unrelated body text
Still no Office or Division line in sight
`;

describe("parseCitizensCharterText — dropped-heading diagnostic", () => {
  it("warns when a heading-shaped line fails the lookahead check", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    try {
      parseCitizensCharterText(REJECTED_HEADING_CANDIDATE_TEXT);

      expect(warnSpy).toHaveBeenCalledTimes(1);
      const [message] = warnSpy.mock.calls[0];
      expect(message).toContain("2.1");
      expect(message).toContain("This looks like a heading but has no Office line nearby");
    } finally {
      warnSpy.mockRestore();
    }
  });

  it("does not warn when every heading-shaped line is a real, accepted heading", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    try {
      parseCitizensCharterText(SAMPLE_TEXT);
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      warnSpy.mockRestore();
    }
  });
});
