import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { JumpToSectionNav } from "../../../app/components/ui/JumpToSectionNav";

const LINKS = [
  { id: "executive", label: "Executive Branch" },
  { id: "legislative", label: "Legislative Branch" },
];

function setSectionTop(id: string, top: number) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`No element with id "${id}" in the document`);
  vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
    top,
    bottom: top + 100,
    left: 0,
    right: 0,
    width: 0,
    height: 100,
    x: 0,
    y: top,
    toJSON() {},
  });
}

/** Controls the page-scroll-position inputs the "reached bottom of page" check reads. */
function setPageScrollState({
  scrollY,
  innerHeight,
  scrollHeight,
}: {
  scrollY: number;
  innerHeight: number;
  scrollHeight: number;
}) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
}

function fireScroll() {
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

function renderWithSections() {
  const result = render(
    <>
      <div id="executive" />
      <div id="legislative" />
      <JumpToSectionNav eyebrow="Jump to section" links={LINKS} />
    </>,
  );
  // Simulate the page having just loaded at the top: Executive is on
  // screen, Legislative is further down, off-screen, well short of the
  // bottom of a tall page.
  setSectionTop("executive", 10);
  setSectionTop("legislative", 800);
  setPageScrollState({ scrollY: 0, innerHeight: 800, scrollHeight: 5000 });
  fireScroll();
  return result;
}

describe("JumpToSectionNav", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a link per section pointing to its anchor", () => {
    renderWithSections();
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
    renderWithSections();
    expect(screen.getByRole("link", { name: "Executive Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Legislative Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the clicked link active", () => {
    renderWithSections();
    fireEvent.click(screen.getByRole("link", { name: "Legislative Branch" }));
    expect(screen.getByRole("link", { name: "Legislative Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Executive Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the section link active once it scrolls up past the sticky-header offset", () => {
    renderWithSections();
    setSectionTop("executive", -500);
    setSectionTop("legislative", 50);
    fireScroll();
    expect(screen.getByRole("link", { name: "Legislative Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Executive Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("keeps an earlier section active while a later, still-short-of-offset section is on screen", () => {
    renderWithSections();
    // Legislative has entered the viewport but its top hasn't yet crossed
    // the offset line — Executive should stay active until it does.
    setSectionTop("executive", -400);
    setSectionTop("legislative", 300);
    setPageScrollState({ scrollY: 400, innerHeight: 800, scrollHeight: 5000 });
    fireScroll();
    expect(screen.getByRole("link", { name: "Executive Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Legislative Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("forces the last section active once the page is scrolled to the bottom, even if its top never crossed the offset", () => {
    renderWithSections();
    // Regression case: a short final section whose top sits at 300px (well
    // past the ~100px offset) but the page has no more room to scroll —
    // it must still be picked as active instead of leaving an earlier
    // section stuck highlighted.
    setSectionTop("executive", -4200);
    setSectionTop("legislative", 300);
    setPageScrollState({ scrollY: 4200, innerHeight: 800, scrollHeight: 5000 });
    fireScroll();
    expect(screen.getByRole("link", { name: "Legislative Branch" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Executive Branch" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
