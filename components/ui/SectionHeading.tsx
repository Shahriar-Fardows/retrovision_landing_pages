import type { ReactNode } from "react";

// Red square + mono label above every section title, as on the main site.
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase ${className}`}>
      <span aria-hidden="true" className="inline-block size-2.5 bg-accent-red" />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  id: string;
  label: string;
  title: ReactNode;
  /** Short paragraph set beside the title on a coloured rail. */
  aside?: ReactNode;
  railTone?: "blue" | "red" | "paper";
  className?: string;
};

// Title on the left, optional rail paragraph on the right — the main site's
// section header. Wrap the key phrase of `title` in .highlight-* or .text-anaglyph.
export default function SectionHeading({ id, label, title, aside, railTone = "blue", className = "" }: SectionHeadingProps) {
  const rail = { blue: "", red: "description-rail-red", paper: "description-rail-paper" }[railTone];
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        <Eyebrow>{label}</Eyebrow>
        <h2 id={id} className="mt-5 text-4xl leading-[1.02] font-bold tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      {aside && (
        <div className="lg:col-span-5 lg:justify-self-end">
          <div className={`description-rail ${rail} max-w-sm leading-relaxed text-fg-muted`}>{aside}</div>
        </div>
      )}
    </div>
  );
}
