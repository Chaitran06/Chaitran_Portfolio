import { useEffect, useState } from "react";
import { FileText, Menu, Sparkles, X } from "lucide-react";
import { profile } from "../data/profile";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#match", label: "JD Match" },
  { href: "#journey", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export default function Nav({ chatOpen, onToggleChat }: { chatOpen: boolean; onToggleChat: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm font-medium text-white">
          <span className="text-ice-400">~/</span>chaitran
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-zinc-400 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost hidden !py-2 sm:inline-flex">
            <FileText className="h-4 w-4" /> Resume
          </a>
          <button onClick={onToggleChat} aria-pressed={chatOpen} className="btn-primary !py-2">
            <Sparkles className="h-4 w-4" /> {chatOpen ? "Hide AI chat" : "Ask my AI"}
          </button>
          <button onClick={() => setOpen(!open)} className="icon-btn md:hidden" aria-label="Toggle menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-zinc-800/80 px-5 py-3 md:hidden">
          {[...LINKS, { href: profile.resumeUrl, label: "Resume (PDF)" }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-zinc-300">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
