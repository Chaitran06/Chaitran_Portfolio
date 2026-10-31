// Minimal Groq client (OpenAI-compatible REST API). Runs server-side only, so the
// API key never reaches the browser.

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Groq rate limits are per model, so when the primary model is rate-limited
// (HTTP 429) we retry the same request on the next model in this list. A 404
// (model retired by Groq) also falls through to the next model.
function models(): string[] {
  const primary = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const fallbacks = (process.env.GROQ_FALLBACK_MODELS || "openai/gpt-oss-20b")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  return [primary, ...fallbacks.filter((m) => m !== primary)];
}

export async function groq(body: Record<string, unknown>): Promise<Response> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set");
  let res: Response | undefined;
  for (const model of models()) {
    const { reasoning_effort, ...rest } = body;
    // reasoning_effort is only accepted by the gpt-oss reasoning models.
    const payload = model.startsWith("openai/gpt-oss") ? { model, reasoning_effort, ...rest } : { model, ...rest };
    res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status !== 429 && res.status !== 404) return res;
    console.warn(`Groq ${res.status} on ${model}, trying next model`);
  }
  return res!.status === 404 ? new Response(null, { status: 503 }) : res!;
}

export function upstreamError(status: number): Response {
  return status === 429
    ? json({ error: "High demand right now. Please try again in about 30 seconds." }, 429)
    : json({ error: "The AI service is busy. Please try again shortly." }, 502);
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Best-effort per-IP limiter. Serverless instances don't share memory, so this
// only slows down abuse from a single client; Groq's own limits are the backstop.
const hits = new Map<string, number[]>();

export function rateLimited(req: Request, limit: number, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
