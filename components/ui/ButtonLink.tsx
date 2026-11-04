import type { ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "paper";
  /** Trailing → that nudges right on hover, as on the main site. */
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

// The main site's button set: 10px-radius blocks, a blue pill in the navbar.
const base =
  "group inline-flex items-center justify-center gap-2 text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-200 ease-[var(--ease-out)] motion-safe:active:translate-y-px";

const variants = {
  // Blue block — the one primary action per screen.
  primary: "h-12 rounded-md bg-accent-strong px-6 text-on-accent-strong shadow-sm hover:bg-accent-strong-hover",
  // Blue pill — navbar call to action.
  outline: "h-10 rounded-full bg-accent-strong px-5 text-on-accent-strong hover:bg-accent-strong-hover",
  // Quiet block — secondary action on either theme.
  ghost: "h-12 rounded-md border border-line-strong bg-surface px-6 text-fg shadow-sm hover:border-fg/40",
  // White block — secondary action on dark art.
  paper: "h-12 rounded-md bg-paper px-6 text-ink shadow-sm hover:bg-[oklch(94%_0.01_240)]",
};

export default function ButtonLink({ href, children, variant = "primary", arrow = false, className = "", onClick }: ButtonLinkProps) {
  return (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && (
        <ArrowIcon
          direction="right"
          className="size-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
