import { ExternalLink, Mail, Phone } from "lucide-react";

import type { SbMemberRole } from "../../lib/content.server";

export interface SbMemberCardProps {
  name: string;
  role: SbMemberRole;
  roleLabel: string;
  committeesLabel: string;
  committees: string[];
  phone?: string;
  email?: string;
  socialUrl?: string;
}

const ROLE_PILL_CLASS: Record<SbMemberRole, string> = {
  "sp-member": "bg-[var(--color-role-legislative-bg)] text-[var(--color-role-legislative-text)]",
  "liga-president": "bg-[var(--color-role-liga-bg)] text-[var(--color-role-liga-text)]",
  "sk-president": "bg-[var(--color-role-sk-bg)] text-[var(--color-role-sk-text)]",
  secretary: "bg-[var(--color-kapwa-bg-gray-default)] text-[var(--color-kapwa-text-strong)]",
};

export function SbMemberCard({
  name,
  role,
  roleLabel,
  committeesLabel,
  committees,
  phone,
  email,
  socialUrl,
}: SbMemberCardProps) {
  const hasContact = Boolean(phone || email || socialUrl);

  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] p-5">
      <div className="flex flex-col gap-1.5">
        <span
          className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${ROLE_PILL_CLASS[role]}`}
        >
          {roleLabel}
        </span>
        <p className="text-base font-bold text-[var(--color-kapwa-text-strong)]">{name}</p>
      </div>

      {committees.length > 0 && (
        <div className="border-t border-[var(--color-kapwa-border-weak)] pt-3">
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-[var(--color-kapwa-text-support)]">
            {committeesLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {committees.map((committee) => (
              <span
                key={committee}
                className="rounded-md border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-gray-default)] px-2 py-1 text-xs text-[var(--color-kapwa-text-strong)]"
              >
                {committee}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasContact && (
        <div className="flex gap-1.5 border-t border-[var(--color-kapwa-border-weak)] pt-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              aria-label={phone}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-kapwa-border-weak)] text-[var(--color-kapwa-text-support)] hover:border-[var(--color-kapwa-border-brand)] hover:text-[var(--color-kapwa-text-brand)]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label={email}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-kapwa-border-weak)] text-[var(--color-kapwa-text-support)] hover:border-[var(--color-kapwa-border-brand)] hover:text-[var(--color-kapwa-text-brand)]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {socialUrl && (
            <a
              href={socialUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Social media profile"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-kapwa-border-weak)] text-[var(--color-kapwa-text-support)] hover:border-[var(--color-kapwa-border-brand)] hover:text-[var(--color-kapwa-text-brand)]"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
