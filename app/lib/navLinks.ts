export interface SiteNavLink {
  to: string;
  labelKey: string;
  end: boolean;
}

export const SITE_NAV_LINKS: readonly SiteNavLink[] = [
  { to: "/", labelKey: "nav.home", end: true },
  { to: "/services", labelKey: "nav.services", end: false },
  { to: "/government", labelKey: "nav.government", end: false },
  { to: "/about", labelKey: "nav.about", end: false },
  { to: "/search", labelKey: "nav.search", end: false },
];
