import { useEffect, useRef, useState } from "react";
import { Palette, X } from "lucide-react";

// Visitor-facing theme picker. Theme colours live in index.css; the list of
// valid ids is also in the inline script in index.html.
const THEMES = [
  { id: "light", label: "Clean Light", swatch: ["#f7f7f9", "#0891b2"] },
  { id: "hero", label: "Hero Red", swatch: ["#c1121f", "#f2b632"] },
] as const;

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking/tapping anywhere outside the panel, or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme-v3", theme);
  }, [theme]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-200 shadow-lg backdrop-blur"
        aria-label="Choose a theme"
      >
        <Palette className="h-5 w-5 text-ice-400" />
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className="fixed bottom-5 left-5 z-50 rounded-2xl border border-zinc-700 bg-zinc-900/90 p-3 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-2 flex items-center justify-between gap-6">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
          <Palette className="h-3.5 w-3.5" /> Theme
        </p>
        <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-zinc-200" aria-label="Hide theme picker">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTheme(t.id);
              setOpen(false);
            }}
            className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition ${
              theme === t.id ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
            }`}
          >
            <span
              className="h-4 w-4 shrink-0 rounded-full ring-1 ring-white/20"
              style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }}
            />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
