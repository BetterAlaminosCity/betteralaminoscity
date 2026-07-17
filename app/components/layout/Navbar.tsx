import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../ui/LanguageSwitcher";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header>
      <nav
        aria-label={t("nav.home")}
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <Link to="/">
          <img src="/wordmark.svg" alt="BetterAlaminosCity.org" height={32} />
        </Link>
        <Link to="/">{t("nav.home")}</Link>
        <Link to="/about">{t("nav.about")}</Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
