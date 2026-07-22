import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { EmergencyHotlineBar } from "../../../app/components/layout/EmergencyHotlineBar";
import type { Hotlines } from "../../../app/lib/content.server";

const HOTLINES: Hotlines = {
  lastUpdated: "2026-01-15",
  source: "Sample source",
  emergencyNumber: "911",
  hotlines: [
    { key: "cdrrmo", name: "CDRRMO", numbers: ["0947-000-0001"] },
    { key: "cho", name: "CHO", numbers: ["0908-000-0002"] },
    {
      key: "police",
      name: "Sample Police Station",
      numbers: ["0998-000-0003", "0998-000-0004"],
    },
    { key: "bfp", name: "BFP", numbers: ["0919-000-0005"] },
    { key: "tourism-office", name: "Tourism Office", numbers: ["0917-000-0006"] },
  ],
};

function renderBar(hotlines: Hotlines | null) {
  return render(
    <I18nProvider>
      <EmergencyHotlineBar hotlines={hotlines} />
    </I18nProvider>,
  );
}

describe("EmergencyHotlineBar", () => {
  it("renders nothing when hotlines is null", () => {
    const { container } = renderBar(null);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the emergency number as a tel: link", () => {
    renderBar(HOTLINES);
    expect(screen.getByRole("link", { name: /911/ })).toHaveAttribute("href", "tel:911");
  });

  it("renders the four curated hotlines using each one's first number", () => {
    renderBar(HOTLINES);

    expect(screen.getByRole("link", { name: /CDRRMO/ })).toHaveAttribute("href", "tel:09470000001");
    expect(screen.getByRole("link", { name: /CHO/ })).toHaveAttribute("href", "tel:09080000002");
    expect(screen.getByRole("link", { name: /Sample Police Station/ })).toHaveAttribute(
      "href",
      "tel:09980000003",
    );
    expect(screen.getByRole("link", { name: /BFP/ })).toHaveAttribute("href", "tel:09190000005");
  });

  it("does not render a hotline that isn't in the curated list", () => {
    renderBar(HOTLINES);
    expect(screen.queryByRole("link", { name: /Tourism Office/ })).not.toBeInTheDocument();
  });

  it("skips a curated key missing from the hotlines data without crashing", () => {
    const withoutCho: Hotlines = {
      ...HOTLINES,
      hotlines: HOTLINES.hotlines.filter((hotline) => hotline.key !== "cho"),
    };
    renderBar(withoutCho);

    expect(screen.getByRole("link", { name: /CDRRMO/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^CHO/ })).not.toBeInTheDocument();
  });
});
