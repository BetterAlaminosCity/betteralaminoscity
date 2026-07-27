import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { Coins } from "lucide-react";

import {
  DepartmentCard,
  type DepartmentCardProps,
} from "../../../app/components/ui/DepartmentCard";

function renderCard(overrides: Partial<DepartmentCardProps> = {}) {
  const router = createMemoryRouter([
    {
      path: "/",
      Component: () => (
        <DepartmentCard
          icon={Coins}
          title="City Treasurer's Office"
          description="Manages local tax collection."
          branchLabel="Executive"
          href="/government/city-treasurers-office"
          linkLabel="View office"
          {...overrides}
        />
      ),
    },
  ]);
  return render(<RouterProvider router={router} />);
}

describe("DepartmentCard", () => {
  it("renders the title, description, branch label, and link", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: "City Treasurer's Office" })).toBeInTheDocument();
    expect(screen.getByText("Manages local tax collection.")).toBeInTheDocument();
    expect(screen.getByText("Executive")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/government/city-treasurers-office");
  });

  it("omits the head line when not provided", () => {
    renderCard();
    expect(screen.queryByText(/headed by/i)).not.toBeInTheDocument();
  });

  it("renders the head line when provided", () => {
    renderCard({ headLine: "Headed by Hon. Sample Name" });
    expect(screen.getByText("Headed by Hon. Sample Name")).toBeInTheDocument();
  });

  it("omits the branch chip when not provided", () => {
    renderCard({ branchLabel: undefined });
    expect(screen.queryByText("Executive")).not.toBeInTheDocument();
  });
});
