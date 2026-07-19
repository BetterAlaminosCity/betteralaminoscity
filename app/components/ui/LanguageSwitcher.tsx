import { useTranslation } from "react-i18next";

import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  function selectLanguage(lang: SupportedLanguage) {
    void i18n.changeLanguage(lang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--color-kapwa-border-weak)] p-0.5"
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = i18n.resolvedLanguage === lang;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={isActive}
            onClick={() => selectLanguage(lang)}
            className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-[var(--color-kapwa-bg-brand-default)] text-[var(--color-kapwa-text-inverse)]"
                : "text-[var(--color-kapwa-text-support)] hover:bg-[var(--color-kapwa-bg-gray-default)]"
            }`}
          >
            {t(`language.${lang}`)}
          </button>
        );
      })}
    </div>
  );
}
