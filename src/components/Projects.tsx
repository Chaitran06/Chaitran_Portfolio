import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { profile, type Project, type ProjectCategory } from "../data/profile";
import { GithubIcon } from "./icons";
import Reveal from "./Reveal";
import Section from "./Section";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Research", "GenAI", "Deep Learning", "Full-stack"];

type Opened = { project: Project; dx: number; dy: number };

export default function Projects({ onAskAI }: { onAskAI: (q: string) => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [opened, setOpened] = useState<Opened | null>(null);
  const visible = profile.projects.filter((p) => filter === "All" || p.category === filter);

  const open = (project: Project, el: HTMLElement) => {
    // The window "zooms out" of the folder: its animation starts at the folder's position.
    const r = el.getBoundingClientRect();
    setOpened({
      project,
      dx: r.left + r.width / 2 - window.innerWidth / 2,
      dy: r.top + r.height / 2 - window.innerHeight / 2,
    });
  };

  return (
    <Section
      id="projects"
      index="02. projects"
      title="Things I've built"
      subtitle="Each folder is a project. Open one to see what I built, the results and the stack."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition ${
              filter === f ? "bg-white text-zinc-950" : "border border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card px-4 py-8 sm:px-8 sm:py-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
          {visible.map((p, i) => (
            <Reveal key={`${filter}-${p.id}`} delay={i * 70} variant="zoom">
              <FolderIcon project={p} active={opened?.project.id === p.id} onOpen={open} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-xs text-zinc-600">
          {visible.length} {visible.length === 1 ? "item" : "items"} · click a folder to open it
        </p>
      </div>

      {opened && (
        <FinderWindow
          key={opened.project.id}
          opened={opened}
          projects={visible}
          onNavigate={(p) => setOpened({ project: p, dx: 0, dy: 0 })}
          onClose={() => setOpened(null)}
          onAskAI={(q) => {
            setOpened(null);
            onAskAI(q);
          }}
        />
      )}
    </Section>
  );
}

function FolderIcon({
  project: p,
  active,
  onOpen,
}: {
  project: Project;
  active: boolean;
  onOpen: (p: Project, el: HTMLElement) => void;
}) {
  return (
    <button
      onClick={(e) => onOpen(p, e.currentTarget)}
      className="group flex w-full flex-col items-center gap-2 rounded-xl p-2 focus:outline-none"
      aria-label={`Open ${p.folderName} project`}
    >
      <FolderSvg className="h-20 w-24 drop-shadow-[0_8px_16px_rgb(var(--i-500)/0.25)] transition duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:drop-shadow-[0_14px_24px_rgb(var(--i-500)/0.4)] group-focus-visible:-translate-y-1.5" />
      <span
        className={`max-w-[9rem] rounded-md px-1.5 py-0.5 text-center text-[13px] font-medium leading-snug transition ${
          active
            ? "bg-accent text-on-accent"
            : "text-zinc-200 group-hover:bg-zinc-800/80 group-focus-visible:bg-accent group-focus-visible:text-on-accent"
        }`}
      >
        {p.folderName}
      </span>
    </button>
  );
}

/** macOS-style folder (back panel with tab, paper, front panel), tinted by the theme like macOS accent colours. */
function FolderSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--f-back-1)" }} />
          <stop offset="1" style={{ stopColor: "var(--f-back-2)" }} />
        </linearGradient>
        <linearGradient id="folder-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--f-front-1)" }} />
          <stop offset="1" style={{ stopColor: "var(--f-front-2)" }} />
        </linearGradient>
      </defs>
      <path
        d="M6 14a8 8 0 0 1 8-8h30a8 8 0 0 1 6 2.7L56 15h50a8 8 0 0 1 8 8v59a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8Z"
        fill="url(#folder-back)"
      />
      <rect x="10" y="20" width="100" height="40" rx="3" fill="#ffffff" opacity="0.9" />
      <rect x="4" y="27" width="112" height="65" rx="8" fill="url(#folder-front)" />
      <rect x="4" y="27" width="112" height="2.5" rx="1.25" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

function FinderWindow({
  opened,
  projects,
  onNavigate,
  onClose,
  onAskAI,
}: {
  opened: Opened;
  projects: Project[];
  onNavigate: (p: Project) => void;
  onClose: () => void;
  onAskAI: (q: string) => void;
}) {
  const { project: p } = opened;
  const [closing, setClosing] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = projects.findIndex((x) => x.id === p.id);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 220);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && index < projects.length - 1) onNavigate(projects[index + 1]);
      if (e.key === "ArrowLeft" && index > 0) onNavigate(projects[index - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, index, projects, onNavigate]);

  const motion = { "--dx": `${opened.dx}px`, "--dy": `${opened.dy}px` } as CSSProperties;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${closing ? "opacity-0" : "opacity-100"}`}
        onClick={close}
      />
      <div
        style={motion}
        className={`relative flex w-full flex-col overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-900/95 shadow-2xl shadow-black/60 transition-[max-width,max-height] duration-300 ${
          maximized ? "max-h-[96vh] max-w-6xl" : "max-h-[88vh] max-w-3xl"
        } ${closing ? "finder-close" : "finder-open"}`}
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-800/60 px-4 py-2.5">
          <div className="group/lights flex gap-2">
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close"
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[9px] font-bold leading-none text-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <span className="opacity-0 group-hover/lights:opacity-100">×</span>
            </button>
            <button
              onClick={close}
              aria-label="Minimize"
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[9px] font-bold leading-none text-black/60"
            >
              <span className="opacity-0 group-hover/lights:opacity-100">−</span>
            </button>
            <button
              onClick={() => setMaximized(!maximized)}
              aria-label={maximized ? "Restore size" : "Maximize"}
              className="hidden h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] font-bold leading-none text-black/60 sm:flex"
            >
              <span className="opacity-0 group-hover/lights:opacity-100">+</span>
            </button>
          </div>
          <div className="flex gap-1 text-zinc-500">
            <button
              onClick={() => index > 0 && onNavigate(projects[index - 1])}
              disabled={index <= 0}
              aria-label="Previous project"
              className="rounded p-0.5 hover:bg-zinc-700/60 hover:text-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => index < projects.length - 1 && onNavigate(projects[index + 1])}
              disabled={index >= projects.length - 1}
              aria-label="Next project"
              className="rounded p-0.5 hover:bg-zinc-700/60 hover:text-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <p className="flex min-w-0 flex-1 items-center justify-center gap-2 pr-16 text-sm font-medium text-zinc-200">
            <FolderSvg className="h-4 w-5 shrink-0" />
            <span className="truncate">{p.folderName}</span>
          </p>
        </div>

        {/* Path bar */}
        <div className="border-b border-zinc-800 px-4 py-1.5 font-mono text-[11px] text-zinc-500">
          ~/projects/{p.category.toLowerCase().replace(/\s+/g, "-")}/<span className="text-ice-400">{p.id}</span>
        </div>

        {/* Contents */}
        <div className="overflow-y-auto p-5 sm:p-7">
          <ProjectDetails project={p} onAskAI={onAskAI} />
        </div>

        <div className="border-t border-zinc-800 px-4 py-1.5 text-center font-mono text-[11px] text-zinc-600">
          {index + 1} of {projects.length} · ← → to browse · Esc to close
        </div>
      </div>
    </div>
  );
}

function ProjectDetails({ project: p, onAskAI }: { project: Project; onAskAI: (q: string) => void }) {
  return (
    <article>
      <p className="font-mono text-xs text-ice-400">
        {p.category} · <span className="text-zinc-500">{p.context}</span>
      </p>
      <h3 className="mt-2 text-2xl font-bold leading-tight text-white">{p.title}</h3>
      <p className="mt-3 leading-relaxed text-zinc-400">{p.summary}</p>

      {p.metrics.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
              <span className="mt-1 text-[11px] leading-tight text-zinc-500">{m.label}</span>
              <span className="font-mono text-lg font-bold text-white">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-zinc-300">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ice-400" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {p.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn-ghost !py-2">
            <GithubIcon /> View on {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ))}
        <button onClick={() => onAskAI(`Tell me more about the ${p.title} project.`)} className="btn-primary !py-2">
          <Sparkles className="h-4 w-4" /> Ask AI about this
        </button>
      </div>
    </article>
  );
}
