"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animate direct children marked [data-reveal] one after another instead of the whole block. */
  stagger?: boolean;
  as?: "div" | "ul" | "ol";
};

// Section entrance: content rises 28px and fades in once, when it first scrolls
// into view. Content stays visible if JavaScript or motion is unavailable.
export default function Reveal({ children, className = "", stagger = false, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLUListElement & HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const targets = stagger ? ref.current.querySelectorAll(":scope > [data-reveal]") : ref.current;
      gsap.from(targets, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
