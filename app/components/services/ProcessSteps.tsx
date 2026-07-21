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
  return (
    <ol className="flex flex-col gap-6">
      {steps.map((step, index) => (
        <li key={index}>
          {step.phase ? (
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
              {step.phase}
            </p>
          ) : null}
          <div className="rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-4">
            <p className="text-sm font-semibold text-[var(--color-kapwa-text-strong)]">
              {step.clientStep}
            </p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase text-[var(--color-kapwa-text-support)]">
                  {labels.agencyAction}
                </dt>
                <dd className="text-[var(--color-kapwa-text-strong)]">{step.agencyAction}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-[var(--color-kapwa-text-support)]">
                  {labels.fee}
                </dt>
                <dd className="text-[var(--color-kapwa-text-strong)]">{step.fee}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-[var(--color-kapwa-text-support)]">
                  {labels.processingTime}
                </dt>
                <dd className="text-[var(--color-kapwa-text-strong)]">{step.processingTime}</dd>
              </div>
              {step.personResponsible ? (
                <div>
                  <dt className="text-xs font-medium uppercase text-[var(--color-kapwa-text-support)]">
                    {labels.personResponsible}
                  </dt>
                  <dd className="text-[var(--color-kapwa-text-strong)]">
                    {step.personResponsible}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
