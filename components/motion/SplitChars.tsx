import type { CSSProperties } from "react";

type SplitCharsProps = {
  text: string;
  /** ms before the first character starts */
  delay?: number;
  /** ms between characters */
  stagger?: number;
  /** Optional left→right colour ramp; a single gradient can't span split characters. */
  gradient?: [string, string];
  className?: string;
};

function mix(a: string, b: string, t: number) {
  const pa = a.match(/\w\w/g)!.map((h) => parseInt(h, 16));
  const pb = b.match(/\w\w/g)!.map((h) => parseInt(h, 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(" ")})`;
}

// Splits a line into characters for the hero's staggered rise (CSS only, see
// .split-char in globals.css). Screen readers get the plain sentence; words stay
// unbreakable so the line still wraps naturally on small screens.
export default function SplitChars({ text, delay = 0, stagger = 26, gradient, className = "" }: SplitCharsProps) {
  const words = text.split(" ");
  const total = text.replace(/ /g, "").length;
  let index = 0;

  return (
    <span className={`block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="split-line">
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char) => {
                const i = index++;
                const style = {
                  "--char-delay": `${delay + i * stagger}ms`,
                  ...(gradient && { color: mix(gradient[0], gradient[1], total > 1 ? i / (total - 1) : 0) }),
                } as CSSProperties;
                return (
                  <span key={i} className="split-char" style={style}>
                    {char}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  );
}
