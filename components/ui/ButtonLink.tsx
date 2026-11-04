import type { ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  arrow?: "up-right" | "right";
  className?: string;
  onClick?: () => void;
};

const base =
  "group inline-flex h-[3.375rem] items-center justify-center gap-3 px-6 text-[0.9375rem] font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-200 ease-[var(--ease-out)]";

const variants = {
  // Solid cyan — the one primary action per screen.
  primary: "rounded-sm bg-accent px-[1.625rem] text-on-accent hover:bg-fg",
  // Thin cyan border — navbar CTA.
  outline:
    "rounded-md border border-accent/80 bg-bg/20 text-fg hover:border-accent hover:bg-accent hover:text-on-accent",
  // Thin light border — secondary action.
  ghost: "rounded-sm border border-fg/55 px-[1.625rem] text-fg hover:border-fg hover:bg-fg/[0.06]",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow,
  className = "",
  onClick,
}: ButtonLinkProps) {
  return (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && (
        <ArrowIcon
          direction={arrow}
          className={`size-3.5 transition-transform duration-200 ease-[var(--ease-out)] ${
            arrow === "up-right"
              ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              : "group-hover:translate-x-1"
          }`}
        />
      )}
    </a>
  );
}
