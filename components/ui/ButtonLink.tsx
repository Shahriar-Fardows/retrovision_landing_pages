import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "paper" | "pill" | "text";
  className?: string;
  onClick?: () => void;
  external?: boolean;
  /** Label left, arrow right (full-width card buttons). */
  spread?: boolean;
};

// The main site's button set: 10px-radius blocks, a pill in the navbar, and an
// arrow that nudges right on hover.
const variants = {
  // Blue block — used on light sections.
  primary:
    "h-12 rounded-md bg-accent-strong px-6 text-sm text-on-accent shadow-sm hover:bg-[oklch(46%_0.14_238)]",
  // White block — used on dark panels and the hero.
  paper: "h-12 rounded-md bg-paper px-6 text-sm text-ink shadow-sm hover:bg-[oklch(94%_0.01_240)]",
  // Navbar call to action.
  pill: "h-9 rounded-full bg-accent-strong px-4 text-sm text-on-accent hover:bg-[oklch(46%_0.14_238)]",
  // Inline "Explore …" links.
  text: "text-sm text-fg hover:text-accent-ink",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  external = false,
  spread = false,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group inline-flex items-center ${spread ? "justify-between" : "justify-center"} gap-2 font-semibold whitespace-nowrap transition-[color,background-color,transform] duration-200 motion-safe:active:translate-y-px ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}
