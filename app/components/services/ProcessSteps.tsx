import { groupProcessSteps } from "../../lib/groupProcessSteps";
import type { ServiceStep } from "../../lib/content.server";

export interface ProcessStepsLabels {
  clientStep: string;
  agencyAction: string;
  fee: string;
  processingTime: string;
  personResponsible: string;
}

export interface ProcessStepsProps {
  steps: ServiceStep[];
  labels: ProcessStepsLabels;
}

export function ProcessSteps({ steps, labels }: ProcessStepsProps) {
  const groups = groupProcessSteps(steps);

  return (
    <ol className="flex flex-col gap-6">
      {groups.map((group, groupIndex) => (
        <li key={groupIndex}>
          {group.phase ? (
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
              {group.phase}
            </p>
          ) : null}
          <div className="rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-4">
            <p className="text-sm font-semibold text-[var(--color-kapwa-text-strong)]">
              {group.clientStep}
            </p>
            <p className="mt-3 text-xs font-medium uppercase text-[var(--color-kapwa-text-support)]">
              {labels.agencyAction}
            </p>
            <ol className="mt-1 flex flex-col">
              {group.actions.map((action, actionIndex) => (
                <li
                  key={actionIndex}
                  className={
                    actionIndex > 0
                      ? "mt-3 border-t border-[var(--color-kapwa-border-weak)] pt-3"
                      : ""
                  }
                >
                  <p className="text-sm text-[var(--color-kapwa-text-strong)]">
                    {group.actions.length > 1 ? (
                      <span className="mr-1 text-[var(--color-kapwa-text-brand)]">
                        {actionIndex + 1}.
                      </span>
                    ) : null}
                    <span>{action.agencyAction}</span>
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-kapwa-text-support)]">
                    {labels.fee}: {action.fee} · {labels.processingTime}: {action.processingTime}
                    {action.personResponsible ? ` · ${action.personResponsible}` : ""}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </li>
      ))}
    </ol>
  );
}
