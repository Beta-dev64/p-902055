## 2026-08-22 (Galactic hero particle field)

- Evolved the home hero's `FusionField` canvas from a single rotating particle sphere into a layered galactic space scene: a full-viewport twinkling starfield with depth-based parallax and drift, three slowly drifting soft nebula gradient wisps (amber/heat + a subtle violet accent for cool contrast), and rare shooting-star comets (desktop only)
- Kept the original rotating amber/cream/heat particle sphere as the scene's "energy core," now twinkling slightly too
- Verified steady 60fps, no new console errors, and correct behavior under `prefers-reduced-motion` and on mobile (comets + starfield density scaled down)

## 2026-08-21 (Academy editorial redesign)

- Full redesign of `/academic`: warm cream, serif (Fraunces) editorial identity — deliberately distinct from the dark, cinematic agency pages — inspired by a boutique-school reference site
- New `.academy-scope` CSS token override (index.css) so semantic `bg-background`/`text-foreground`/`bg-muted` utilities and any nested shadcn form primitives (via the shared `LeadForm`) render in the cream palette without per-component overrides; `--primary` amber left untouched
- New sections: `AcademyHero` (full-bleed photo + in-page anchor nav), `AcademyMission`, `AcademyTracks` (tabbed program switcher wired to the live `academy_programs` Supabase table), `AcademyQuote` (live testimonial), `AcademyStory` (video), `AcademyMemories` (**photo grid of generated academy-life photography** — cohort collaboration, mentor session, demo day, group photo), `AcademyInsights` (curriculum outcomes per track), `AcademyEnroll` (shared `LeadForm`, pre-filled from the selected track), `AcademyClosing` (dark closing band bridging into the site footer)
- Generated 7 new warm/candid documentary-style photos for the hero and memories grid (`src/assets/academy/`), resized/compressed to ~80–185 KB each
- `Navbar` generalized with an `overLightHero` case (mirrors `overDarkHero`) so the floating nav uses dark ink text over the new light Academy hero instead of the theme's light-on-dark default
- Added `academy_programs`-backed `useAcademyPrograms` hook; Academy page now reads real CMS program data (price, duration, syllabus, outcomes) instead of a hardcoded array
- Added Fraunces serif font (scoped to `font-academy`) for Academy display type only

## 2026-08-18

- Rebuilt landing hero after dark-premium references (ANKAR / Resend / Lugano / Obsidian language)
- Full-viewport cinematic hero: molten fusion canvas, oversized Cabinet Grotesk, dual pill CTAs
- Desktop floating glass pill nav; mobile keeps fullscreen overlay
- Hero stays dark regardless of theme; amber reserved for CTA, “grows”, and 60-day badge
- New fusion-ring mark + FuseLabs IO wordmark; Space Grotesk body, Syne (extra-wide at heavy weights) for display/logo

## 2026-08-08

- Fixed blank-page CSS build failure: removed `@apply prose-invert`; theme prose via CSS vars; registered `@tailwindcss/typography`
- Themed scrollbar + footer/showcase/features/testimonials surfaces to semantic tokens
- Browser-verified: ScrollToTop, nav-fullscreen-link hover, btn-motion, Reveal, case-study banner clearance (`pt-[7.5rem]` / `sm:pt-36`), dark `bg-background`
- Cloned upstream repo into project; branch `redesign/ose-builds`
- Added FuseLabs CSS color scales + Tailwind bridges
- Added `ThemeProvider` (default dark) + `ThemeToggle`
- Rebuilt `Navbar` as full-screen overlay nav (amber light / void dark)
- Fonts: Cabinet Grotesk (display) + Outfit (body)
- Dark-mode grain overlay enabled

## 2026-08-07

- Created project folder, REQUIREMENTS.md, and `.agent` trackers
