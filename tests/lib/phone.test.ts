import { describe, expect, it } from "vitest";

import { telHref } from "../../app/lib/phone";

describe("telHref", () => {
  it("strips formatting characters from a local number", () => {
    expect(telHref("0947-551-1420")).toBe("tel:09475511420");
  });

  it("strips formatting characters and keeps a leading plus sign", () => {
    expect(telHref("+63 947 551 1420")).toBe("tel:+639475511420");
  });

  it("passes through a bare emergency number", () => {
    expect(telHref("911")).toBe("tel:911");
  });
});
