import { useEffect } from "react";

/**
 * Pointer-driven effects: a soft page spotlight that follows the cursor, and a
 * glow inside whichever card the cursor is over (see .card::before in index.css).
 * Disabled on touch devices and for users who prefer reduced motion.
 */
export default function MouseEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const root = document.documentElement;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
        document.querySelectorAll<HTMLElement>(".card").forEach((card) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--x", `${e.clientX - r.left}px`);
          card.style.setProperty("--y", `${e.clientY - r.top}px`);
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    root.classList.add("has-spotlight");
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      root.classList.remove("has-spotlight");
    };
  }, []);

  return <div aria-hidden="true" className="spotlight pointer-events-none fixed inset-0 z-0" />;
}
