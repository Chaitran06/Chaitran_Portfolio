import { BookOpen, Briefcase, ExternalLink, GraduationCap } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Journey() {
  return (
    <Section id="journey" index="04. journey" title="Experience & education">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            <Briefcase className="h-4 w-4" /> Experience & leadership
          </h3>
          <ol className="relative space-y-8 border-l border-zinc-800 pl-6">
            {profile.experience.map((x, i) => (
              <li key={x.role + x.org} className="relative">
                <Reveal delay={i * 100}>
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-ice-400" />
                  <p className="font-mono text-xs text-zinc-500">{x.period}</p>
                  <h4 className="mt-1 font-semibold text-white">{x.role}</h4>
                  <p className="text-sm text-ice-300">{x.org}</p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-400">
                    {x.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              <GraduationCap className="h-4 w-4" /> Education
            </h3>
            <div className="space-y-4">
              {profile.education.map((e, i) => (
                <Reveal key={e.school} delay={i * 120}>
                  <div className="card p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-semibold text-white">{e.school}</h4>
                      <span className="font-mono text-xs text-zinc-500">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-ice-300">{e.degree}</p>
                    <p className="mt-0.5 font-mono text-xs text-zinc-500">{e.grade}</p>
                    {e.notes && <p className="mt-3 text-sm leading-relaxed text-zinc-400">{e.notes}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              <BookOpen className="h-4 w-4" /> Publication
            </h3>
            {profile.publications.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="card group block p-5 transition hover:border-zinc-700"
              >
                <h4 className="flex items-start justify-between gap-3 font-semibold leading-snug text-white">
                  {p.title}
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 group-hover:text-ice-300" />
                </h4>
                <p className="mt-2 text-sm text-zinc-400">
                  {p.venue} · {p.year}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{p.authors}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
