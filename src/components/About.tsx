import { Brain, FlaskConical, Search } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import Section from "./Section";

const ICONS = [Brain, Search, FlaskConical];

export default function About() {
  return (
    <Section id="about" index="01. about" title="A bit about me">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 text-[17px] leading-relaxed text-zinc-400">
          {profile.about.map((p, i) => (
            <Reveal key={p} delay={i * 100}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="space-y-3">
          {profile.focusAreas.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={f.title} delay={i * 120}>
                <div className="card flex gap-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ice-400/10 text-ice-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{f.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
