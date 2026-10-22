import type { CSSProperties } from "react";
import { MARQUEE_ITEMS } from "@/data/content";

function Row({ reverse = false, outlined = false }: { reverse?: boolean; outlined?: boolean }) {
  // Two identical copies; the track slides by exactly one copy, so the loop is seamless.
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    // The reversed row repeats the same words, so assistive tech reads only the first.
    <div aria-hidden={reverse || undefined} className="flex overflow-hidden">
      <ul
        className="marquee-track flex shrink-0 items-center"
        data-reverse={reverse}
        style={{ "--marquee-duration": "48s" } as CSSProperties}
      >
        {items.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= MARQUEE_ITEMS.length}
            className="flex shrink-0 items-center gap-8 pr-8 text-[clamp(1.75rem,3.6vw,3.25rem)] leading-none font-extrabold tracking-[-0.02em] uppercase"
          >
            <span
              className={
                outlined
                  ? "text-transparent [-webkit-text-stroke:1px_var(--color-fg-subtle)]"
                  : "text-fg"
              }
            >
              {item}
            </span>
            <span aria-hidden="true" className="size-2.5 rotate-45 bg-accent" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// What we do, as a moving band: a tight beat between the open hero and the about section.
export default function Marquee() {
  return (
    <section aria-label="What we do" className="border-y border-line bg-bg py-7 md:py-9">
      <div className="flex flex-col gap-4 md:gap-5">
        <Row />
        <Row reverse outlined />
      </div>
    </section>
  );
}
