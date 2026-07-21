import { describe, expect, it } from "vitest";
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
