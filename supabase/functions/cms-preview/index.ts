import { z } from "npm:zod@3.23.8";
import { corsHeaders, isAdmin, json, serviceClient } from "../_shared/admin.ts";

const TABLES = {
  service: "services",
  program: "academy_programs",
  "case-study": "portfolios",
} as const;

const BodySchema = z.object({
  type: z.enum(["service", "program", "case-study"]),
  slug: z.string().trim().min(1).max(160),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!isAdmin(req)) return json({ error: "Unauthorized" }, 401);

  const parsed = BodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);

  try {
    const { data, error } = await serviceClient()
      .from(TABLES[parsed.data.type])
      .select("*")
      .eq("slug", parsed.data.slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return json({ error: "Not found" }, 404);
    return json({ item: data });
  } catch (error) {
    console.error("cms-preview error", error);
    return json({ error: "Request failed" }, 500);
  }
});