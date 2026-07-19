import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "../../../app/components/ui/PageHeader";

describe("PageHeader", () => {
  it("renders the badge, title, and subtitle", () => {
    render(
      <PageHeader
        badge="Services"
        title="City Services Directory"
        subtitle="Find permits and programs."
      />,
    );

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City Services Directory" })).toBeInTheDocument();
    expect(screen.getByText("Find permits and programs.")).toBeInTheDocument();
  });
});
