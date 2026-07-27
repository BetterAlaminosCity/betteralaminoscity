import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SbMemberCard } from "../../../app/components/ui/SbMemberCard";

describe("SbMemberCard", () => {
  it("renders the name, role pill, and committee tags", () => {
    render(
      <SbMemberCard
        name="Hon. Sample Member"
        role="sp-member"
        roleLabel="SP Member"
        committeesLabel="Committee Assignments"
        committees={["Appropriations", "Ways & Means"]}
      />,
    );

    expect(screen.getByText("Hon. Sample Member")).toBeInTheDocument();
    expect(screen.getByText("SP Member")).toBeInTheDocument();
    expect(screen.getByText("Appropriations")).toBeInTheDocument();
    expect(screen.getByText("Ways & Means")).toBeInTheDocument();
  });

  it("omits the contact row when no contact fields are provided", () => {
    render(
      <SbMemberCard
        name="Hon. Sample Member"
        role="sp-member"
        roleLabel="SP Member"
        committeesLabel="Committee Assignments"
        committees={["Appropriations"]}
      />,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders contact links when provided", () => {
    render(
      <SbMemberCard
        name="Hon. Sample Member"
        role="liga-president"
        roleLabel="Liga ng mga Barangay President"
        committeesLabel="Committee Assignments"
        committees={["Barangay Affairs"]}
        phone="(075) 000-0000"
        email="sample@alaminoscity.gov.ph"
        socialUrl="https://facebook.com/example"
      />,
    );

    expect(screen.getByRole("link", { name: "(075) 000-0000" })).toHaveAttribute(
      "href",
      "tel:(075) 000-0000",
    );
    expect(screen.getByRole("link", { name: "sample@alaminoscity.gov.ph" })).toHaveAttribute(
      "href",
      "mailto:sample@alaminoscity.gov.ph",
    );
    expect(screen.getByRole("link", { name: "Social media profile" })).toHaveAttribute(
      "href",
      "https://facebook.com/example",
    );
  });
});
