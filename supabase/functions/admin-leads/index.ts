import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword) {
      return json({ error: "ADMIN_PASSWORD is not configured" }, 500);
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ error: "Invalid request body" }, 400);
    }

    const { password, action, id, status } = body as Record<string, unknown>;

    if (typeof password !== "string" || password !== adminPassword) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "list") {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) return json({ error: error.message }, 500);
      return json({ leads: data });
    }

    if (typeof id !== "string" || id.length < 10) {
      return json({ error: "A valid lead id is required" }, 400);
    }

    if (action === "update") {
      const allowed = ["new", "contacted", "qualified", "won", "lost"];
      if (typeof status !== "string" || !allowed.includes(status)) {
        return json({ error: "Invalid status" }, 400);
      }
      const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ success: true });
    }

    if (action === "delete") {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ success: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("admin-leads error:", err);
    return json({ error: "Unexpected server error" }, 500);
  }
});