import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

// Mono label with a cyan rule, then the section title — the same voice as the
// hero eyebrow, so every section reads as part of one system.
export default function SectionHeading({ id, label, title, intro, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p
        className={`flex items-center gap-3.5 font-mono text-xs tracking-[0.13em] text-fg-muted uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true" className="h-px w-[1.625rem] shrink-0 bg-accent" />
        {label}
      </p>
      <h2
        id={id}
        className="mt-5 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance text-fg"
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-[1.0625rem] leading-[1.65] text-pretty text-fg-muted ${centered ? "mx-auto" : ""} max-w-xl`}>
          {intro}
        </p>
      )}
    </div>
  );
}
