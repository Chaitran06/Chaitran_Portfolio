import { Mail } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
        <p className="font-mono text-sm section-index text-ice-400">
          <span className="text-zinc-600">// </span>06. contact
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Let's build something.</h2>
        <p className="mx-auto mt-3 max-w-lg text-zinc-400">I'm open to {profile.openTo}. The fastest way to reach me is email.</p>
        <a href={`mailto:${profile.email}`} className="btn-primary mt-8">
          <Mail className="h-4 w-4" /> {profile.email}
        </a>
        <div className="mt-6 flex justify-center gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="border-t border-zinc-800/80 py-6 text-center font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} {profile.fullName}
      </div>
    </footer>
  );
}
