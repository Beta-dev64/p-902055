# QA

## Pre-release checklist

### Design (OSE)

- [x] Accent `#de8321` used in ≤3 primary roles
- [x] No purple/indigo AI-slop theme
- [x] First viewport is one composition
- [x] Brand readable without nav alone
- [x] Asymmetry present (not 50/50 defaults)
- [x] Grain on dark sections
- [x] No equal drop-shadow card grids as primary layout
- [x] Display fonts are not Inter/Roboto/Arial/Lato

### Motion

- [x] One elaborate hero moment
- [ ] Lenis feels smooth
- [ ] Reveals not noisy
- [x] `prefers-reduced-motion` respected

### Content / conversion

- [x] Dual CTAs clear (Project primary, Academy secondary)
- [x] All 6 services present
- [x] Process 4 steps present
- [x] Academy prices correct (300k / 300k / 450k NGN)
- [x] Project form fields complete
- [x] Enrollment form fields complete
- [ ] Testimonials + team + logos present — retained in the existing CMS/page inventory, not foregrounded on the new home spine

### Engineering

- [x] `npm run dev` / `build` succeed
- [ ] Forms submit (Supabase or configured backend)
- [x] Mobile nav works ≤768px
- [x] No horizontal overflow in representative previews
- [x] Routes: home, portfolio, case study, academy, contact, legal
- [ ] Secrets not committed — existing `.env` remains in the upstream working tree and should be rotated/removed before public push

### SEO

- [x] Titles/descriptions per key page
- [x] JSON-LD present
- [x] robots.txt + sitemap.xml

---

## Playwright passes

| Date | URL | Viewport | Result | Notes |
|---|---|---|---|---|
| 2026-08-12 | `/` | 1280px desktop | Pass | Agency hero, particle field, proof strip, services, process, proof portfolio, academy teaser, and project form visually verified. |
| 2026-08-12 | `/academy` | 1280px desktop | Pass | Generated Black-student video hero, paper/cobalt track system, and application form visually verified. |
| 2026-08-12 | `/portfolio` | 1280px desktop | Pass | Recast as “Selected work / shipped systems”; placeholder-like record hidden. |
