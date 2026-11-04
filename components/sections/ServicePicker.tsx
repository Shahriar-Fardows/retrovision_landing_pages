"use client";

import ArrowIcon from "@/components/ui/ArrowIcon";
import { clearPicks, togglePick, usePicks } from "@/lib/selection";
import { SECTION_IDS } from "@/data/site";
import type { ServiceCategory } from "@/data/content";

// Toggle on a package card. The card itself reacts through :has([aria-pressed=true]).
export function PackagePick({ name, highlight }: { name: string; highlight: boolean }) {
  const picked = usePicks().includes(name);
  return (
    <button
      type="button"
      aria-pressed={picked}
      onClick={() => togglePick(name)}
      className={`mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold shadow-sm transition-colors duration-200 ${
        picked || highlight
          ? "bg-accent-strong text-on-accent-strong hover:bg-accent-strong-hover"
          : "border border-line-strong bg-surface text-fg hover:border-fg/40"
      }`}
    >
      {picked ? (
        <>
          <Tick />
          Selected
        </>
      ) : (
        "Select this package"
      )}
    </button>
  );
}

// "Or build your own": the sixteen services as toggles, grouped by discipline.
export function ServiceGrid({ categories }: { categories: readonly ServiceCategory[] }) {
  const picks = usePicks();
  return (
    <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <fieldset key={category.id}>
          <legend className="flex items-center gap-2.5 font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">
            <span className="text-accent-ink">{category.index}</span>
            {category.title}
          </legend>
          <ul className="mt-4 flex flex-wrap gap-2">
            {category.services.map((service) => {
              const picked = picks.includes(service.name);
              return (
                <li key={service.name}>
                  <button
                    type="button"
                    aria-pressed={picked}
                    onClick={() => togglePick(service.name)}
                    className={`inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm transition-colors duration-200 ${
                      picked
                        ? "border-accent bg-accent/15 text-fg"
                        : "border-line-strong text-fg-muted hover:border-fg/40 hover:text-fg"
                    }`}
                  >
                    {picked ? <Tick /> : <span aria-hidden="true" className="text-fg-subtle">+</span>}
                    {service.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}

// Running total with the way forward to the inquiry form.
export function PickSummary() {
  const picks = usePicks();
  return (
    <div
      className="mt-10 flex flex-col gap-4 rounded-xl border border-line-strong bg-bg p-5 sm:flex-row sm:items-center sm:justify-between md:px-6"
    >
      <p role="status" aria-live="polite" className="text-fg-muted">
        {picks.length ? (
          <>
            <span className="font-semibold text-fg">{picks.length} selected</span> — {picks.join(", ")}
          </>
        ) : (
          "Pick a package, single services, or both. Not sure? Skip this and tell us in the form."
        )}
      </p>
      <div className="flex shrink-0 items-center gap-4">
        {picks.length > 0 && (
          <button type="button" onClick={clearPicks} className="text-sm text-fg-muted underline underline-offset-4 hover:text-fg">
            Clear
          </button>
        )}
        <a
          href={`#${SECTION_IDS.projectInquiry}`}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent-strong px-6 text-sm font-semibold text-on-accent-strong shadow-sm transition-colors duration-200 hover:bg-accent-strong-hover"
        >
          Continue to inquiry
          <ArrowIcon direction="right" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="size-3.5 shrink-0">
      <path d="m3 8.5 3.2 3L13 4.5" />
    </svg>
  );
}
