import { corsHeaders, isAdmin, json, serviceClient } from "../_shared/admin.ts";

/**
 * Exchanges the admin password for a real signed-in admin session.
 * Ensures a dedicated CMS admin account exists with the admin role, then
 * returns a one-time token the browser redeems for a session, so database
 * writes pass the admin-only access rules.
 */
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "cms-admin@fuselabsio.lovable.app";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!isAdmin(req)) return json({ error: "Unauthorized" }, 401);

  const supabase = serviceClient();

  try {
    let userId: string | undefined;

    const { data: created } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      email_confirm: true,
    });
    userId = created?.user?.id;

    if (!userId) {
      for (let page = 1; page <= 20 && !userId; page++) {
        const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
        if (error) throw error;
        userId = data.users.find(
          (u) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
        )?.id;
        if (data.users.length < 200) break;
      }
    }
    if (!userId) throw new Error("Could not create the admin account");

    const { error: roleError } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role", ignoreDuplicates: true });
    if (roleError) throw roleError;

    const { data: link, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: ADMIN_EMAIL,
    });
    if (linkError) throw linkError;

    return json({ token_hash: link.properties.hashed_token });
  } catch (error) {
    console.error("admin-session error", error);
    return json({ error: error instanceof Error ? error.message : "Server error" }, 500);
  }
});
