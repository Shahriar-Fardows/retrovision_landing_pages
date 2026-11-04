"use client";

import { useRef } from "react";
import type { ServiceCategory } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

const ROCKET_H = 56;

// "What we do" as a mission: a rocket travels down the centre rail with the scroll,
// and each discipline is a checkpoint — a card on alternating sides, joined to the
// rail by a node. The card slides in from its own side; when the rocket reaches
// the node, the checkpoint lights up. Everything is scrubbed, so scrolling back
// reverses it. Phones: rail on the left, cards on the right. Reduced motion: no
// movement, every checkpoint shown lit.
export default function ServiceFlight({ categories }: { categories: readonly ServiceCategory[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const board = root.current!;
      const rail = board.querySelector<HTMLElement>("[data-rail]")!;
      const rocket = board.querySelector<HTMLElement>("[data-rocket]")!;
      const checkpoints = [...board.querySelectorAll<HTMLElement>("[data-checkpoint]")];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        checkpoints.forEach((cp) => cp.setAttribute("data-lit", ""));
      });

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };

          // Light every checkpoint whose node the rocket's nose has reached.
          const lightUp = () => {
            const nose = rail.getBoundingClientRect().top + Number(gsap.getProperty(rocket, "y")) + ROCKET_H;
            checkpoints.forEach((cp) => {
              const node = cp.querySelector<HTMLElement>("[data-node]")!.getBoundingClientRect();
              cp.toggleAttribute("data-lit", nose >= node.top + node.height / 2);
            });
          };

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: board,
                start: "top 70%",
                end: "bottom 65%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
              onUpdate: lightUp,
            })
            .fromTo("[data-rail-fill]", { scaleY: 0 }, { scaleY: 1 }, 0)
            .fromTo(rocket, { y: 0 }, { y: () => rail.offsetHeight - ROCKET_H }, 0);

          checkpoints.forEach((cp, i) => {
            const fromLeft = desktop && i % 2 === 0;
            gsap.fromTo(
              cp.querySelector("[data-card]"),
              { x: desktop ? (fromLeft ? -140 : 140) : 70, rotate: desktop ? (fromLeft ? -3 : 3) : 2, opacity: 0 },
              {
                x: 0,
                rotate: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: { trigger: cp, start: "top 90%", end: "top 55%", scrub: 0.6 },
              },
            );
          });

          return () => checkpoints.forEach((cp) => cp.removeAttribute("data-lit"));
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
        <div data-rocket className="absolute top-0 left-1/2 z-10 w-10 -translate-x-1/2">
          <Rocket />
        </div>
      </div>

      <ol className="flex flex-col gap-10 pl-14 lg:gap-0 lg:pl-0">
        {categories.map((category, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={category.id}
              data-checkpoint
              // Desktop zigzag: each card takes one half and overlaps the one before it.
              className={`group/cp relative lg:w-[calc(50%-4.5rem)] ${left ? "lg:self-start" : "lg:self-end"} ${i > 0 ? "lg:-mt-24" : ""}`}
            >
              {/* Connector and node on the rail. */}
              <span
                aria-hidden="true"
                className={`absolute top-12 right-full h-px w-9 bg-line-strong transition-colors duration-500 group-data-[lit]/cp:bg-accent ${
                  left ? "lg:right-auto lg:left-full lg:w-[4.5rem]" : "lg:w-[4.5rem]"
                }`}
              >
                <span
                  data-node
                  className={`absolute top-1/2 left-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-line-strong bg-bg transition-[background-color,border-color,box-shadow] duration-500 ${
                    left ? "lg:right-0 lg:left-auto lg:translate-x-1/2" : ""
                  } ${
                    i % 2
                      ? "group-data-[lit]/cp:border-accent-red group-data-[lit]/cp:bg-accent-red group-data-[lit]/cp:shadow-[0_0_0_6px_oklch(62%_0.22_25/0.18)]"
                      : "group-data-[lit]/cp:border-accent group-data-[lit]/cp:bg-accent group-data-[lit]/cp:shadow-[0_0_0_6px_oklch(62%_0.16_235/0.2)]"
                  }`}
                />
              </span>

              <article
                data-card
                className="rounded-xl border border-line-strong bg-surface p-6 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)] transition-[border-color] duration-500 group-data-[lit]/cp:border-accent/60 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">Checkpoint {category.index}</p>
                    <h3 className="mt-3 text-[clamp(1.5rem,2.3vw,1.875rem)] leading-tight font-bold tracking-[-0.02em] text-fg">
                      {category.title}
                    </h3>
                  </div>
                  <span aria-hidden="true" className="checkpoint-num font-display text-6xl leading-none font-bold">
                    {category.index}
                  </span>
                </div>
                <p className="mt-3 text-fg-muted">{category.tagline}</p>

                <ul className="mt-6 grid gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
                  {category.services.map((service) => (
                    <li key={service.name}>
                      <p className="flex items-center gap-2 font-semibold text-fg">
                        <span aria-hidden="true" className={`size-1.5 rotate-45 ${i % 2 ? "bg-accent-red" : "bg-accent"}`} />
                        {service.name}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{service.focus}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
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
