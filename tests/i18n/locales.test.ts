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
