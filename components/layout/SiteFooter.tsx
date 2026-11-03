import { cacheLife } from "next/cache";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { STUDIO_EMAIL } from "@/data/content";
import { MAIN_SITE, PRIMARY_CTA, SECTION_IDS } from "@/data/site";

// Cached so the page can still prerender statically; refreshes daily.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Work with us",
    links: [
      { label: "Services", href: `#${SECTION_IDS.services}` },
      { label: "Packages", href: `#${SECTION_IDS.packages}` },
      { label: "Start a project", href: PRIMARY_CTA.href },
      { label: "Email the studio", href: `mailto:${STUDIO_EMAIL}` },
    ],
  },
  {
    title: "Read",
    links: [
      { label: "Editorial", href: `${MAIN_SITE}/editorial`, external: true },
      { label: "Guides", href: `${MAIN_SITE}/editorial/guides`, external: true },
      { label: "Analysis", href: `${MAIN_SITE}/editorial/analysis`, external: true },
      { label: "Reviews", href: `${MAIN_SITE}/editorial/reviews`, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: `#${SECTION_IDS.about}` },
      { label: "FAQ", href: `#${SECTION_IDS.faq}` },
      { label: "Privacy", href: `${MAIN_SITE}/privacy`, external: true },
    ],
  },
];

// The main site's ink footer: the monthly Dispatch on the left, link columns right.
export default async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink text-fg">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(62%_0.16_235/0.18),transparent_50%),radial-gradient(ellipse_at_bottom_right,oklch(62%_0.22_25/0.14),transparent_50%)]" />
      <Container className="relative grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>The Retro_Vision Dispatch</Eyebrow>
          <p className="mt-4 font-display text-3xl leading-tight font-bold">
            Field notes from the studio. One email a month, <span className="text-anaglyph">zero fluff.</span>
          </p>
          <ButtonLink href={MAIN_SITE} variant="paper" external className="mt-6">
            Subscribe on our main site
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-[10px] tracking-[0.18em] text-fg/50 uppercase">{column.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-sm text-fg/80 transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
      <Container className="relative flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="w-[150px]" />
        <p className="text-sm text-fg/60">© {year} Retro_Vision · Making games impossible to ignore.</p>
      </Container>
    </footer>
  );
}
