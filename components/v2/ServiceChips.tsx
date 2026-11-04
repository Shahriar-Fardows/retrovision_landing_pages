"use client";

import type { Service } from "@/data/content";
import { togglePick, usePicks } from "@/lib/selection";

// v2 merges "What we do" with the picker: each service is a toggle that adds it
// to the inquiry. The focus line shows as a tooltip on hover.
export default function ServiceChips({ services }: { services: readonly Service[] }) {
  const picks = usePicks();
  return (
    <ul className="mt-5 grid gap-2 border-t border-line pt-4">
      {services.map((service) => {
        const picked = picks.includes(service.name);
        return (
          <li key={service.name}>
            <button
              type="button"
              aria-pressed={picked}
              title={service.focus}
              onClick={() => togglePick(service.name)}
              className={`flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                picked
                  ? "border-accent bg-accent/15 text-fg"
                  : "border-line text-fg hover:border-fg/30"
              }`}
            >
              {service.name}
              <span aria-hidden="true" className={picked ? "text-accent-ink" : "text-fg-subtle"}>
                {picked ? "✓" : "+"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
