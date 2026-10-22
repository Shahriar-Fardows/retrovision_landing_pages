"use client";

import { useEffect, useRef } from "react";

// A soft ring that trails the pointer and grows over links and buttons.
// Mouse/trackpad only; the native cursor is never hidden.
export default function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ref.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!ring || !finePointer.matches || reducedMotion.matches) return;

    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const tick = () => {
      // Ease towards the pointer; stop the loop once it has caught up.
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      scale += (targetScale - scale) * 0.15;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(targetScale - scale) < 0.005;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!ring.dataset.visible) {
        // Appear under the pointer instead of flying in from the last position.
        x = tx;
        y = ty;
      }
      const interactive = (event.target as Element | null)?.closest("a, button, summary, input, select, textarea, label");
      targetScale = interactive ? 1.8 : 1;
      ring.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => delete ring.dataset.visible;

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] size-8 rounded-full border border-accent/60 opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
    />
  );
}
