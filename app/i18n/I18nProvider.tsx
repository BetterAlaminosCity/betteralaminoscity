import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n, { LANGUAGE_STORAGE_KEY, type SupportedLanguage } from "./index";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "fil") {
      void i18n.changeLanguage(stored satisfies SupportedLanguage);
    }

    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
    const syncDocumentLanguage = (lng: string) => {
      document.documentElement.lang = lng;
    };
    i18n.on("languageChanged", syncDocumentLanguage);
    return () => {
      i18n.off("languageChanged", syncDocumentLanguage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
