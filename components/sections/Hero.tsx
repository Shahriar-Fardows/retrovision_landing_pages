import type { CSSProperties } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { HERO } from "@/data/content";
import { SECTION_IDS } from "@/data/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

// Mirrors the main site's hero: ink panel, drifting key art, two veils, grain and a
// slow passing sheen; copy sits bottom-left on phones and centre-left on desktop.
export default function Hero() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="hero-title"
      className="relative min-h-[min(850px,92svh)] overflow-hidden bg-ink text-fg"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/site/home-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-hero-ambient object-cover object-[76%_center] sm:object-[62%_center]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/5" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-paper/15" />
      <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="animate-hero-veil absolute inset-y-0 -inset-x-[8%] bg-[linear-gradient(105deg,transparent_15%,oklch(100%_0_0/0.12)_45%,transparent_72%)] opacity-20"
      />

      <div className="relative mx-auto flex min-h-[min(850px,92svh)] max-w-7xl items-end px-6 pt-32 pb-20 lg:items-center lg:pt-28 lg:pb-10">
        <div className="max-w-4xl">
          <p
            className="enter inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-fg/70 uppercase"
            style={delay(60)}
          >
            <span aria-hidden="true" className="inline-block size-[0.55rem] bg-accent-red" />
            {HERO.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="enter mt-6 max-w-4xl text-5xl leading-[0.94] font-bold tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-[5.7rem]"
            style={delay(140)}
          >
            Your game
            <br />
            also{" "}
            <span className="text-anaglyph">
              deserves
              <br />
              the spotlight.
            </span>
          </h1>
          <p
            className="enter description-rail description-rail-paper mt-7 max-w-2xl text-lg leading-relaxed text-fg/80 md:text-xl"
            style={delay(260)}
          >
            {HERO.copy}
          </p>
          <div className="enter mt-9 flex flex-wrap items-center gap-4" style={delay(360)}>
            <ButtonLink href={`#${SECTION_IDS.packages}`} variant="paper">
              {HERO.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
