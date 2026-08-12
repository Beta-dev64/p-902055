import { z } from "npm:zod@3.23.8";
import { corsHeaders, isAdmin, json, serviceClient } from "../_shared/admin.ts";

const ListSchema = z.object({
  action: z.literal("list"),
  search: z.string().trim().max(120).optional(),
  status: z.enum(["all", "new", "contacted", "qualified", "closed"]).default("all"),
  type: z.enum(["all", "project", "enrollment"]).default("all"),
  page: z.number().int().min(1).max(1000).default(1),
  pageSize: z.number().int().min(5).max(100).default(10),
});

const UpdateSchema = z.object({
  action: z.literal("update"),
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "qualified", "closed"]),
});

const DeleteSchema = z.object({ action: z.literal("delete"), id: z.string().uuid() });
const PingSchema = z.object({ action: z.literal("ping") });

const BodySchema = z.discriminatedUnion("action", [
  ListSchema,
  UpdateSchema,
  DeleteSchema,
  PingSchema,
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!isAdmin(req)) return json({ error: "Unauthorized" }, 401);

  const parsed = BodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);

  const supabase = serviceClient();

  try {
    const body = parsed.data;

    if (body.action === "ping") return json({ success: true });

    if (body.action === "list") {
      const { search, status, type, page, pageSize } = body;
      let query = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (status !== "all") query = query.eq("status", status);
      if (type !== "all") query = query.eq("type", type);
      if (search) {
        const term = search.replace(/[%,()]/g, " ").trim();
        if (term) {
          query = query.or(
            [
              `name.ilike.%${term}%`,
              `email.ilike.%${term}%`,
              `company.ilike.%${term}%`,
              `message.ilike.%${term}%`,
            ].join(","),
          );
        }
      }

      const from = (page - 1) * pageSize;
      const { data, count, error } = await query.range(from, from + pageSize - 1);
      if (error) throw error;
      return json({ leads: data ?? [], total: count ?? 0, page, pageSize });
    }

    if (body.action === "update") {
      const { error } = await supabase
        .from("leads")
        .update({ status: body.status })
        .eq("id", body.id);
      if (error) throw error;
      return json({ success: true });
    }

    const { error } = await supabase.from("leads").delete().eq("id", body.id);
    if (error) throw error;
    return json({ success: true });
  } catch (error) {
    console.error("admin-leads error", error);
    return json({ error: "Request failed" }, 500);
  }
});