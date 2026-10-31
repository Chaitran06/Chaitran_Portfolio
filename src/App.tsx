import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Skills from "./components/Skills";
import JDMatcher from "./components/JDMatcher";
import Footer from "./components/Footer";
import MouseEffects from "./components/MouseEffects";
import Backdrop from "./components/Backdrop";
import ThemeSwitcher from "./components/ThemeSwitcher";

const scrollToChat = () => document.getElementById("chat")?.scrollIntoView({ behavior: "smooth", block: "center" });

export default function App() {
  const [chatOpen, setChatOpen] = useState(true);
  const [chatSeed, setChatSeed] = useState<string | null>(null);
  const [chatInView, setChatInView] = useState(true);

  useEffect(() => {
    const el = document.getElementById("chat");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setChatInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleChat = () => {
    if (!chatOpen) scrollToChat();
    setChatOpen(!chatOpen);
  };

  const openChat = (question?: string) => {
    setChatOpen(true);
    if (question) setChatSeed(question);
    scrollToChat();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Backdrop />
      <MouseEffects />
      <ThemeSwitcher />
      <Nav chatOpen={chatOpen} onToggleChat={toggleChat} />
      <main className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Hero chatOpen={chatOpen} onToggleChat={toggleChat} chatSeed={chatSeed} onSeedUsed={() => setChatSeed(null)} />
        <About />
        <Projects onAskAI={openChat} />
        <JDMatcher />
        <Journey />
        <Skills />
      </main>
      <Footer />

      <button
        onClick={() => openChat()}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-ice-400 py-3 pl-4 pr-5 font-medium text-zinc-950 shadow-lg shadow-ice-500/20 transition-all duration-300 hover:scale-105 hover:bg-ice-300 ${
          chatInView ? "pointer-events-none translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        }`}
        aria-label="Go to AI assistant"
        tabIndex={chatInView ? -1 : 0}
      >
        <MessageSquare className="h-5 w-5" /> Ask Chaitran AI
      </button>
    </div>
  );
}
