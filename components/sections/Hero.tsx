import type { CSSProperties } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SplitChars from "@/components/motion/SplitChars";
import HeroArtMotion from "@/components/visuals/HeroArtMotion";
import { HERO_COPY } from "@/data/content";
import { PRIMARY_CTA, SECTION_IDS } from "@/data/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const HERO_IMAGE = "/images/retro-vision-hero.png";

export default function Hero() {
  return (
    // Night-time key art: the hero stays dark in both themes.
    <section
      data-theme="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg text-fg"
    >
      {/* Full-bleed key art. Decorative: the headline carries the meaning. */}
      <div aria-hidden="true" className="enter-backdrop absolute inset-0 -z-20">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          // Framing for the centred layout. On desktop the right value depends on aspect
          // ratio, not width: the warrior stays clear of the headline and the animated
          // cape tip stays on screen. Percentages only — HeroArtMotion reads this value.
          className="object-cover object-[80%_100%] md:object-[68%_50%] xl:object-[60%_50%] xl:[@media(min-aspect-ratio:16/9)]:object-[40%_50%]"
        />
        <HeroArtMotion />
      </div>

      {/* Readability for centred copy: top-down on phones; from tablet up an ellipse
          darkens the middle behind the text while the warrior (right) and the dark
          cliffs (left) stay visible. Plus a soft top edge for the nav and a bottom
          fade into the next section. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(4_9_20/0.92)_0%,rgb(4_9_20/0.84)_52%,rgb(4_9_20/0.35)_78%,rgb(4_9_20/0.55)_100%)] md:bg-[radial-gradient(ellipse_62%_58%_at_50%_50%,rgb(4_9_20/0.9)_0%,rgb(4_9_20/0.72)_50%,rgb(4_9_20/0.22)_100%)] lg:bg-[radial-gradient(ellipse_50%_56%_at_50%_50%,rgb(4_9_20/0.88)_0%,rgb(4_9_20/0.66)_52%,rgb(4_9_20/0.12)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(4_9_20/0.55)_0%,transparent_20%,transparent_86%,rgb(5_10_20/0.9)_100%)]"
      />

      <Container className="flex flex-1 items-start pt-[calc(var(--header-h)+2rem)] pb-[34svh] text-center md:items-center md:pt-[var(--header-h)] md:pb-12 lg:pb-0">
        <div data-hero-focus className="flex w-full flex-col items-center">
          <p
            className="enter flex items-center justify-center gap-3.5 font-mono text-[11px] tracking-[0.13em] text-fg-muted uppercase sm:text-xs"
            style={delay(80)}
          >
            <span aria-hidden="true" className="hidden h-px w-[1.625rem] shrink-0 bg-accent sm:block" />
            Independent thinking. Unforgettable execution.
            <span aria-hidden="true" className="hidden h-px w-[1.625rem] shrink-0 bg-accent sm:block" />
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.125rem,9.4vw,2.625rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance md:mt-7 md:text-[clamp(2.25rem,4vw,4rem)]"
          >
            <SplitChars text="Games Deserve Greatness." delay={160} className="text-[#f1f5f9]" />
            <SplitChars text="We Make It Happen." delay={420} gradient={["#2aa8ef", "#7b5ce0", "#e6464f"]} />
          </h1>

          <p
            className="enter mt-5 max-w-[35rem] text-[1.0625rem] leading-[1.65] text-pretty text-fg-muted md:mt-6 md:text-[clamp(1.0625rem,1.08vw,1.1875rem)]"
            style={delay(760)}
          >
            {HERO_COPY}
          </p>

          <div
            className="enter mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-6"
            style={delay(880)}
          >
            <ButtonLink href={PRIMARY_CTA.href} arrow="up-right">
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href={`#${SECTION_IDS.work}`} variant="ghost" arrow="right">
              Explore Our Work
            </ButtonLink>
          </div>

          <div className="enter mt-9 w-full max-w-[31.25rem]" style={delay(980)}>
            <div aria-hidden="true" className="relative h-px bg-line">
              <span className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-accent" />
            </div>
            <p className="mx-auto mt-6 max-w-[27rem] font-mono text-xs leading-[1.9] tracking-[0.07em] text-fg-subtle uppercase">
              For indie developers, ambitious studios, and the next generation of games.
            </p>
          </div>
        </div>
      </Container>

      {/* Scroll cue — the one floating element, pointing at what's next. */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <a
          href="#about"
          className="enter flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase transition-colors hover:text-fg"
          style={delay(1200)}
        >
          Scroll
          <span className="bob flex h-9 w-5 justify-center rounded-full border border-fg/30 pt-1.5">
            <span className="h-2 w-px bg-accent" />
          </span>
        </a>
      </div>

      {/* Bottom hairline with travelling light — hands the eye to the next section. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-line">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className="glint absolute inset-y-0 w-1/5 bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)]"
            style={{ left: `${n * 25}%`, "--glint-delay": `${n * 800}ms` } as CSSProperties}
          />
        ))}
      </div>
    </section>
  );
}
