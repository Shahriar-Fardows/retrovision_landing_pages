import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PACKAGES, PACKAGES_NOTE } from "@/data/content";
import { PRIMARY_CTA } from "@/data/site";

// The studio's three starting packages, keyed to where a game is in its life.
// Pricing is scoped per project, so no price tags.
export default function Engagement() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="packages-title"
          label="Where to start"
          title="Pick the moment you are standing in."
          intro={PACKAGES_NOTE}
        />

        <Reveal
          stagger
          as="ul"
          className="mt-14 grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:mt-20 lg:grid-cols-3"
        >
          {PACKAGES.map((item) => (
            <li key={item.name} data-reveal className="relative flex flex-col bg-surface p-7 md:p-9">
              {item.highlight && (
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-violet),var(--color-accent-red))]" />
              )}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-accent-ink">{item.duration}</span>
                {item.highlight && (
                  <span className="rounded-xs border border-accent/50 px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-accent-ink uppercase">
                    Most common start
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-fg">{item.name}</h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-fg-subtle uppercase">{item.stage}</p>
              <p className="mt-4 leading-[1.65] text-fg-muted">{item.summary}</p>
              <p className="mt-7 border-t border-line pt-6 font-mono text-[11px] tracking-[0.13em] text-fg-subtle uppercase">
                Included scope
              </p>
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {item.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-fg">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={PRIMARY_CTA.href}
                variant={item.highlight ? "primary" : "ghost"}
                arrow="up-right"
                className="mt-9 w-full"
              >
                Start here
              </ButtonLink>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
