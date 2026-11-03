import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { Compass, Key, Layers, Scale, UserCheck } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WHY_INTRO, WHY_POINTS } from "@/data/content";
import { SECTION_IDS } from "@/data/site";

const ICONS = { user: UserCheck, layers: Layers, scale: Scale, compass: Compass, key: Key } as const;
const TONE = {
  blue: { sig: "var(--color-accent)", chip: "border-accent/35 text-accent-ink", hover: "hover:border-accent/50 hover:shadow-[var(--shadow-card-glow-blue)]" },
  red: { sig: "var(--color-accent-red)", chip: "border-accent-red/35 text-accent-red", hover: "hover:border-accent-red/50 hover:shadow-[var(--shadow-card-glow-red)]" },
} as const;

// "Why choose Retro_Vision": three cards over two, each with an icon chip.
export default function Why() {
  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-paper pt-10 pb-20 md:pt-12 md:pb-24"
    >
      <div aria-hidden="true" className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent_0%,#000_35%)]">
        <Image
          src="/images/site/invested-partnership.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-[0.14] grayscale [mask-image:linear-gradient(90deg,transparent_35%,#000_80%)]"
        />
      </div>
      <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-15" />

      <Container className="relative">
        <Eyebrow>Why choose Retro_Vision</Eyebrow>
        <h2 id="why-title" className="mt-5 text-4xl leading-[1.02] font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          Completely invested
          <br />
          in&nbsp;seeing <span className="highlight-blue whitespace-nowrap">the outcome.</span>
        </h2>
        <p className="description-rail mt-6 max-w-xl leading-relaxed text-fg-muted">{WHY_INTRO}</p>

        <Reveal stagger as="ul" className="mt-12 grid gap-4 lg:grid-cols-6">
          {WHY_POINTS.map((point, i) => {
            const Icon = ICONS[point.icon];
            const tone = TONE[point.tone];
            return (
              <li
                key={point.title}
                data-reveal
                data-theme="dark"
                style={{ "--sig": tone.sig, "--sig-x": "50%" } as CSSProperties}
                className={`card-signal overflow-hidden rounded-xl border border-line bg-ink p-6 text-fg shadow-[var(--shadow-depth)] transition duration-500 motion-safe:hover:-translate-y-1 ${tone.hover} ${
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-md border bg-ink/90 ${tone.chip}`}>
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-xl font-bold">{point.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg/65">{point.body}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
