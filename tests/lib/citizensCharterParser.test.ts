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
