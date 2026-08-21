## 2026-08-21

- Removed the `space-y-4 sm:space-y-8` gap wrapper on the home page; sections now sit flush and alternate `bg-background`/`bg-muted` tone section-to-section (no more visible seam/bar between bands)
- Darkened `.dark` tokens (`--background`, `--card`, `--popover`, `--muted`, `--border`, `--input`, raw `--background-50..400`) to sit closer to the Hero's near-black tone
- Rebuilt `PartnersScroll` on a new seamless `Marquee` primitive (`src/components/ui/marquee.tsx`, Magic UI/shadcn registry pattern, duplicated groups in lockstep — no visible start/end); logos sit on white chips for guaranteed contrast; section background is brand orange (`dark:bg-primary`) in dark mode only
- Restored the Academy hero background video (`public/academy-hero-student-success.mp4`, recovered from an unmerged branch's git history) behind the existing hero content, using `src/assets/academic-hero.jpg` as poster

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
