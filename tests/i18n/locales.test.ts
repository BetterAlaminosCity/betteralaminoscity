import { describe, expect, it } from "vitest";

import en from "../../app/i18n/locales/en/common.json";
import fil from "../../app/i18n/locales/fil/common.json";

describe("services.article i18n keys", () => {
  it("has matching keys in en and fil", () => {
    expect(Object.keys(en.services.article).sort()).toEqual(
      Object.keys(fil.services.article).sort(),
    );
  });

  it("defines viewDetails in both locales", () => {
    expect(en.services.viewDetails).toBeTruthy();
    expect(fil.services.viewDetails).toBeTruthy();
  });
});

describe("government i18n keys", () => {
  it("has matching keys in en and fil", () => {
    expect(Object.keys(en.government).sort()).toEqual(Object.keys(fil.government).sort());
    expect(Object.keys(en.government.branch).sort()).toEqual(
      Object.keys(fil.government.branch).sort(),
    );
    expect(Object.keys(en.government.sbRole).sort()).toEqual(
      Object.keys(fil.government.sbRole).sort(),
    );
    expect(Object.keys(en.government.jumpToSection).sort()).toEqual(
      Object.keys(fil.government.jumpToSection).sort(),
    );
    expect(Object.keys(en.government.civicTransparency).sort()).toEqual(
      Object.keys(fil.government.civicTransparency).sort(),
    );
  });
});
