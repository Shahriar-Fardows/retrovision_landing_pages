"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ServiceCategory } from "@/data/content";

// WAI-ARIA tabs: one category visible at a time, arrow keys move between tabs,
// Home/End jump to the ends. Every panel stays in the DOM (hidden), so all
// sixteen services remain crawlable.
export default function ServiceTabs({ categories }: { categories: readonly ServiceCategory[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + categories.length) % categories.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowDown: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(categories.length - 1),
    };
    if (keys[event.key]) {
      event.preventDefault();
      keys[event.key]();
    }
  };

  return (
    <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
      <div
        role="tablist"
        aria-label="Service categories"
        aria-orientation="vertical"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {categories.map((category, i) => {
          const selected = i === active;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${category.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`group relative flex shrink-0 items-baseline gap-4 rounded-sm border px-5 py-4 text-left transition-colors duration-200 lg:border-0 lg:border-l-2 lg:px-6 lg:py-5 ${
                selected
                  ? "border-accent bg-surface text-fg lg:border-l-accent"
                  : "border-line-strong text-fg-muted hover:text-fg lg:border-l-line-strong"
              }`}
            >
              <span className={`font-mono text-xs ${selected ? "text-accent-ink" : "text-fg-subtle"}`}>
                {category.index}
              </span>
              <span className="font-display text-lg font-bold whitespace-nowrap lg:text-xl lg:whitespace-normal">
                {category.title}
              </span>
            </button>
          );
        })}
      </div>

      {categories.map((category, i) => (
        <div
          key={category.id}
          id={`panel-${category.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${category.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="outline-none lg:col-span-8"
        >
          <p className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] leading-snug font-bold text-balance text-fg">
            “{category.tagline}”
          </p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong sm:grid-cols-2">
            {category.services.map((service) => (
              <li key={service.name} className="flex flex-col bg-bg p-6">
                <h4 className="font-display text-lg font-bold text-fg">{service.name}</h4>
                <p className="mt-2 flex-1 leading-[1.6] text-fg-muted">{service.focus}</p>
                <ul aria-label={`${service.name} options`} className="mt-5 flex flex-wrap gap-2">
                  {service.variants.map((variant) => (
                    <li
                      key={variant}
                      className="rounded-xs border border-line-strong px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                    >
                      {variant}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
