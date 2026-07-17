import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import fil from "./locales/fil/common.json";

export const SUPPORTED_LANGUAGES = ["en", "fil"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    fil: { translation: fil },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
