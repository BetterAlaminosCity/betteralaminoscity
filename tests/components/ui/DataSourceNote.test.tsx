import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DataSourceNote } from "../../../app/components/ui/DataSourceNote";

describe("DataSourceNote", () => {
  it("renders the last-updated date and source", () => {
    render(<DataSourceNote lastUpdated="2026-01-15" source="Sample source" />);
    expect(screen.getByText(/2026-01-15/)).toBeInTheDocument();
    expect(screen.getByText(/Sample source/)).toBeInTheDocument();
  });
});
