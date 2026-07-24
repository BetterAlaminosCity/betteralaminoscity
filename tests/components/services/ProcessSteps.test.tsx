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
  it("renders a phase heading and a single step's fields, without a leading ordinal", () => {
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
    expect(screen.getByText("Agency Action")).toBeInTheDocument();
    expect(screen.getByText("Give the Visitor's Logbook")).toBeInTheDocument();
    expect(screen.queryByText("1.")).not.toBeInTheDocument();
    expect(screen.getByText(/Senior Administrative Assistant II/)).toBeInTheDocument();
  });

  it("omits the trailing separator from the meta line when personResponsible is absent", () => {
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
    // No personResponsible on the step, so the meta line must end after
    // processingTime — no dangling " · " and no "undefined" inserted.
    expect(screen.getByText("Fee: Php 50.00 · Processing Time: 5 minutes")).toBeInTheDocument();
  });

  it("renders consecutive same-clientStep entries as one card with numbered rows and one Agency Action label", () => {
    render(
      <ProcessSteps
        steps={[
          {
            clientStep: "Submission of invitation",
            agencyAction: "Assessment or evaluation of invitation",
            fee: "None",
            processingTime: "3 minutes",
          },
          {
            clientStep: "Submission of invitation",
            agencyAction: "Orientation on the content of training",
            fee: "None",
            processingTime: "30 minutes",
          },
          {
            clientStep: "Submission of invitation",
            agencyAction: "Issuance of Office Order to attend",
            fee: "None",
            processingTime: "Depending on the length of the training",
          },
          {
            clientStep: "Submission of invitation",
            agencyAction: "Feedback after the attendance",
            fee: "None",
            processingTime: "2 days after attending seminar",
          },
        ]}
        labels={LABELS}
      />,
    );

    expect(screen.getAllByText("Submission of invitation")).toHaveLength(1);
    expect(screen.getAllByText("Agency Action")).toHaveLength(1);
    expect(screen.getByText(/1\./)).toBeInTheDocument();
    expect(screen.getByText(/2\./)).toBeInTheDocument();
    expect(screen.getByText(/3\./)).toBeInTheDocument();
    expect(screen.getByText(/4\./)).toBeInTheDocument();
    expect(screen.getByText("Assessment or evaluation of invitation")).toBeInTheDocument();
    expect(screen.getByText("Orientation on the content of training")).toBeInTheDocument();
    expect(screen.getByText("Issuance of Office Order to attend")).toBeInTheDocument();
    expect(screen.getByText("Feedback after the attendance")).toBeInTheDocument();
  });

  it("starts a new card on a phase change even when both phases share the same clientStep text", () => {
    render(
      <ProcessSteps
        steps={[
          {
            phase: "Phase One",
            clientStep: "Submit Requirements",
            agencyAction: "Review documents",
            fee: "None",
            processingTime: "5 minutes",
          },
          {
            phase: "Phase Two",
            clientStep: "Submit Requirements",
            agencyAction: "Verify signatures",
            fee: "None",
            processingTime: "10 minutes",
          },
        ]}
        labels={LABELS}
      />,
    );

    // Same clientStep text in both phases would normally merge under the
    // clientStep-matching rule alone, but the phase change on the second
    // step must still force a separate card: two headings, two single-action
    // "Agency Action" sections, no ordinal on either (each has only 1 action).
    expect(screen.getAllByText("Submit Requirements")).toHaveLength(2);
    expect(screen.getAllByText("Agency Action")).toHaveLength(2);
    expect(screen.getByText("Review documents")).toBeInTheDocument();
    expect(screen.getByText("Verify signatures")).toBeInTheDocument();
    expect(screen.queryByText(/1\./)).not.toBeInTheDocument();
  });
});
