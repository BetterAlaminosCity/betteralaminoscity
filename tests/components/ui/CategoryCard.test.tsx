import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { HeartPulse } from "lucide-react";

import { CategoryCard } from "../../../app/components/ui/CategoryCard";

function renderCategoryCard() {
  const router = createMemoryRouter([
    {
      path: "/",
      Component: () => (
        <CategoryCard
          icon={HeartPulse}
          title="Health Services"
          description="Public health programs and clinics."
          href="/services/health-services"
          linkLabel="View services"
        />
      ),
    },
  ]);
  return render(<RouterProvider router={router} />);
}

describe("CategoryCard", () => {
  it("renders the title, description, and links to the category href", () => {
    renderCategoryCard();

    expect(screen.getByRole("heading", { name: "Health Services" })).toBeInTheDocument();
    expect(screen.getByText("Public health programs and clinics.")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/services/health-services");
  });
});
