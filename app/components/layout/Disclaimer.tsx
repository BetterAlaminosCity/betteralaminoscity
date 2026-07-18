import { useTranslation } from "react-i18next";

export function Disclaimer() {
  const { t } = useTranslation();
  return (
    <p role="note" className="text-sm text-[var(--color-kapwa-text-inverse-subtle)]">
      {t("disclaimer.text")}
    </p>
  );
}
