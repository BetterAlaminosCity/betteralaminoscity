export interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-gray-default)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <span className="inline-block rounded-full bg-[var(--color-kapwa-bg-brand-default)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-inverse)]">
          {badge}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-kapwa-text-strong)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-[var(--color-kapwa-text-support)]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
