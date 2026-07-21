import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProcessSteps } from "../../../app/components/services/ProcessSteps";

const LABELS = {
  clientStep: "Client Step",
  agencyAction: "Agency Action",
  fee: "Fee",
  processingTime: "Processing Time",
  personResponsible: "Person Responsible",
};

describe("ProcessSteps", () => {
  it("renders a phase heading and each step's fields", () => {
    render(
      <ProcessSteps
        steps={[
          {
            phase: "Submission and Accomplishment of Requirements",
            clientStep: "Sign the Visitor's Logbook",
            agencyAction: "Give the Visitor's Logbook",
            fee: "None",
            processingTime: "3 minutes",
            personResponsible: "Senior Administrative Assistant II",
          },
        ]}
        labels={LABELS}
      />,
    );

    expect(screen.getByText("Submission and Accomplishment of Requirements")).toBeInTheDocument();
    expect(screen.getByText("Sign the Visitor's Logbook")).toBeInTheDocument();
    expect(screen.getByText("Give the Visitor's Logbook")).toBeInTheDocument();
    expect(screen.getByText("3 minutes")).toBeInTheDocument();
    expect(screen.getByText("Senior Administrative Assistant II")).toBeInTheDocument();
  });

  it("omits the person-responsible field when absent", () => {
    render(
      <ProcessSteps
        steps={[
          {
            clientStep: "Pay the fee",
            agencyAction: "Accept payment",
            fee: "Php 50.00",
            processingTime: "5 minutes",
          },
        ]}
        labels={LABELS}
      />,
    );
    expect(screen.queryByText("Person Responsible")).not.toBeInTheDocument();
  });
});
