"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type ScrollFillTextProps = {
  text: string;
  className?: string;
};

// A statement whose words light up from dim to full as it scrolls through the
// viewport — reading pace follows the reader's own scroll.
export default function ScrollFillText({ text, className = "" }: ScrollFillTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll("[data-word]"),
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} data-word className="inline">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
