import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

// The main site's section header: red square + mono label, the title (wrap its key
// phrase in .highlight-* or .text-anaglyph), and an intro on a blue rail.
export default function SectionHeading({ id, label, title, intro, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p
        className={`flex items-center gap-3 font-mono text-xs tracking-[0.13em] text-fg-muted uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true" className="inline-block size-2.5 shrink-0 bg-accent-red" />
        {label}
      </p>
      <h2
        id={id}
        className="mt-5 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance text-fg"
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-[1.0625rem] leading-[1.65] text-pretty text-fg-muted ${centered ? "mx-auto" : "description-rail"} max-w-xl`}>
          {intro}
        </p>
      )}
    </div>
  );
}
