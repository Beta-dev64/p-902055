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
