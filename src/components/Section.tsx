import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  index,
  title,
  subtitle,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Reveal variant="left" className="mb-10">
        <p className="font-mono text-sm section-index text-ice-400">
          <span className="text-zinc-600">// </span>
          {index}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 max-w-2xl text-zinc-400">{subtitle}</p>}
      </Reveal>
      {children}
    </section>
  );
}
