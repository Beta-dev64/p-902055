/**
 * Lightweight, provider-agnostic analytics helper.
 *
 * Events are pushed to `window.dataLayer` (GTM), forwarded to `gtag` when
 * present, and mirrored as a `fuselabs:analytics` DOM event so any tag manager
 * or custom listener can pick them up without changing app code.
 */

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (event: string, payload: AnalyticsPayload = {}) => {
  if (typeof window === "undefined") return;

  const data = {
    event,
    ...payload,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
  window.gtag?.("event", event, data);
  window.dispatchEvent(new CustomEvent("fuselabs:analytics", { detail: data }));

  if (import.meta.env.DEV) {
    console.info("[analytics]", event, data);
  }
};

/** CTA click on a service or academy program page. */
export const trackCtaClick = (
  kind: "service" | "program",
  slug: string,
  location: string,
) => trackEvent("cta_click", { cta_kind: kind, cta_slug: slug, cta_location: location });

/** Successful lead / enrollment submission. */
export const trackLeadSubmit = (
  type: "project" | "enrollment",
  slug?: string,
) =>
  trackEvent(type === "enrollment" ? "enrollment_submitted" : "lead_submitted", {
    lead_type: type,
    lead_slug: slug || "none",
  });
