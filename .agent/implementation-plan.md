# Implementation Plan (OSE.builds)

Full requirements live in `../REQUIREMENTS.md`. This file is the execution plan.

---

## Creative direction

| Question | Answer |
|---|---|
| Mood | Cinematic + industrial tech — warm forge |
| Memorable moment | Sticky WebGL fusion hero → warm paper curtain |
| 3-second message | Technical partner that builds, ships, grows — pay-for-results |

**Aesthetic one-liner:** Dark warm-charcoal agency site, molten amber accents, distinctive type, Lenis scroll, dual conversion paths (Project primary / Academy secondary).

---

## Phases

### 0 — Scaffold
Folder, requirements, `.agent` docs → clone repo → branch → deps.

### 1 — Tokens
CSS vars + Tailwind map + fonts + grain + kill purple defaults.

### 2 — Shell
Nav, footer, Lenis/GSAP, SEO helpers, mobile menu.

### 3 — Home spine
Loader → Hero → Proof → Services → Process → Portfolio teaser → Academy teaser → Testimonials → Team → Final CTA → Footer.

### 4 — Portfolio & case studies
Immersive index + detail template wired to existing data.

### 5 — Academy
Courses (Frontend/Backend 300k NGN, AI/ML 450k NGN, 3 months), syllabus, enrollment form.

### 6 — Contact & legal
Project inquiry fields, newsletter, privacy, terms.

### 7 — SEO & QA
Meta, JSON-LD, robots, sitemap, Playwright screenshots, reduced motion.

### 8 — Assets
Hero/media polish, treated case imagery, logos, team photos.

---

## CTA hierarchy

1. **Start a Project** — solid `primary-500`
2. **Join Academy** — outline / ghost
3. Portfolio / process links — text

---

## Keep vs rebuild

| Keep | Rebuild |
|---|---|
| Vite/React/TS | Marketing components |
| Supabase + forms | Visual system |
| Router + Helmet | Section composition |
| Zod schemas | Motion layer |
| Admin function | Admin aesthetics (low priority) |

---

## Risk notes

- Do not theme-paint Lovable UI
- Rotate any secrets found in committed `.env`
- Isolate admin routes from Lenis/hero cost
- Dual conversion paths must stay visually hierarchical