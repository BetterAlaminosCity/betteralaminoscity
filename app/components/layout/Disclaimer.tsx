import { useTranslation } from "react-i18next";

export function Disclaimer() {
  const { t } = useTranslation();
  return (
    <p role="note" className="text-sm text-gray-600">
      {t("disclaimer.text")}
    </p>
  );
}
