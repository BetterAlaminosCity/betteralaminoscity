import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { ServiceCard } from "../../../app/components/services/ServiceCard";

describe("ServiceCard", () => {
  it("renders title, description, badges, and a link to the href", () => {
    render(
      <MemoryRouter>
        <ServiceCard
          title="Farm Inputs and Technology Assistance"
          description="Distribution of seeds and fertilizers."
          classification="Simple"
          totalProcessingTime="26 minutes"
          href="/services/agriculture-fisheries/farm-inputs-and-technology-assistance"
          linkLabel="View details"
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /Farm Inputs and Technology Assistance/ }),
    ).toHaveAttribute(
      "href",
      "/services/agriculture-fisheries/farm-inputs-and-technology-assistance",
    );
    expect(screen.getByText("Distribution of seeds and fertilizers.")).toBeInTheDocument();
    expect(screen.getByText("Simple")).toBeInTheDocument();
    expect(screen.getByText("26 minutes")).toBeInTheDocument();
  });

  it("omits badges when classification and totalProcessingTime are absent", () => {
    render(
      <MemoryRouter>
        <ServiceCard
          title="Sample Service"
          description="A sample service."
          href="/services/sample-category/sample-service"
          linkLabel="View details"
        />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Simple")).not.toBeInTheDocument();
  });
});
