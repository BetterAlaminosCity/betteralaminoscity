import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocationMap } from "../../../app/components/home/LocationMap";

describe("LocationMap", () => {
  it("renders an OpenStreetMap embed with the given title", () => {
    render(<LocationMap title="Map of Alaminos City" />);

    const iframe = screen.getByTitle("Map of Alaminos City");
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute("src", expect.stringContaining("openstreetmap.org"));
  });
});
