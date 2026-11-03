import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PACKAGES, PACKAGES_NOTE } from "@/data/content";
import { MAIN_SITE, PRIMARY_CTA, SECTION_IDS } from "@/data/site";

// "Where to start": three illustrated package cards on the ink panel. Pricing is
// scoped per project, so no price tags.
export default function Packages() {
  return (
    <section
      id={SECTION_IDS.packages}
      data-theme="dark"
      aria-labelledby="packages-title"
      className="relative overflow-hidden bg-ink py-20 text-fg md:py-28"
    >
      <div aria-hidden="true" className="bg-line-field absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(62%_0.16_235/0.18),transparent_60%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[oklch(25%_0.03_240)] to-transparent" />

      <Container className="relative">
        <SectionHeading
          id="packages-title"
          label="Where to start"
          title={
            <>
              Pick the moment <br />
              <span className="text-anaglyph">you are standing in.</span>
            </>
          }
          aside={PACKAGES_NOTE}
          railTone="paper"
        />

        <Reveal stagger as="ul" className="mt-12 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((item) => (
            <li
              key={item.name}
              data-reveal
              className={`group relative flex min-w-0 flex-col overflow-hidden rounded-xl border bg-paper/5 shadow-[var(--shadow-card)] transition duration-500 motion-safe:hover:-translate-y-1 ${
                item.highlight
                  ? "border-accent-red/60 shadow-[var(--shadow-glow-red)]"
                  : "border-line-strong hover:border-accent/60 hover:shadow-[var(--shadow-glow-blue)]"
              }`}
            >
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image
                  src={`/images/site/${item.image}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />
                <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.16em] text-fg/85 uppercase">
                  {item.duration}
                </span>
                {item.highlight && (
                  <span className="absolute top-3 right-3 rounded-sm bg-accent-red px-2 py-1 font-mono text-[9px] font-semibold tracking-[0.12em] text-white uppercase">
                    Most common start
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <p className="font-mono text-[9px] tracking-[0.16em] text-accent-ink uppercase">{item.stage}</p>
                <h3 className="mt-2 text-xl font-bold lg:text-2xl">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg/65 md:min-h-[6.5rem] lg:min-h-[4.5rem]">
                  {item.summary}
                </p>
                <div className="mt-5 flex-1 border-t border-line pt-4">
                  <p className="font-mono text-[9px] tracking-[0.16em] text-fg/50 uppercase">Included scope</p>
                  <ul className="mt-3 grid gap-2">
                    {item.includes.map((line) => (
                      <li key={line} className="flex gap-2 text-xs leading-snug text-fg/75">
                        <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-red" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink href={PRIMARY_CTA.href} variant="paper" spread className="mt-6 w-full">
                  Start here
                </ButtonLink>
              </div>
            </li>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <ButtonLink href={`#${SECTION_IDS.scope}`} variant="text">
            See every service we offer
          </ButtonLink>
          <ButtonLink href={`${MAIN_SITE}/services#packages`} variant="text" external>
            Compare package details
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
