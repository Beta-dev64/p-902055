# Redesign checklist

- [ ] Use **FuseLabs** as the primary public-facing brand name; retain “IO” only in SEO/domain contexts if it improves discoverability.
- [ ] Keep the existing services, course tracks, prices, forms, portfolio data, testimonials, team data, and conversion promises, while rewriting and reorganizing the presentation for clarity and credibility.
- [ ] Keep `/academic` working and add `/academy` as the canonical public route with a backward-compatible redirect from `/academic`.
- [ ] Generate and integrate a short 10-second hero video featuring a Black student excelling in a credible technical-learning setting.
- [ ] Use a distinct academy visual system: warm cream, ink, cobalt, editorial typography, human learning imagery, and a primary CTA oriented around joining/applying.
- [ ] Retain and improve Supabase persistence, inquiry forms, admin CMS availability, portfolio/case-study data, and SEO structured data.
- [ ] Use **Start a Project** as the agency primary CTA and recommend a low-friction academy CTA such as **Join the next cohort** or **Apply for a track**.
- [ ] Refine the supplied FuseLabs symbol and wordmark into clean responsive logo lockups for light, dark, compact, favicon, and social-sharing contexts.
- [ ] Build the agency hero with a cursor-reactive particle field that remains readable, performant, touch-safe, and fully understandable with reduced motion enabled.
- [ ] Preserve branch `redesign/premium-agency-academy` and document all meaningful design, SEO, media, and architecture decisions.
- [x] Add a public partner-logo marquee that reads from CMS-managed partner records, stays grayscale by default, and restores source color on hover/focus.
- [x] Confirm the admin CMS can create, edit, delete, and preview partner logo records with safe null handling.
- [x] Replace the academy’s inherited agency footer with a warm paper/cobalt academy footer that preserves route access and conversion intent.
- [x] Verify the marquee and academy footer at desktop and mobile widths, including reduced-motion behavior and empty CMS states.
