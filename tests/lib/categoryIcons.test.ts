import { describe, expect, it } from "vitest";
import { Building2, HeartPulse } from "lucide-react";

import { getCategoryIcon } from "../../app/lib/categoryIcons";

describe("getCategoryIcon", () => {
  it("returns the mapped icon for a known category slug", () => {
    expect(getCategoryIcon("health-services")).toBe(HeartPulse);
  });

  it("returns the default icon for an unmapped slug", () => {
    expect(getCategoryIcon("some-future-category")).toBe(Building2);
  });
});
