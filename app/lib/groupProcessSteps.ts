import type { ServiceStep } from "./content.server";

export interface StepGroup {
  phase?: string;
  clientStep: string;
  actions: ServiceStep[];
}

export function groupProcessSteps(steps: ServiceStep[]): StepGroup[] {
  const groups: StepGroup[] = [];

  for (const current of steps) {
    const previousGroup = groups[groups.length - 1];
    const startsNewGroup =
      !previousGroup ||
      current.phase !== undefined ||
      current.clientStep !== previousGroup.clientStep;

    if (startsNewGroup) {
      groups.push({ phase: current.phase, clientStep: current.clientStep, actions: [current] });
    } else {
      previousGroup.actions.push(current);
    }
  }

  return groups;
}
