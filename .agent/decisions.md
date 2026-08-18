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

## DEC-006 — Canvas fusion field instead of Three.js for v1 hero

- **Date:** 2026-08-18
- **Status:** accepted
- **Context:** User supplied dark cinematic hero references; DEC-005 preferred WebGL/Three fusion field.
- **Decision:** Ship a 2D canvas particle nebula as the elaborate motion moment. No new Three.js dependency.
- **Consequences:** Lighter bundle, easier reduced-motion handling; can swap to Three later if needed.

## Template

```markdown
## DEC-XXX — title
- **Date:**
- **Status:** proposed | accepted | superseded
- **Context:**
- **Decision:**
- **Consequences:**
```