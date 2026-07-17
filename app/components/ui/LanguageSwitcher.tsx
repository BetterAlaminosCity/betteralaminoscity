import { useTranslation } from "react-i18next";

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n";

const STORAGE_KEY = "betteralaminoscity-language";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  function selectLanguage(lang: SupportedLanguage) {
    void i18n.changeLanguage(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  return (
    <div role="group" aria-label={t("language.label")}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          aria-pressed={i18n.resolvedLanguage === lang}
          onClick={() => selectLanguage(lang)}
        >
          {t(`language.${lang}`)}
        </button>
      ))}
    </div>
  );
}
