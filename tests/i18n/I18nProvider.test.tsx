import { render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";

function Probe() {
  const { t } = useTranslation();
  return <p>{t("nav.mainLabel")}</p>;
}

describe("I18nProvider", () => {
  it("provides the default English translation", () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );
    expect(screen.getByText("Main navigation")).toBeInTheDocument();
  });
});
