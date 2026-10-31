import { useEffect, useRef } from "react";

/**
 * Page background: slowly drifting glows in the theme colours, a fine film
 * grain, and a thin scroll-progress bar along the top edge.
 */
export default function Backdrop() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb orb-1 bg-ice-500/25" />
        <div className="orb orb-2 bg-gold/10" />
        <div className="orb orb-3 bg-ice-400/15" />
        <div className="grain absolute inset-0" />
      </div>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-ice-500 via-ice-300 to-gold shadow-[0_0_12px_rgb(var(--glow)/0.8)]"
      />
    </>
  );
}
