"use client";

import { useRef } from "react";
import { PROCESS } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

// The process timeline, switched on step by step with the scroll: a brand-gradient
// fill runs along the rule (across on desktop, down on phones) and each step goes
// active once the fill reaches its marker. Scrubbed, so scrolling back switches
// steps off again. Reduced motion: every step shown active.
export default function ProcessTimeline() {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = root.current!;
      const steps = [...list.querySelectorAll<HTMLElement>("[data-step]")];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        steps.forEach((step) => step.setAttribute("data-active", ""));
      });

      mm.add(
        {
          wide: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { wide } = context.conditions as { wide: boolean };
          const fill = list.querySelector<HTMLElement>(wide ? "[data-fill-x]" : "[data-fill-y]")!;

          // A step is active once the fill's leading edge has passed its marker's centre.
          const activate = () => {
            const edge = fill.getBoundingClientRect();
            steps.forEach((step) => {
              const marker = step.querySelector<HTMLElement>("[data-marker]")!.getBoundingClientRect();
              const reached = wide
                ? edge.right >= marker.left + marker.width / 2
                : edge.bottom >= marker.top + marker.height / 2;
              step.toggleAttribute("data-active", reached);
            });
          };

          gsap.fromTo(
            fill,
            wide ? { scaleX: 0 } : { scaleY: 0 },
            {
              ...(wide ? { scaleX: 1 } : { scaleY: 1 }),
              ease: "none",
              scrollTrigger: {
                trigger: list,
                start: wide ? "top 80%" : "top 75%",
                end: wide ? "top 30%" : "bottom 55%",
                scrub: 0.5,
              },
              onUpdate: activate,
            },
          );

          return () => steps.forEach((step) => step.removeAttribute("data-active"));
        },
      );
    },
    { scope: root },
  );

  return (
    // A timeline: one rule runs through every step's marker.
    <ol ref={root} className="relative mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
      <span aria-hidden="true" className="absolute top-[5px] left-0 hidden h-px w-full bg-line-strong md:block">
        <span
          data-fill-x
          className="absolute inset-0 origin-left bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-violet),var(--color-accent-red))]"
        />
      </span>
      <span aria-hidden="true" className="absolute top-0 left-[5px] h-full w-px bg-line-strong md:hidden">
        <span
          data-fill-y
          className="absolute inset-0 origin-top bg-[linear-gradient(180deg,var(--color-accent),var(--color-accent-violet),var(--color-accent-red))]"
        />
      </span>
      {PROCESS.map((item) => (
        <li
          key={item.step}
          data-step
          className="group/step relative translate-y-2 pl-8 opacity-55 transition-[opacity,translate] duration-500 ease-[var(--ease-out)] data-[active]:translate-y-0 data-[active]:opacity-100 md:pl-0"
        >
          <span
            data-marker
            aria-hidden="true"
            className="absolute top-0 left-0 size-[11px] rotate-45 border border-line-strong bg-bg transition-[background-color,border-color,box-shadow,scale] duration-500 group-data-[active]/step:border-accent group-data-[active]/step:bg-accent group-data-[active]/step:scale-125 group-data-[active]/step:shadow-[0_0_0_5px_oklch(62%_0.16_235/0.2)] md:static md:block"
          />
          <p className="font-mono text-xs text-fg-subtle uppercase transition-colors duration-500 group-data-[active]/step:text-accent-ink md:mt-7">
            {item.step} · {item.owner}
          </p>
          <h3 className="mt-2 text-xl font-bold text-fg-subtle transition-colors duration-500 group-data-[active]/step:text-fg">
            {item.title}
          </h3>
          <p className="mt-3 leading-[1.65] text-fg-subtle transition-colors duration-500 group-data-[active]/step:text-fg-muted">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
