import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PILLARS, SERVICE_CATEGORIES } from "@/data/content";
import { SECTION_IDS } from "@/data/site";
import ServiceTabs from "./ServiceTabs";

const TONE = {
  blue: { sig: "var(--color-accent)", label: "text-accent-ink", dot: "bg-accent shadow-[var(--shadow-glow-blue)]", hover: "hover:border-accent/50 hover:shadow-[var(--shadow-card-glow-blue)]" },
  red: { sig: "var(--color-accent-red)", label: "text-accent-red", dot: "bg-accent-red shadow-[var(--shadow-glow-red)]", hover: "hover:border-accent-red/50 hover:shadow-[var(--shadow-card-glow-red)]" },
} as const;

// "What we do": six dark pillar cards on the slate canvas, then the full
// sixteen-service scope the main site keeps on its services page.
export default function Services() {
  return (
    <section
      id={SECTION_IDS.services}
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-slate py-20 md:py-24"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-paper to-transparent md:h-40" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(94%_0.05_25/0.55),transparent_55%)]" />
      <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-15" />

      <Container className="relative">
        <SectionHeading
          id="services-title"
          label="What we do"
          title={
            <>
              Built for games ready
              <br />
              to get&nbsp;<span className="highlight-blue whitespace-nowrap">a real shot.</span>
            </>
          }
          aside="We elevate titles with real potential and turn a solid foundation into tangible success."
        />

        <Reveal stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
          {PILLARS.map((pillar) => {
            const tone = TONE[pillar.tone];
            return (
              <li
                key={pillar.title}
                data-reveal
                data-theme="dark"
                style={{ "--sig": tone.sig, "--sig-x": "0%" } as CSSProperties}
                className={`card-signal group flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-ink p-6 text-fg shadow-[var(--shadow-depth)] transition duration-500 motion-safe:hover:-translate-y-1 md:p-7 ${tone.hover}`}
              >
                <Image
                  src={`/images/site/${pillar.image}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="pointer-events-none -z-10 object-cover opacity-[0.14] saturate-[0.6] transition-opacity duration-700 [mask-image:linear-gradient(180deg,#000_20%,transparent_95%)] group-hover:opacity-[0.24]"
                />
                <span className={`font-mono text-[10px] font-semibold tracking-[0.18em] uppercase ${tone.label}`}>
                  {pillar.label}
                </span>
                <h3 className="mt-3 flex items-center gap-3 text-2xl font-bold md:text-3xl">
                  <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${tone.dot}`} />
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg/75">{pillar.body}</p>
              </li>
            );
          })}
        </Reveal>

        <div className="mt-8 flex justify-end">
          <ButtonLink href={`#${SECTION_IDS.scope}`} variant="text">
            Explore the full scope
          </ButtonLink>
        </div>

        <div id={SECTION_IDS.scope} className="mt-20 border-t border-line-strong pt-16 md:mt-24 md:pt-20">
          <div className="max-w-2xl">
            <h3 className="text-3xl leading-tight font-bold tracking-[-0.02em] md:text-4xl">
              The full scope: <span className="text-anaglyph">sixteen services.</span>
            </h3>
            <p className="mt-4 leading-relaxed text-fg-muted">
              Four disciplines. Use one, or let us connect them around every public beat.
            </p>
          </div>
          <ServiceTabs categories={SERVICE_CATEGORIES} />
        </div>
      </Container>
    </section>
  );
}
