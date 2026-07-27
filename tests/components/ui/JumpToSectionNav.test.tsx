import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JumpToSectionNav } from "../../../app/components/ui/JumpToSectionNav";

const LINKS = [
  { id: "executive", label: "Executive Branch" },
  { id: "legislative", label: "Legislative Branch" },
];

describe("JumpToSectionNav", () => {
  it("renders a link per section pointing to its anchor", () => {
    render(<JumpToSectionNav eyebrow="Jump to section" links={LINKS} />);
    expect(screen.getByRole("link", { name: "Executive Branch" })).toHaveAttribute(
      "href",
      "#executive",
    );
    expect(screen.getByRole("link", { name: "Legislative Branch" })).toHaveAttribute(
      "href",
      "#legislative",
    );
  });

  it("marks the first link active by default", () => {
    render(<JumpToSectionNav eyebrow="Jump to section" links={LINKS} />);
    expect(screen.getByRole("link", { name: "Executive Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Legislative Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the clicked link active", () => {
    render(<JumpToSectionNav eyebrow="Jump to section" links={LINKS} />);
    fireEvent.click(screen.getByRole("link", { name: "Legislative Branch" }));
    expect(screen.getByRole("link", { name: "Legislative Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Executive Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
