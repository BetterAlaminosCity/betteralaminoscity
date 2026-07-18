import { useTranslation } from "react-i18next";

import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  function selectLanguage(lang: SupportedLanguage) {
    void i18n.changeLanguage(lang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
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
