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

## DEC-007 — Logo mark + Syne / Space Grotesk

- **Date:** 2026-08-18
- **Status:** accepted
- **Context:** User asked for a new logo symbol while keeping FuseLabs IO, plus Space Grotesk and Syne (extra-wide at heavy weights).
- **Decision:** Fusion-ring SVG mark with molten amber core; wordmark in Syne 800. Display type = Syne; body/UI = Space Grotesk. Hero layout unchanged.
- **Consequences:** Cabinet Grotesk and Outfit retired. Old Pulse Robot compact SVG unused in chrome.

## DEC-008 — Section rhythm: no inter-section gaps, alternating tone

- **Date:** 2026-08-21
- **Status:** accepted
- **Context:** Home sections were wrapped in a `space-y-4 sm:space-y-8` container. In dark mode that gap always rendered as `bg-background` (near-black) between every section regardless of the two adjacent sections' tones, showing as a visible bar/seam. Sections also didn't strictly alternate tone.
- **Decision:** Remove the wrapping gap; sections sit flush against each other, each supplying its own `py-*`. Re-assigned `bg-background`/`bg-muted` on each home section so the sequence alternates tone section-to-section (Humanoid D → Showcase L → Features D → Portfolio L → [marquee accent] → Testimonials D → Reviews L → Team D → Details L → Newsletter D → MadeByHumans L → Footer L).
- **Consequences:** No more visible seams between bands. Footer and the last content section can share a tone since the footer has its own `border-t` divider.

## DEC-009 — Darker dark-mode scale, orange marquee, seamless Marquee component

- **Date:** 2026-08-21
- **Status:** accepted
- **Context:** Dark mode `--background`/`--card`/`--muted`/`--border` were lighter than the Hero's near-black `#070605`, and the old partner strip re-triples the array and flips scroll direction with page scroll (visible start/end seam, jittery).
- **Decision:**
  - Darken `.dark` semantic tokens (`--background` 5%→3% L, `--card`/`--popover` 9%→7%, `--muted` 14%→11%, `--border`/`--input` 18%→15%) to sit closer to the Hero tone while preserving enough gap for alternation.
  - Add a Magic UI–style `Marquee` primitive (`src/components/ui/marquee.tsx`, standard shadcn registry pattern) driven by `--duration`/`--gap` CSS vars and Tailwind `animate-marquee` keyframes; content is duplicated into `repeat` identical groups that all run the same animation in lockstep, so the loop has no perceivable start/end.
  - `PartnersScroll` now uses `Marquee`, gives every logo a white chip (`bg-white`) for guaranteed contrast against any background, and the section background becomes `dark:bg-primary` (brand orange) in dark mode only.
- **Consequences:** One direction, constant speed, no scroll-driven reversal. Removed the old triple-array + scroll-direction logic. Old unused `animate-scroll-left/right` keyframes left in `index.css` (harmless, no longer referenced).

## DEC-010 — Restore Academy hero background video (superseded target page — see DEC-013)

- **Date:** 2026-08-21
- **Status:** superseded
- **Context:** An earlier unmerged branch (`redesign/reference-engineering-system`) had a video background (`academy-hero-student-success.mp4`) on the Academy hero; the version that landed on `main` replaced it with SVG patterns only and the asset was never carried over into `public/`.
- **Decision:** Recovered the original video blob from git history and restored it to `public/academy-hero-student-success.mp4`. Added it as an absolutely-positioned `<video autoPlay muted loop playsInline>` behind the existing SVG pattern + gradient overlay on the (then-current) Academy hero, using `src/assets/academic-hero.jpg` as the poster.
- **Consequences:** The specific `AcademicPage.tsx` this targeted was itself replaced by the DEC-011 Academy editorial redesign before this branch merged (see DEC-013 merge note). The restored video **asset** was not superseded — it's still needed, and is now used by the new `AcademyStory` section instead of the old hero.

## DEC-011 — Academy micro-brand: warm editorial palette via scoped CSS tokens

- **Date:** 2026-08-21
- **Status:** accepted
- **Context:** User asked for the Academy page to feel distinct from the dark, cinematic agency pages, and to showcase "academy memories" photography, using an educational-site reference (warm cream, serif display type, photo-led editorial layout) as inspiration.
- **Decision:** Give `/academic` its own light, cream, serif (Fraunces) editorial identity, independent of the site-wide dark/light toggle — analogous to how the home Hero always forces a dark look regardless of theme. Implemented by wrapping the page's `<main>` in an `.academy-scope` class that re-points the shadcn semantic tokens (`--background`, `--foreground`, `--card`, `--muted`, `--border`, `--input`) to a warm cream/ink palette; ordinary `bg-background` / `text-foreground` / `bg-muted` utilities (and any nested shadcn primitive, e.g. the shared `LeadForm`'s `Input`/`Textarea`/`Button`) automatically pick up the right colors with zero per-component overrides. `--primary` (brand amber) is left untouched so CTAs still read as FuseLabs. `Navbar` gained an `overLightHero` case (mirroring the existing `overDarkHero` case for the home hero) so the floating nav renders dark ink text while unscrolled over the Academy hero photo, instead of the theme's light-on-dark default.
- **Consequences:** Toggling dark/light mode has no visible effect on the Academy page content (by design — it's a fixed micro-brand). Any future page wanting a similar treatment can reuse the `.academy-scope` pattern. New photography (`src/assets/academy/*`) generated and compressed (~140–185 KB each) to represent cohort life since no real photos were available; call out if/when real academy photos should replace them.

## DEC-012 — Hero particle field evolved into a layered galactic space scene

- **Date:** 2026-08-22
- **Status:** accepted
- **Context:** User liked the existing hero particle motion (the rotating amber/cream/heat sphere from DEC-006) but wanted it to feel more like "galactic space particle stuff" — richer, more cinematic, more like looking into deep space.
- **Decision:** Kept the rotating 3D particle sphere (now framed as the hero's "energy core") and layered it on top of three new canvas passes in `FusionField`: (1) a full-viewport twinkling starfield (~220 desktop / 90 mobile points, varied depth/size/color — mostly warm cream/amber with a few cool blue-white "distant stars" — with slow autonomous drift plus mouse parallax scaled by depth), (2) 3 large, slowly drifting soft nebula gradient wisps (amber + heat + one subtle violet for cool contrast) rendered behind the starfield, and (3) rare, randomly-spawned shooting-star comets (desktop only, capped at 2 concurrent) with a fading trail. Reduced-motion and mobile-perf behavior preserved: comets and heavy motion are skipped under `prefers-reduced-motion` / on small screens, and a single static frame is still drawn in that case.
- **Consequences:** Slightly more canvas work per frame (measured steady 60fps in testing); no new dependencies. The brand's warm amber/heat palette stays dominant — the violet wisp and blue-white stars are a light accent, not a palette change.

## DEC-013 — Merge conflict: two independent rewrites of `AcademicPage.tsx` (conflicting intent)

- **Date:** 2026-08-22
- **Status:** accepted
- **Context:** This branch (`cursor/dark-sections-marquee-be27`, DEC-010) restored a background video on the *original*, video/SVG-pattern/hardcoded-course-cards `AcademicPage.tsx`. Independently, `main` (DEC-011) fully replaced that same file with a new modular, CMS-backed, cream-editorial page (`AcademyHero`/`AcademyMission`/`AcademyTracks`/.../`AcademyStory`). Both branches edited the entire file with mutually exclusive visions — this is a genuine conflicting-intent conflict, not a mechanical one.
- **Decision:** Kept `main`'s editorial redesign as the resolution (it fully supersedes this branch's goal — the restored video asset is preserved and is now played by the new `AcademyStory` section instead of the old hero). This branch's Academy-page-specific diff was dropped; its non-Academy-page changes (home section rhythm, dark-mode darkening, seamless marquee) were kept.
- **Consequences:** None of this branch's Academy-page UI changes are visible; only the video **asset** it restored survives, now serving a different section. Flagged to the requesting user as a judgment call rather than a mechanical resolution — revert this specific choice if a different outcome is wanted.

## Template

```markdown
## DEC-XXX — title
- **Date:**
- **Status:** proposed | accepted | superseded
- **Context:**
- **Decision:**
- **Consequences:**
```