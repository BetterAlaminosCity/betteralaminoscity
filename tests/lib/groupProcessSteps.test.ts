import { describe, expect, it } from "vitest";

import { groupProcessSteps } from "../../app/lib/groupProcessSteps";
import type { ServiceStep } from "../../app/lib/content.server";

function step(overrides: Partial<ServiceStep> & { clientStep: string }): ServiceStep {
  return {
    agencyAction: "Do the thing",
    fee: "None",
    processingTime: "5 minutes",
    ...overrides,
  };
}

describe("groupProcessSteps", () => {
  it("returns an empty array for no steps", () => {
    expect(groupProcessSteps([])).toEqual([]);
  });

  it("puts a single step into its own single-action group", () => {
    const steps = [step({ clientStep: "Submit the requirements" })];
    const groups = groupProcessSteps(steps);
    expect(groups).toEqual([
      { phase: undefined, clientStep: "Submit the requirements", actions: [steps[0]] },
    ]);
  });

  it("keeps distinct clientStep values as separate single-action groups", () => {
    const steps = [
      step({ clientStep: "Submit the requirements" }),
      step({ clientStep: "Pay the fee" }),
      step({ clientStep: "Claim the permit" }),
    ];
    const groups = groupProcessSteps(steps);
    expect(groups.map((g) => g.clientStep)).toEqual([
      "Submit the requirements",
      "Pay the fee",
      "Claim the permit",
    ]);
    expect(groups.every((g) => g.actions.length === 1)).toBe(true);
  });

  it("merges consecutive steps sharing the same clientStep into one group", () => {
    const steps = [
      step({ clientStep: "Submission of invitation", agencyAction: "Assessment" }),
      step({ clientStep: "Submission of invitation", agencyAction: "Orientation" }),
      step({ clientStep: "Submission of invitation", agencyAction: "Issuance of Office Order" }),
      step({ clientStep: "Submission of invitation", agencyAction: "Feedback" }),
    ];
    const groups = groupProcessSteps(steps);
    expect(groups).toHaveLength(1);
    expect(groups[0].clientStep).toBe("Submission of invitation");
    expect(groups[0].actions.map((a) => a.agencyAction)).toEqual([
      "Assessment",
      "Orientation",
      "Issuance of Office Order",
      "Feedback",
    ]);
  });

  it("starts a new group when phase is set, even if clientStep repeats the previous group's", () => {
    const steps = [
      step({
        phase: "Labor and Delivery",
        clientStep: "Labor and Delivery",
        agencyAction: "Monitor",
      }),
      step({ clientStep: "Labor and Delivery", agencyAction: "Deliver baby" }),
      step({
        phase: "Labor and Delivery",
        clientStep: "Labor and Delivery",
        agencyAction: "Repeat phase marker",
      }),
    ];
    const groups = groupProcessSteps(steps);
    expect(groups).toHaveLength(2);
    expect(groups[0].actions.map((a) => a.agencyAction)).toEqual(["Monitor", "Deliver baby"]);
    expect(groups[1].actions.map((a) => a.agencyAction)).toEqual(["Repeat phase marker"]);
  });

  it("carries the phase value from the group's first step only", () => {
    const steps = [
      step({
        phase: "Patient Registration",
        clientStep: "Patient Registration",
        agencyAction: "Chart",
      }),
      step({ clientStep: "Patient Registration", agencyAction: "Vitals" }),
    ];
    const groups = groupProcessSteps(steps);
    expect(groups).toHaveLength(1);
    expect(groups[0].phase).toBe("Patient Registration");
  });

  it("handles a mix of grouped and ungrouped runs in one array", () => {
    const steps = [
      step({ clientStep: "A", agencyAction: "a1" }),
      step({ clientStep: "A", agencyAction: "a2" }),
      step({ clientStep: "B", agencyAction: "b1" }),
      step({ clientStep: "A", agencyAction: "a3" }),
    ];
    const groups = groupProcessSteps(steps);
    expect(groups).toHaveLength(3);
    expect(groups.map((g) => ({ clientStep: g.clientStep, count: g.actions.length }))).toEqual([
      { clientStep: "A", count: 2 },
      { clientStep: "B", count: 1 },
      { clientStep: "A", count: 1 },
    ]);
  });
});
