import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../../app/i18n/I18nProvider";
import { LanguageSwitcher } from "../../../app/components/ui/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("switches the active language when a language button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Filipino" }));

    expect(
      screen.getByRole("button", { name: "Filipino", pressed: true }),
    ).toBeInTheDocument();
  });
});
