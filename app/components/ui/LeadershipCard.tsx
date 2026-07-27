import { ExternalLink, Mail, Phone } from "lucide-react";

export interface LeadershipCardProps {
  name: string;
  roleLabel: string;
  colorVariant: "brand" | "purple";
  phone?: string;
  email?: string;
  socialUrl?: string;
  socialLabel?: string;
}

const HEADER_CLASS: Record<"brand" | "purple", string> = {
  brand: "bg-[var(--color-kapwa-brand-700)]",
  purple: "bg-[var(--color-kapwa-purple-700)]",
};

export function LeadershipCard({
  name,
  roleLabel,
  phone,
  email,
  socialUrl,
  socialLabel,
  colorVariant,
}: LeadershipCardProps) {
  const hasContact = Boolean(phone || email || socialUrl);

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)]">
      <div className={`${HEADER_CLASS[colorVariant]} px-5 py-5 text-center text-white`}>
        <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide">
          {roleLabel}
        </span>
        <h3 className="mt-2 text-lg font-bold">{name}</h3>
      </div>

      {hasContact && (
        <div className="flex flex-col gap-2 p-5 text-sm text-[var(--color-kapwa-text-support)]">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 hover:text-[var(--color-kapwa-text-brand)]"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" /> {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-[var(--color-kapwa-text-brand)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {email}
            </a>
          )}
          {socialUrl && (
            <a
              href={socialUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-medium text-[var(--color-kapwa-text-brand)]"
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              {socialLabel ?? socialUrl}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
