import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../../app/routes/home";

describe("Home", () => {
  it("renders the Better Alaminos City heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Better Alaminos City" }),
    ).toBeInTheDocument();
  });
});
