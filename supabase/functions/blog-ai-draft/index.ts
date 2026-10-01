import { z } from "npm:zod@3";
import { corsHeaders, isAdmin, json } from "../_shared/admin.ts";

const Body = z.object({
  topic: z.string().trim().min(3).max(300),
  keyPoints: z.string().trim().max(4000).optional().default(""),
  audience: z.string().trim().max(200).optional().default(""),
  tone: z.string().trim().max(100).optional().default("professional and friendly"),
});

const SYSTEM = `You are a senior content writer for FuseLabs IO, a software development & growth agency and tech academy.
Write polished, accurate, SEO-friendly blog articles in Markdown.
Return ONLY a JSON object (no code fences) with keys:
"title" (max 80 chars), "excerpt" (1-2 sentences, max 200 chars), "category" (one short category name),
"tags" (array of 3-6 short lowercase tags), "content" (the full article in Markdown, 800-1300 words,
with ## headings, short paragraphs, lists where useful, and a closing call to action). Do not include the title as a heading in content.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (!isAdmin(req)) return json({ error: "Unauthorized" }, 401);

  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: "Please provide a topic (at least 3 characters)." }, 400);
  const { topic, keyPoints, audience, tone } = parsed.data;

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured." }, 500);

  const userPrompt = `Topic: ${topic}\nKey points to cover:\n${keyPoints || "(use your judgement)"}\nAudience: ${audience || "startup founders and aspiring developers"}\nTone: ${tone}`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    signal: req.signal,
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      instructions: SYSTEM,
      input: userPrompt,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    console.error("AI gateway error", res.status, text);
    if (res.status === 429) return json({ error: "Too many requests right now. Please try again in a minute." }, 429);
    if (res.status === 402) return json({ error: "AI credits are used up. Add credits in your workspace billing settings." }, 402);
    return json({ error: "The AI couldn't draft this article. Please try again." }, res.status >= 500 ? 502 : res.status);
  }

  // Consume the SSE stream server-side and collect the output text.
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  let text = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === "response.output_text.delta") text += evt.delta ?? "";
        if (evt.type === "response.failed" || evt.type === "error") {
          return json({ error: "The AI couldn't draft this article. Please try again." }, 502);
        }
      } catch { /* ignore partial */ }
    }
  }

  const match = text.match(/\{[\s\S]*\}/);
  try {
    const draft = JSON.parse(match ? match[0] : text);
    return json({
      title: String(draft.title ?? topic).slice(0, 150),
      excerpt: String(draft.excerpt ?? "").slice(0, 300),
      category: String(draft.category ?? "").slice(0, 60),
      tags: Array.isArray(draft.tags) ? draft.tags.map(String).slice(0, 8) : [],
      content: String(draft.content ?? ""),
    });
  } catch {
    if (!text.trim()) return json({ error: "The AI returned an empty draft. Please try again." }, 502);
    return json({ title: topic, excerpt: "", category: "", tags: [], content: text });
  }
});
