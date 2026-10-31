import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "left" | "zoom";

/**
 * Animates its children in whenever they scroll into view, and resets them when
 * they leave, so the animation replays each time the section is revisited.
 * up: rise + un-blur · left: slide in from the left · zoom: springy pop.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
      rootMargin: "0px 0px -8% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`reveal-on-scroll reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
