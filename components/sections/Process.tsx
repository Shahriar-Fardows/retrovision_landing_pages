import type { CSSProperties } from "react";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PROCESS } from "@/data/content";

// Each step shifts from brand blue towards brand red along the timeline.
const stepColor = (i: number, total: number) =>
  `color-mix(in oklab, var(--color-accent-red) ${Math.round((i / (total - 1)) * 100)}%, var(--color-accent))`;

// "What happens next": a four-stop timeline on a fine plus-grid.
export default function Process() {
  return (
    <section aria-labelledby="process-title" className="relative isolate overflow-hidden bg-paper pt-20 pb-10 md:pt-24 md:pb-12">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(93%_0.04_235/0.7),transparent_55%),radial-gradient(ellipse_at_right,oklch(94%_0.05_25/0.6),transparent_55%)]" />
      <div aria-hidden="true" className="bg-plus-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[oklch(25%_0.03_240/0.35)] to-transparent" />
      <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-15" />

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>What happens next</Eyebrow>
            <h2 id="process-title" className="mt-5 text-4xl leading-[1.02] font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              A short path from
              <br />
              question to a
              <br />
              <span className="highlight-blue whitespace-nowrap">clear decision.</span>
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-accent-red/30 bg-[oklch(94%_0.05_25)] px-3 py-1.5 text-xs font-semibold text-fg lg:self-auto">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-red" />
            No obligation until you accept the scope
          </p>
        </div>

        <Reveal stagger as="ol" className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute top-[7px] left-2 hidden h-0.5 w-[calc(75%+0.5rem)] bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-red))] md:block"
          />
          <span
            aria-hidden="true"
            className="absolute top-2 left-[7px] h-[calc(100%-2rem)] w-0.5 bg-[linear-gradient(180deg,var(--color-accent),var(--color-accent-red))] md:hidden"
          />
          {PROCESS.map((item, i) => {
            const color = stepColor(i, PROCESS.length);
            return (
              <li key={item.step} data-reveal className="relative flex flex-col pl-9 md:pt-9 md:pl-0" style={{ "--step": color } as CSSProperties}>
                <span aria-hidden="true" className="absolute top-0 left-0 z-10 size-4 rounded-full bg-[var(--step)] ring-4 ring-paper" />
                <p className="font-mono text-[10px] tracking-[0.18em] text-[color-mix(in_oklab,var(--step)_80%,black)] uppercase">
                  {item.step} · {item.owner}
                </p>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:min-h-24">{item.body}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
