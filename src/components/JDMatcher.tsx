import { useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ClipboardPaste, HelpCircle, Loader2, Mail, RotateCcw, Target, XCircle } from "lucide-react";
import { profile } from "../data/profile";
import { CRITERIA, type MatchResult } from "../lib/matchTypes";
import Reveal from "./Reveal";
import Section from "./Section";

const SAMPLE_JD = `Machine Learning Engineer (Entry level / New grad)

We're looking for an ML Engineer to build and deploy models for our forecasting and document-intelligence products.

Responsibilities:
- Design, train and evaluate deep learning models (PyTorch or TensorFlow) for time-series and spatial data
- Build retrieval-augmented generation (RAG) pipelines with vector databases and LLM APIs
- Ship models behind REST APIs (FastAPI) and monitor their quality
- Collaborate with product teams and communicate results clearly

Requirements:
- B.Tech/M.Tech in Computer Science, Mathematics or related field
- Strong Python, NumPy, Pandas; solid ML fundamentals and statistics
- Experience with deep learning (CNNs, Transformers, LSTMs)
- Familiarity with Git and cloud platforms (AWS/GCP)
- 0-2 years of experience

Nice to have: Docker, Kubernetes, MLOps tooling, publications.`;

export default function JDMatcher() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const data = await res.json().catch(() => ({ error: "Unexpected server response." }));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
      requestAnimationFrame(() =>
        document.getElementById("match-result")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      id="match"
      index="03. for recruiters"
      title="Does Chaitran fit your role?"
      subtitle="Paste a job description. The AI compares it against my full profile and returns a weighted fit score, the matching and missing skills, and questions worth asking in an interview."
    >
      <Reveal>
        <div className="card p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="jd" className="text-sm font-medium text-zinc-200">
              Job description
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setJd(SAMPLE_JD)}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300"
              >
                <ClipboardPaste className="h-3.5 w-3.5" /> Try a sample JD
              </button>
              {(jd || result) && (
                <button
                  onClick={() => {
                    setJd("");
                    setResult(null);
                    setError(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>
          </div>
          <textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            maxLength={12000}
            rows={9}
            placeholder="Paste the role title, responsibilities and requirements here…"
            className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 font-mono text-[13px] leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:border-ice-400/50 focus:outline-none focus:ring-2 focus:ring-ice-400/20"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-zinc-500">{jd.length.toLocaleString()} / 12,000 characters · nothing is stored</p>
            <button onClick={analyze} disabled={loading || jd.trim().length < 80} className="btn-primary">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
              {loading ? "Analysing…" : "Analyse fit"}
            </button>
          </div>
          {error && (
            <p
              role="alert"
              className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
            </p>
          )}
        </div>
      </Reveal>

      {loading && <ResultSkeleton />}
      {result && <MatchReport result={result} />}
    </Section>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-36 w-36 shrink-0" role="img" aria-label={`Fit score ${score} out of 100`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="9" className="text-zinc-800" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className="text-ice-400 transition-[stroke-dashoffset] duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-bold text-white">{score}</span>
        <span className="text-xs text-zinc-500">/ 100</span>
      </div>
    </div>
  );
}

const VERDICT_STYLE: Record<MatchResult["verdict"], string> = {
  "Strong match": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "Good match": "border-ice-400/30 bg-ice-400/10 text-ice-300",
  "Partial match": "border-amber-500/30 bg-amber-500/10 text-amber-300",
  "Weak match": "border-zinc-600 bg-zinc-800/60 text-zinc-300",
};

function MatchReport({ result: r }: { result: MatchResult }) {
  return (
    <div id="match-result" className="reveal mt-6 scroll-mt-24 space-y-5">
      <div className="card grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <ScoreRing score={r.overall} />
          <span className={`rounded-full border px-3 py-1 text-sm font-medium ${VERDICT_STYLE[r.verdict]}`}>{r.verdict}</span>
        </div>
        <div>
          <p className="font-mono text-xs text-zinc-500">Fit for</p>
          <h3 className="text-xl font-semibold text-white">{r.roleTitle}</h3>
          <p className="mt-3 leading-relaxed text-zinc-400">{r.summary}</p>
          <div className="mt-6 space-y-4">
            {CRITERIA.map((c) => {
              const s = r.criteria[c.key];
              return (
                <div key={c.key}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-zinc-200">
                      {c.label} <span className="text-xs text-zinc-500">· weight {Math.round(c.weight * 100)}%</span>
                    </span>
                    <span className="font-mono font-semibold text-white">{s.score}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-ice-400 transition-all duration-700"
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  {s.reason && <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{s.reason}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <ListCard title="Matching skills" icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}>
          <div className="flex flex-wrap gap-1.5">
            {r.matchedSkills.length ? (
              r.matchedSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200"
                >
                  {s}
                </span>
              ))
            ) : (
              <p className="text-sm text-zinc-500">None identified.</p>
            )}
          </div>
        </ListCard>
        <ListCard title="Missing or not yet shown" icon={<XCircle className="h-4 w-4 text-zinc-400" />}>
          <div className="flex flex-wrap gap-1.5">
            {r.missingSkills.length ? (
              r.missingSkills.map((s) => (
                <span key={s} className="rounded-md border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-300">
                  {s}
                </span>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No notable gaps.</p>
            )}
          </div>
        </ListCard>
        <ListCard title="Strengths for this role" icon={<CheckCircle2 className="h-4 w-4 text-ice-400" />}>
          <Bullets items={r.strengths} />
        </ListCard>
        <ListCard title="Gaps & risks" icon={<AlertTriangle className="h-4 w-4 text-amber-400" />}>
          <Bullets items={r.gaps} />
        </ListCard>
      </div>

      {r.interviewQuestions.length > 0 && (
        <ListCard title="Suggested interview questions" icon={<HelpCircle className="h-4 w-4 text-ice-400" />}>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-zinc-400">
            {r.interviewQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </ListCard>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ice-400/20 bg-ice-400/5 p-5">
        <p className="text-sm text-zinc-300">Like what you see? Let's talk about the role.</p>
        <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Opportunity: ${r.roleTitle}`)}`} className="btn-primary">
          <Mail className="h-4 w-4" /> Contact Chaitran
        </a>
      </div>
      <p className="text-xs text-zinc-600">
        AI-generated assessment, based only on the public profile on this site. Overall score = weighted sum of the four criteria.
        Please verify in an interview.
      </p>
    </div>
  );
}

function ListCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="card p-5">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
        {icon} {title}
      </h4>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-zinc-500">None.</p>;
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-zinc-400">
      {items.map((s) => (
        <li key={s} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
          {s}
        </li>
      ))}
    </ul>
  );
}

function ResultSkeleton() {
  return (
    <div className="card mt-6 animate-pulse p-8" aria-hidden="true">
      <div className="flex gap-8">
        <div className="h-36 w-36 rounded-full bg-zinc-800/80" />
        <div className="flex-1 space-y-4">
          <div className="h-5 w-1/3 rounded bg-zinc-800" />
          <div className="h-3 w-full rounded bg-zinc-800/70" />
          <div className="h-3 w-5/6 rounded bg-zinc-800/70" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1.5 w-full rounded bg-zinc-800" />
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-zinc-500">
        Reading the JD and comparing it with the profile, this takes a few seconds…
      </p>
    </div>
  );
}
