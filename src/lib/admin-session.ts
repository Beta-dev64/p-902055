const KEY = "fuselabs_admin_pw";

export const setAdminPassword = (password: string) =>
  sessionStorage.setItem(KEY, password);

export const getAdminPassword = () => sessionStorage.getItem(KEY) ?? "";

export const clearAdminPassword = () => sessionStorage.removeItem(KEY);

const FUNCTIONS_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;

/** Calls an admin-only edge function with the session password header. */
export async function callAdminFunction<T>(
  name: "admin-leads" | "cms-preview",
  body: Record<string, unknown>,
  password = getAdminPassword(),
): Promise<T> {
  const res = await fetch(`${FUNCTIONS_URL}/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      "x-admin-password": password,
    },
    body: JSON.stringify(body),
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof payload?.error === "string" ? payload.error : `Request failed (${res.status})`,
    );
  }
  return payload as T;
}