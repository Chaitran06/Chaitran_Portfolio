import { Trophy } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" index="05. skills" title="Toolbox">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((s, idx) => (
          <Reveal key={s.group} delay={(idx % 3) * 100} className="h-full">
            <div className="card h-full p-5 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700">
              <h3 className="font-mono text-sm text-ice-400">{s.group}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <span key={i} className="rounded-md bg-zinc-800/70 px-2 py-1 text-xs text-zinc-300">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card mt-5 p-5">
          <h3 className="flex items-center gap-2 font-mono text-sm text-ice-400">
            <Trophy className="h-4 w-4" /> Achievements
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-400 md:grid-cols-3">
            {profile.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
