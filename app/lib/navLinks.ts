export interface SiteNavLinkItem {
  type: "link";
  to: string;
  labelKey: string;
  end: boolean;
}

export interface SiteNavDropdownItem {
  type: "dropdown";
  labelKey: string;
  items: { to: string; labelKey: string }[];
}

export type SiteNavItem = SiteNavLinkItem | SiteNavDropdownItem;

export const SITE_NAV_LINKS: readonly SiteNavItem[] = [
  { type: "link", to: "/", labelKey: "nav.home", end: true },
  { type: "link", to: "/services", labelKey: "nav.services", end: false },
  { type: "link", to: "/government", labelKey: "nav.government", end: false },
  {
    type: "dropdown",
    labelKey: "nav.legislative",
    items: [
      {
        to: "/government/ordinances-resolutions",
        labelKey: "nav.legislativeOrdinancesResolutions",
      },
    ],
  },
  { type: "link", to: "/transparency", labelKey: "nav.transparency", end: false },
];
