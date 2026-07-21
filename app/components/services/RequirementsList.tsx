import type { ServiceRequirement } from "../../lib/content.server";

export interface RequirementsListProps {
  requirements: ServiceRequirement[];
  itemLabel: string;
  whereToSecureLabel: string;
}

export function RequirementsList({
  requirements,
  itemLabel,
  whereToSecureLabel,
}: RequirementsListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-kapwa-border-weak)] text-[var(--color-kapwa-text-support)]">
            <th className="py-2 pr-4 font-medium">{itemLabel}</th>
            <th className="py-2 font-medium">{whereToSecureLabel}</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((requirement, index) => (
            <tr
              key={index}
              className="border-b border-[var(--color-kapwa-border-weak)] last:border-0"
            >
              <td className="py-2 pr-4 align-top text-[var(--color-kapwa-text-strong)]">
                {requirement.item}
              </td>
              <td className="py-2 align-top text-[var(--color-kapwa-text-support)]">
                {requirement.whereToSecure}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
