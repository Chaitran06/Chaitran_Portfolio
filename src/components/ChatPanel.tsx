import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, ChevronDown, Loader2, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is Chaitran's strongest AI/ML project?",
  "What experience does he have with RAG and LLMs?",
  "Is he a good fit for an SDE role?",
  "What's his educational background?",
];

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm **Chaitran AI**. Ask me anything about his projects, research, skills or education.",
};

export default function ChatPanel({
  open,
  onToggle,
  seed,
  onSeedUsed,
}: {
  open: boolean;
  onToggle: () => void;
  seed: string | null;
  onSeedUsed: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wasOpen = useRef(open);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Focus the input when the user opens the chat (not on first page load, where
  // it would pop up the keyboard on phones).
  useEffect(() => {
    if (open && !wasOpen.current) inputRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  // Questions sent from elsewhere on the page ("Ask AI" on a project card).
  const handledSeed = useRef<string | null>(null);
  useEffect(() => {
    if (!seed) {
      handledSeed.current = null;
    } else if (open && handledSeed.current !== seed) {
      handledSeed.current = seed;
      onSeedUsed();
      send(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setInput("");
    setBusy(true);

    const history: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    const update = (content: string) => setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.filter((m) => m !== GREETING) }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        update(answer);
      }
      if (!answer) update("Sorry, I couldn't generate an answer. Please try rephrasing.");
    } catch (e) {
      update(`⚠️ ${e instanceof Error ? e.message : "Something went wrong."}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div id="chat" className="card flex scroll-mt-24 flex-col overflow-hidden shadow-2xl shadow-ice-500/10">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="chat-body"
        className="flex w-full items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3 text-left transition hover:bg-zinc-900/60"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ice-400/10 text-ice-400">
            <Bot className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-400" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">Chaitran AI</span>
            <span className="block text-xs text-zinc-500">
              {open ? "Ask me anything about Chaitran" : "Click to chat with my AI assistant"}
            </span>
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          {open ? "Hide" : "Open"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      <div
        id="chat-body"
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          {/* On desktop the chat sizes itself to the window so the input is always visible without scrolling. */}
          <div className="flex h-[440px] flex-col lg:h-[clamp(300px,calc(100dvh_-_11.5rem),540px)]">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="ml-10 rounded-xl rounded-br-sm bg-accent px-3.5 py-2.5 text-sm text-on-accent">
                    {m.content}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="mr-6 rounded-xl rounded-bl-sm border border-zinc-800 bg-zinc-900/70 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-300"
                  >
                    {m.content ? (
                      <div className="prose-chat">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2 text-zinc-500">
                        <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                      </span>
                    )}
                  </div>
                ),
              )}
              {messages.length === 1 && (
                <div className="space-y-2 pt-1">
                  <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Sparkles className="h-3.5 w-3.5" /> Try asking
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-zinc-800 px-3 py-2 text-left text-sm text-zinc-300 transition hover:border-ice-400/40 hover:bg-zinc-900"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 border-t border-zinc-800 p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={1500}
                placeholder="Ask anything about Chaitran…"
                className="max-h-32 flex-1 resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-ice-400/50 focus:outline-none"
              />
              <button type="submit" disabled={busy || !input.trim()} className="btn-primary !h-10 !w-10 !p-0" aria-label="Send">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
