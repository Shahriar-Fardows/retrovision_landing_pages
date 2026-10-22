// Single source of truth for in-page anchors. Future sections must use these ids.
export const SECTION_IDS = {
  services: "services",
  work: "work",
  about: "about",
  projectInquiry: "project-inquiry",
} as const;

export type NavLink = {
  label: string;
  href: `#${string}`;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: `#${SECTION_IDS.services}` },
  { label: "Work", href: `#${SECTION_IDS.work}` },
  { label: "About", href: `#${SECTION_IDS.about}` },
  { label: "Contact", href: `#${SECTION_IDS.projectInquiry}` },
];

export const PRIMARY_CTA = {
  label: "Start a Project",
  href: `#${SECTION_IDS.projectInquiry}`,
} as const;
