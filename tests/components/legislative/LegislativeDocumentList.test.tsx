import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LegislativeDocumentList } from "../../../app/components/legislative/LegislativeDocumentList";
import type { LegislativeDocument } from "../../../app/lib/content.server";

const DOCUMENTS: LegislativeDocument[] = [
  {
    id: "ord-2025-01",
    type: "ordinance",
    number: "2025-01",
    title: "Ordinance Establishing a City Environmental Protection Code",
    date: "2025-02-10",
    status: "Enacted",
    link: "https://example.com/ord-2025-01.pdf",
  },
  {
    id: "ord-2024-12",
    type: "ordinance",
    number: "2024-12",
    title: "Ordinance Regulating Single-Use Plastics",
    date: "2024-11-05",
    status: "Enacted",
    link: "https://example.com/ord-2024-12.pdf",
  },
];

function renderList(documents = DOCUMENTS) {
  render(
    <LegislativeDocumentList
      documents={documents}
      lastUpdated="2026-01-15"
      source="Sample data"
      keywordLabel="Keyword"
      keywordPlaceholder="Search by title or number"
      yearLabel="Year"
      allYearsLabel="All years"
      emptyMessage="No matching ordinances found."
      numberHeader="No."
      titleHeader="Title"
      dateHeader="Date"
      statusHeader="Status"
    />,
  );
}

function dataRows() {
  // getAllByRole("row") includes the header row, so data rows are one fewer.
  return screen.getAllByRole("row").slice(1);
}

describe("LegislativeDocumentList", () => {
  it("lists all documents by default", () => {
    renderList();
    expect(dataRows()).toHaveLength(2);
  });

  it("filters by keyword", async () => {
    const user = userEvent.setup();
    renderList();

    await user.type(screen.getByPlaceholderText("Search by title or number"), "Plastics");

    expect(dataRows()).toHaveLength(1);
    expect(screen.getByText(/Single-Use Plastics/)).toBeInTheDocument();
  });

  it("filters by year", async () => {
    const user = userEvent.setup();
    renderList();

    await user.selectOptions(screen.getByLabelText("Year"), "2024");

    expect(dataRows()).toHaveLength(1);
    expect(screen.getByText(/Single-Use Plastics/)).toBeInTheDocument();
  });

  it("shows the empty message when nothing matches", async () => {
    const user = userEvent.setup();
    renderList();

    await user.type(screen.getByPlaceholderText("Search by title or number"), "zzz-no-match");

    expect(screen.getByText("No matching ordinances found.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("opens document links in a new tab", () => {
    renderList();

    expect(
      screen.getByRole("link", {
        name: "Ordinance Establishing a City Environmental Protection Code",
      }),
    ).toHaveAttribute("target", "_blank");
  });

  it("shows a status badge for each document", () => {
    renderList();

    expect(screen.getAllByText("Enacted")).toHaveLength(2);
  });
});
