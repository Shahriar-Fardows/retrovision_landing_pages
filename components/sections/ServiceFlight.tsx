"use client";

import { useRef } from "react";
import type { ServiceCategory } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

// "What we do" as a flight path: a rocket travels down the centre rail with the
// scroll while each row's two disciplines slide in from opposite sides. Everything
// is scrubbed, so scrolling back reverses it. Phones: rail on the left, cards from
// the right. Reduced motion: no movement, everything visible.
export default function ServiceFlight({ categories }: { categories: readonly ServiceCategory[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const board = root.current!;
          const rail = board.querySelector<HTMLElement>("[data-rail]")!;

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: board, start: "top 70%", end: "bottom 65%", scrub: 0.6, invalidateOnRefresh: true },
            })
            .fromTo("[data-rail-fill]", { scaleY: 0 }, { scaleY: 1 }, 0)
            .fromTo("[data-rocket]", { y: 0 }, { y: () => rail.offsetHeight - 56 }, 0);

          board.querySelectorAll<HTMLElement>("[data-card]").forEach((card, i) => {
            const fromLeft = desktop && i % 2 === 0;
            gsap.fromTo(
              card,
              { x: desktop ? (fromLeft ? -160 : 160) : 80, rotate: desktop ? (fromLeft ? -4 : 4) : 2, opacity: 0 },
              {
                x: 0,
                rotate: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 92%", end: "top 55%", scrub: 0.6 },
              },
            );
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mt-14 md:mt-20">
      {/* Flight path: faint track, a brand-gradient trail that grows with the scroll, the rocket at its tip. */}
      <div
        data-rail
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-5 w-0.5 bg-line-strong lg:left-1/2 lg:-translate-x-1/2"
      >
        <div
          data-rail-fill
          className="absolute inset-0 origin-top bg-[linear-gradient(180deg,var(--color-accent),var(--color-accent-violet),var(--color-accent-red))]"
        />
        <div data-rocket className="absolute top-0 left-1/2 w-10 -translate-x-1/2">
          <Rocket />
        </div>
      </div>

      <ol className="grid gap-6 pl-12 lg:grid-cols-2 lg:gap-x-32 lg:gap-y-16 lg:pl-0">
        {categories.map((category, i) => (
          <li
            key={category.id}
            data-card
            className="flex flex-col rounded-xl border border-line-strong bg-surface p-6 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)] sm:p-8 xl:p-10"
          >
            <div className="flex items-center justify-between gap-4 font-mono text-xs">
              <span className="flex items-center gap-3 text-fg-subtle">
                <span aria-hidden="true" className={`size-2.5 ${i % 2 ? "bg-accent-red" : "bg-accent"}`} />
                {category.index}
              </span>
              <span className="text-fg-subtle">{category.services.length} services</span>
            </div>
            <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-bold tracking-[-0.02em] text-fg">
              {category.title}
            </h3>
            <p className="mt-2 max-w-md text-fg-muted">{category.tagline}</p>

            <ul className="mt-8 border-t border-line">
              {category.services.map((service) => (
                <li
                  key={service.name}
                  className="grid gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
                >
                  <span className="font-semibold text-fg">{service.name}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-fg-muted">{service.focus}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Nose down, flame trailing up the path behind it. Body follows the theme's ink,
// fins and flame take the logo's red.
function Rocket() {
  return (
    <svg viewBox="0 0 40 64" className="h-14 w-10 rotate-180 drop-shadow-[0_0_10px_oklch(62%_0.16_235/0.55)]">
      <g className="rocket-flame">
        <path d="M14.5 47 Q20 66 25.5 47Z" fill="var(--color-accent-red)" />
        <path d="M17 47 Q20 58 23 47Z" fill="oklch(84% 0.15 80)" />
      </g>
      <path d="M10 34 3 47l7-2.5Z M30 34l7 13-7-2.5Z" fill="var(--color-accent-red)" />
      <path d="M20 2c8 8 10 20 10 32v12H10V34C10 22 12 10 20 2Z" fill="var(--color-fg)" />
      <rect x="14" y="45.5" width="12" height="3" rx="1" fill="var(--color-fg-muted)" />
      <circle cx="20" cy="22" r="4.5" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="1.5" />
    </svg>
  );
}
