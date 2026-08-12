# Decisions

Lightweight architecture / design decision log. Newest first.

---

## DEC-001 — Project location & tracking structure

- **Date:** 2026-08-07
- **Status:** accepted
- **Context:** Need a clean home for the FuseLabs redesign separate from Downloads experiments.
- **Decision:** Create `C:\Users\DELL\Documents\devs\myapps\fuselabs-io` with root `REQUIREMENTS.md` and `.agent/` markdown trackers.
- **Consequences:** Docs exist before code clone; agent sessions should update `.agent/*` continuously.

## DEC-002 — Redesign approach (not theme paint)

- **Date:** 2026-08-07
- **Status:** accepted
- **Context:** Existing repo is Lovable Vite/React/shadcn with generic marketing chrome.
- **Decision:** Total visual redesign using OSE.builds; keep Supabase/forms/routing/data; rebuild marketing UI.
- **Consequences:** Higher upfront UI work; lower risk to lead-capture backend.

## DEC-003 — Stack

- **Date:** 2026-08-07
- **Status:** accepted
- **Context:** Multi-page site with forms, academy, case studies, admin.
- **Decision:** Keep Vite + React + TS + Tailwind; add GSAP, Lenis, optional Three.js.
- **Consequences:** Not a single-file HTML delivery; motion libraries added to bundle.

## DEC-004 — Color & accent discipline

- **Date:** 2026-08-07
- **Status:** accepted
- **Context:** User supplied full text/background/primary/secondary/accent scales.
- **Decision:** Dark-first site; primary `#de8321` rationed to CTA + one hero word + one active state; cream interrupts for academy/process.
- **Consequences:** Secondary/accent scales for soft UI only; no competing neon CTAs.

## DEC-005 — Hero archetype

- **Date:** 2026-08-07
- **Status:** accepted
- **Context:** Agency brand (not physical product machine).
- **Decision:** WebGL/Three abstract “fusion” hero preferred over scroll-scrub frame sequence for v1.
- **Consequences:** Optional Higgsfield video pipeline deferred unless needed.

## DEC-006 — Brand naming and route

- **Date:** 2026-08-12
- **Status:** accepted
- **Context:** The public brand is being simplified while preserving search/domain continuity.
- **Decision:** Use **FuseLabs** as the human-facing lockup. Use “FuseLabs IO” only where an existing legal, SEO, or domain context benefits from it. Make `/academy` canonical and redirect `/academic` for compatibility.
- **Consequences:** New page copy and metadata lead with FuseLabs; old academy links remain recoverable.

## DEC-007 — Distinct academy visual system

- **Date:** 2026-08-12
- **Status:** accepted
- **Context:** The academy needs to convert students without feeling like a reskinned agency page.
- **Decision:** Use warm paper, ink, cobalt annotation, and human learning imagery for the academy. Keep dark cinematic treatment only for the hero and application close.
- **Consequences:** Agency uses industrial charcoal/amber; academy uses editorial paper/blue while sharing typography discipline and the FuseLabs symbol.

## DEC-008 — Portfolio proof filter

- **Date:** 2026-08-12
- **Status:** accepted
- **Context:** Existing portfolio data contains at least one low-quality placeholder-like record.
- **Decision:** Hide records with obviously filler-looking titles or insufficient descriptions from public portfolio surfaces until they are made credible in the admin CMS.
- **Consequences:** The public site shows fewer, stronger case files rather than exposing unedited content.

## Template

```markdown
## DEC-XXX — title
- **Date:**
- **Status:** proposed | accepted | superseded
- **Context:**
- **Decision:**
- **Consequences:**
```
