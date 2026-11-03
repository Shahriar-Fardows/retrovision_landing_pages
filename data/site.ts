// Single source of truth for in-page anchors and links back to the main site.
export const SECTION_IDS = {
  services: "services",
  scope: "scope",
  packages: "packages",
  about: "about",
  insights: "insights",
  faq: "faq",
  projectInquiry: "project-inquiry",
} as const;

// The studio's main site; editorial, full FAQ and privacy live there.
export const MAIN_SITE = "https://retro-vision-games.lovable.app";

export type NavLink = {
  label: string;
  href: `#${string}`;
};

// Labels end in "_" like the main site's navigation (RETRO_VISION).
export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: `#${SECTION_IDS.services}` },
  { label: "Editorial", href: `#${SECTION_IDS.insights}` },
  { label: "About", href: `#${SECTION_IDS.about}` },
  { label: "FAQ", href: `#${SECTION_IDS.faq}` },
];

export const PRIMARY_CTA = {
  label: "Start a project",
  href: `#${SECTION_IDS.projectInquiry}`,
} as const;
