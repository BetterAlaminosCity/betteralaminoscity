import { describe, expect, it } from "vitest";

import en from "../../app/i18n/locales/en/common.json";
import fil from "../../app/i18n/locales/fil/common.json";

describe("services.article i18n keys", () => {
  it("has matching keys in en and fil", () => {
    expect(Object.keys(en.services.article).sort()).toEqual(
      Object.keys(fil.services.article).sort(),
    );
  });

  it("defines viewDetails in both locales", () => {
    expect(en.services.viewDetails).toBeTruthy();
    expect(fil.services.viewDetails).toBeTruthy();
  });
});

describe("government i18n keys", () => {
  it("has matching keys in en and fil", () => {
    expect(Object.keys(en.government).sort()).toEqual(Object.keys(fil.government).sort());
    expect(Object.keys(en.government.branch).sort()).toEqual(
      Object.keys(fil.government.branch).sort(),
    );
    expect(Object.keys(en.government.sbRole).sort()).toEqual(
      Object.keys(fil.government.sbRole).sort(),
    );
    expect(Object.keys(en.government.jumpToSection).sort()).toEqual(
      Object.keys(fil.government.jumpToSection).sort(),
    );
    expect(Object.keys(en.government.civicTransparency).sort()).toEqual(
      Object.keys(fil.government.civicTransparency).sort(),
    );
  });
});

describe("legislative i18n keys", () => {
  it("has matching top-level keys in en and fil", () => {
    expect(Object.keys(en.legislative).sort()).toEqual(Object.keys(fil.legislative).sort());
  });

  it("has matching pageHeader keys in en and fil", () => {
    expect(Object.keys(en.legislative.pageHeader).sort()).toEqual(
      Object.keys(fil.legislative.pageHeader).sort(),
    );
  });

  it("has matching cards keys in en and fil", () => {
    expect(Object.keys(en.legislative.cards).sort()).toEqual(
      Object.keys(fil.legislative.cards).sort(),
    );
  });

  it("has matching browse keys in en and fil", () => {
    expect(Object.keys(en.legislative.browse).sort()).toEqual(
      Object.keys(fil.legislative.browse).sort(),
    );
  });

  it("has matching flowchart top-level keys in en and fil", () => {
    expect(Object.keys(en.legislative.flowchart).sort()).toEqual(
      Object.keys(fil.legislative.flowchart).sort(),
    );
  });

  it.each([
    "fileProposal",
    "firstReading",
    "publicHearing",
    "committeeReport",
    "secondReading",
    "thirdReading",
    "mayorApproval",
    "spSubmission",
    "spReview",
    "posting",
    "implementation",
  ])("ordinance step %s has truthy title and description in both locales", (stepKey) => {
    const enStep =
      en.legislative.flowchart.ordinanceSteps[
        stepKey as keyof typeof en.legislative.flowchart.ordinanceSteps
      ];
    const filStep =
      fil.legislative.flowchart.ordinanceSteps[
        stepKey as keyof typeof fil.legislative.flowchart.ordinanceSteps
      ];
    expect(enStep).toBeTruthy();
    expect(filStep).toBeTruthy();
    expect(enStep.title).toBeTruthy();
    expect(enStep.description).toBeTruthy();
    expect(filStep.title).toBeTruthy();
    expect(filStep.description).toBeTruthy();
  });

  it.each([
    "fileProposal",
    "sessionAgenda",
    "committeeApproval",
    "finalDraft",
    "officialSigning",
    "postingTransmittal",
  ])("resolution step %s has truthy title and description in both locales", (stepKey) => {
    const enStep =
      en.legislative.flowchart.resolutionSteps[
        stepKey as keyof typeof en.legislative.flowchart.resolutionSteps
      ];
    const filStep =
      fil.legislative.flowchart.resolutionSteps[
        stepKey as keyof typeof fil.legislative.flowchart.resolutionSteps
      ];
    expect(enStep).toBeTruthy();
    expect(filStep).toBeTruthy();
    expect(enStep.title).toBeTruthy();
    expect(enStep.description).toBeTruthy();
    expect(filStep.title).toBeTruthy();
    expect(filStep.description).toBeTruthy();
  });

  it("has matching explainer top-level keys in en and fil", () => {
    expect(Object.keys(en.legislative.explainer).sort()).toEqual(
      Object.keys(fil.legislative.explainer).sort(),
    );
  });

  it.each(["ordinances", "resolutions", "publicParticipation", "transparency"])(
    "explainer card %s has truthy title and description in both locales",
    (cardKey) => {
      const enCard = en.legislative.explainer[cardKey as keyof typeof en.legislative.explainer] as {
        title: string;
        description: string;
      };
      const filCard = fil.legislative.explainer[
        cardKey as keyof typeof fil.legislative.explainer
      ] as { title: string; description: string };
      expect(enCard).toBeTruthy();
      expect(filCard).toBeTruthy();
      expect(enCard.title).toBeTruthy();
      expect(enCard.description).toBeTruthy();
      expect(filCard.title).toBeTruthy();
      expect(filCard.description).toBeTruthy();
    },
  );
});
