import { Download, Mail, MapPin, Target } from "lucide-react";
import { profile } from "../data/profile";
import ChatPanel from "./ChatPanel";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Hero({
  chatOpen,
  onToggleChat,
  chatSeed,
  onSeedUsed,
}: {
  chatOpen: boolean;
  onToggleChat: () => void;
  chatSeed: string | null;
  onSeedUsed: () => void;
}) {
  return (
    <section id="top" className="grid items-center gap-12 pb-12 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:pb-10 lg:pt-6">
      <div>
        <p className="reveal font-mono text-sm section-index text-ice-400">
          <span className="text-zinc-600">// </span>hello, I'm
        </p>
        <h1 className="reveal mt-3 text-4xl font-extrabold tracking-tight text-white [animation-delay:80ms] sm:text-6xl">
          {profile.name}
        </h1>
        <p className="reveal mt-4 bg-gradient-to-r from-ice-300 to-gold bg-clip-text text-xl font-semibold text-transparent [animation-delay:160ms] sm:text-2xl">
          {profile.headline}
        </p>
        <p className="reveal mt-2 text-lg text-zinc-400 [animation-delay:200ms]">M.Tech Mathematics &amp; Computing, NIT Delhi</p>
        <p className="reveal mt-4 flex items-center gap-1.5 text-sm text-zinc-500 [animation-delay:240ms]">
          <MapPin className="h-4 w-4" /> {profile.location}
        </p>

        <div className="reveal mt-8 flex flex-wrap gap-3 [animation-delay:320ms]">
          <a href="#match" className="btn-primary">
            <Target className="h-4 w-4" /> Match your JD
          </a>
          <a href={profile.resumeUrl} download className="btn-ghost">
            <Download className="h-4 w-4" /> Download resume
          </a>
        </div>
        <div className="reveal mt-6 flex gap-2 [animation-delay:400ms]">
          <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="reveal [animation-delay:250ms]">
        <ChatPanel open={chatOpen} onToggle={onToggleChat} seed={chatSeed} onSeedUsed={onSeedUsed} />
      </div>
    </section>
  );
}
