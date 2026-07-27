import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LeadershipCard } from "../../../app/components/ui/LeadershipCard";

describe("LeadershipCard", () => {
  it("renders the role label and name", () => {
    render(<LeadershipCard name="Hon. Sample Mayor" roleLabel="City Mayor" colorVariant="brand" />);
    expect(screen.getByText("City Mayor")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hon. Sample Mayor" })).toBeInTheDocument();
  });

  it("renders no contact links when none are provided", () => {
    render(<LeadershipCard name="Hon. Sample Mayor" roleLabel="City Mayor" colorVariant="brand" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders contact links when provided", () => {
    render(
      <LeadershipCard
        name="Hon. Sample Mayor"
        roleLabel="City Mayor"
        colorVariant="brand"
        phone="(075) 000-0000"
        email="mayor@alaminoscity.gov.ph"
        socialUrl="https://facebook.com/example"
        socialLabel="Facebook Page"
      />,
    );
    expect(screen.getByRole("link", { name: /\(075\) 000-0000/ })).toHaveAttribute(
      "href",
      "tel:(075) 000-0000",
    );
    expect(screen.getByRole("link", { name: /mayor@alaminoscity\.gov\.ph/ })).toHaveAttribute(
      "href",
      "mailto:mayor@alaminoscity.gov.ph",
    );
    expect(screen.getByRole("link", { name: "Facebook Page" })).toHaveAttribute(
      "href",
      "https://facebook.com/example",
    );
  });
});
