import { z } from "npm:zod@3.23.8";
import { corsHeaders, json, serviceClient } from "../_shared/admin.ts";

const MAX_PER_WINDOW = 5;
const WINDOW_MINUTES = 60;

const BodySchema = z.object({
  type: z.enum(["project", "enrollment"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  service_slug: z.string().trim().max(120).optional().or(z.literal("")),
  program_slug: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  captchaToken: z.string().min(10, "Captcha is required").max(5000),
});

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`fuselabs:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyCaptcha(token: string, ip: string): Promise<boolean> {
  const secret = Deno.env.get("HCAPTCHA_SECRET");
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const result = await res.json().catch(() => ({ success: false }));
  return result?.success === true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return json({ error: parsed.error.flatten().fieldErrors }, 400);
    }
    const { captchaToken, ...lead } = parsed.data;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const ipHash = await hashIp(ip);
    const supabase = serviceClient();

    // Rate limit before spending a captcha verification
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const { count, error: countError } = await supabase
      .from("form_submissions")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if (countError) console.error("rate limit check failed", countError);
    if ((count ?? 0) >= MAX_PER_WINDOW) {
      return json(
        { error: "Too many submissions. Please try again in an hour." },
        429,
      );
    }

    if (!(await verifyCaptcha(captchaToken, ip))) {
      return json({ error: "Captcha verification failed. Please try again." }, 400);
    }

    const payload = {
      type: lead.type === "enrollment" ? "enrollment" : "project",
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      company: lead.company || null,
      budget: lead.budget || null,
      timeline: lead.timeline || null,
      service_slug: lead.service_slug || null,
      program_slug: lead.program_slug || null,
      message: lead.message || null,
      status: "new",
    };

    const { error } = await supabase.from("leads").insert(payload);
    if (error) throw error;

    await supabase.from("form_submissions").insert({ ip_hash: ipHash, form: payload.type });

    // Best-effort notification; never blocks the submission
    try {
      await supabase.functions.invoke("send-contact-email", {
        body: {
          firstName: payload.name,
          lastName: "",
          email: payload.email,
          companyWebsite: payload.company ?? "",
          services: payload.service_slug ?? payload.program_slug ?? payload.type,
          budget: payload.budget ?? "",
          projectDetails: payload.message ?? "",
        },
      });
    } catch (mailError) {
      console.warn("lead saved, notification failed", mailError);
    }

    return json({ success: true });
  } catch (error) {
    console.error("submit-lead error", error);
    return json({ error: "Could not submit your request. Please try again." }, 500);
  }
});