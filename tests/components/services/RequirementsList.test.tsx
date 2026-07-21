import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RequirementsList } from "../../../app/components/services/RequirementsList";

describe("RequirementsList", () => {
  it("renders each requirement's item and where to secure it", () => {
    render(
      <RequirementsList
        requirements={[
          { item: "Request Slip Form", whereToSecure: "City Agriculture Office" },
          { item: "Barangay Certification", whereToSecure: "Barangay Hall" },
        ]}
        itemLabel="Requirements"
        whereToSecureLabel="Where to Secure"
      />,
    );

    expect(screen.getByText("Requirements")).toBeInTheDocument();
    expect(screen.getByText("Where to Secure")).toBeInTheDocument();
    expect(screen.getByText("Request Slip Form")).toBeInTheDocument();
    expect(screen.getByText("City Agriculture Office")).toBeInTheDocument();
    expect(screen.getByText("Barangay Certification")).toBeInTheDocument();
    expect(screen.getByText("Barangay Hall")).toBeInTheDocument();
  });
});
