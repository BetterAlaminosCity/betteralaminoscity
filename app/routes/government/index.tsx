import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

import {
  getOfficial,
  getSbMembers,
  listCategories,
  type SbMemberRole,
} from "../../lib/content.server";
import { buildMeta } from "../../lib/seo";
import { getCategoryIcon } from "../../lib/categoryIcons";
import { PageHeader } from "../../components/ui/PageHeader";
import { LeadershipCard } from "../../components/ui/LeadershipCard";
import { SbMemberCard } from "../../components/ui/SbMemberCard";
import { DepartmentCard } from "../../components/ui/DepartmentCard";
import { JumpToSectionNav } from "../../components/ui/JumpToSectionNav";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Government",
    description: "Directory of Alaminos City government offices and officials.",
    path: "/government",
  });
}

export function loader() {
  const offices = listCategories("government");
  const mayor = getOfficial("office-of-the-mayor");
  const viceMayor = getOfficial("sangguniang-panlungsod");
  const departments = offices
    .filter((office) => office.branch === "executive" && office.slug !== "office-of-the-mayor")
    .map((office) => ({ ...office, official: getOfficial(office.slug) }));
  const sbMembers = getSbMembers();

  return { mayor, viceMayor, departments, sbMembers };
}

export default function GovernmentIndex() {
  const { mayor, viceMayor, departments, sbMembers } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const jumpLinks = [
    { id: "executive", label: t("government.jumpToSection.executive") },
    { id: "legislative", label: t("government.jumpToSection.legislative") },
    { id: "departments", label: t("government.jumpToSection.departments") },
    { id: "transparency", label: t("government.jumpToSection.transparency") },
  ];

  const roleLabels: Record<SbMemberRole, string> = {
    "sp-member": t("government.sbRole.spMember"),
    "liga-president": t("government.sbRole.ligaPresident"),
    "sk-president": t("government.sbRole.skPresident"),
  };

  const branchLabels: Record<"executive" | "legislative", string> = {
    executive: t("government.branch.executive"),
    legislative: t("government.branch.legislative"),
  };

  return (
    <>
      <PageHeader
        badge={t("government.pageHeader.badge")}
        title={t("government.pageHeader.title")}
        subtitle={t("government.pageHeader.subtitle")}
      />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[236px_1fr]">
          <JumpToSectionNav eyebrow={t("government.jumpToSection.eyebrow")} links={jumpLinks} />

          <div>
            <section id="executive" className="scroll-mt-24 pb-16">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
                {t("government.executiveLeadershipEyebrow")}
              </p>
              <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {t("government.executiveLeadership")}
              </h2>
              <p className="mt-1.5 text-[var(--color-kapwa-text-support)]">
                {t("government.executiveLeadershipSubtitle")}
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {mayor && (
                  <LeadershipCard
                    name={mayor.name}
                    roleLabel={mayor.title}
                    colorVariant="brand"
                    phone={mayor.phone}
                    email={mayor.email}
                    socialUrl={mayor.socialUrl}
                    socialLabel={mayor.socialUrl ? t("government.socialLinkLabel") : undefined}
                  />
                )}
                {viceMayor && (
                  <LeadershipCard
                    name={viceMayor.name}
                    roleLabel={`${viceMayor.title} · ${t("government.viceMayorRoleSuffix")}`}
                    colorVariant="purple"
                    phone={viceMayor.phone}
                    email={viceMayor.email}
                    socialUrl={viceMayor.socialUrl}
                    socialLabel={viceMayor.socialUrl ? t("government.socialLinkLabel") : undefined}
                  />
                )}
              </div>
            </section>

            <section id="legislative" className="scroll-mt-24 pb-16">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-role-legislative-accent)]">
                {t("government.legislativeEyebrow")}
              </p>
              <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {t("government.legislative")}
              </h2>
              <p className="mt-1.5 text-[var(--color-kapwa-text-support)]">
                {t("government.legislativeSubtitle")}
              </p>
              {sbMembers && sbMembers.members.length > 0 ? (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sbMembers.members.map((member) => (
                    <li key={member.name}>
                      <SbMemberCard
                        name={member.name}
                        role={member.role}
                        roleLabel={roleLabels[member.role]}
                        committeesLabel={t("government.committeeAssignments")}
                        committees={member.committees}
                        phone={member.phone}
                        email={member.email}
                        socialUrl={member.socialUrl}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-sm italic text-[var(--color-kapwa-text-support)]">
                  {t("government.legislativeEmptyState")}
                </p>
              )}
            </section>

            <section id="departments" className="scroll-mt-24 pb-16">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
                {t("government.departmentOfficesEyebrow")}
              </p>
              <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {t("government.departmentOffices")}
              </h2>
              <p className="mt-1.5 text-[var(--color-kapwa-text-support)]">
                {t("government.departmentOfficesSubtitle")}
              </p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {departments.map((office) => (
                  <li key={office.slug}>
                    <DepartmentCard
                      icon={getCategoryIcon(office.slug)}
                      title={office.title}
                      description={office.description}
                      branchLabel={office.branch ? branchLabels[office.branch] : undefined}
                      headLine={
                        office.official && office.official.name !== "{PLACEHOLDER}"
                          ? t("government.headedBy", { name: office.official.name })
                          : undefined
                      }
                      href={`/government/${office.slug}`}
                      linkLabel={t("government.viewOffice")}
                    />
                  </li>
                ))}
              </ul>
            </section>

            <section id="transparency" className="scroll-mt-24">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-kapwa-text-brand)]">
                {t("government.civicTransparency.eyebrow")}
              </p>
              <h2 className="text-2xl font-bold text-[var(--color-kapwa-text-strong)]">
                {t("government.civicTransparency.heading")}
              </h2>
              <ul className="mt-6 flex flex-col gap-2">
                <li>
                  <Link
                    to="/government/transparency"
                    className="block rounded-lg border border-[var(--color-kapwa-border-weak)] px-4 py-3 font-medium text-[var(--color-kapwa-text-strong)] hover:bg-[var(--color-kapwa-bg-gray-default)]"
                  >
                    {t("government.civicTransparency.budgetFiscalTransparency")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/government/ordinances-resolutions"
                    className="block rounded-lg border border-[var(--color-kapwa-border-weak)] px-4 py-3 font-medium text-[var(--color-kapwa-text-strong)] hover:bg-[var(--color-kapwa-bg-gray-default)]"
                  >
                    {t("government.civicTransparency.ordinancesResolutions")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/government/statistics"
                    className="block rounded-lg border border-[var(--color-kapwa-border-weak)] px-4 py-3 font-medium text-[var(--color-kapwa-text-strong)] hover:bg-[var(--color-kapwa-bg-gray-default)]"
                  >
                    {t("government.civicTransparency.statisticsDemographics")}
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
