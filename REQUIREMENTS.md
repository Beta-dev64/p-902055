# FuseLabs IO — Website Requirements

**Project folder:** `C:\Users\DELL\Documents\devs\myapps\fuselabs-io`  
**Existing codebase:** https://github.com/Beta-dev64/p-902055.git  
**Design system:** OSE.builds immersive redesign + rebrand  
**Status tracker:** See [`.agent/`](.agent/)

---

## 1. Objective

The website’s primary objective is to generate qualified software-development leads and convert them into project inquiries or academy enrollments. It does this by explaining who FuseLabs IO is, what problems it solves, how it works, what it has already built, and how a visitor can start a project or sign up for training.

It also serves as a trust and credibility platform: showcasing past work, client testimonials, team members, and a clear process so prospective clients and students feel confident enough to submit a contact or enrollment form.

---

## 2. What FuseLabs IO Is

FuseLabs IO is a software development and growth agency that helps businesses build, launch, and scale digital products. It positions itself as more than a coding shop — it acts as a technical partner that combines product strategy, engineering, growth marketing, and ongoing support.

### Two main arms

1. **Agency / Client Services** — building MVPs, web/mobile apps, cloud/AI solutions, integrations, and DevOps support for startups and growing companies.
2. **Tech Academy** — training beginners into job-ready developers through 3-month online programs in frontend, backend, and AI/ML development.

---

## 3. What the Website Is About

The site communicates that FuseLabs IO helps businesses:

- **Launch faster** — from idea to MVP in about 60 days.
- **Scale smarter** — with systems integration, cloud infrastructure, DevOps, and SEO-aligned technical structure.
- **Grow continuously** — through growth engineering, funnel optimization, SEO, and retention work.
- **De-risk delivery** — with a results-oriented, “if we don’t deliver, you don’t pay” promise.

For the education side, it promotes intensive, project-based, 100% online courses with certificates, expert instructors, and real-world portfolio projects.

---

## 4. Aim / Conversions

Turn visitors into two types of conversions:

1. **Business leads** — founders, startups, and organizations that need custom software, team extension, MVP development, or growth engineering.
2. **Students** — individuals who want to enroll in the FuseLabs IO Academy (frontend, backend, or AI/ML tracks).

Everything on the site is organized to move a visitor from understanding the value proposition to taking action: starting a project, exploring the portfolio, or submitting an academy inquiry.

---

## 5. Information the Website Should Display

### 5.1 Core business information

- Who we are — FuseLabs IO as a software development and growth agency.
- Value proposition — “build, scale, and dominate” with a partner that handles strategy, code, SEO, and growth.
- Risk/reliability promise — fast delivery without sloppy shortcuts, and a pay-for-results guarantee.

### 5.2 Services

- Startup Acceleration (idea → MVP)
- Product Development (custom web/mobile apps)
- Team Extension (on-demand tech squad)
- Growth Engineering (SEO, funnels, retention)
- Systems Integration (payments, logistics, messaging, workflows)
- DevOps Support (deployments, monitoring, security)

### 5.3 Process / how it works

1. Strategy First  
2. Planning & Design  
3. Development & Testing  
4. Launch & Growth  

### 5.4 Portfolio / proof of work

- Case studies with title, description, tags, and link to detailed case-study pages.
- Detailed case-study pages showing:
  - The challenge
  - The solution
  - Project gallery
  - Key results
  - Technologies used
  - Live project link

### 5.5 Academy / training programs

**Course offerings**

| Course | Price | Duration |
|---|---|---|
| Frontend Development | ₦300,000 | 3 months |
| Backend Development | ₦300,000 | 3 months |
| AI/ML Development | ₦450,000 | 3 months |

Also display:

- Course features / syllabus highlights
- Learning format: 100% online, project-based, certificate included
- Why-study-here points: expert instructors, hands-on projects, certification
- Enrollment inquiry form: name, email, phone, course, message

### 5.6 Social proof

- Client testimonials (quote, author, role)
- Team members (name, role, social/portfolio links)
- Partner/client logos scroll

### 5.7 Engagement & contact

- Project inquiry form: first name, last name, email, company website, services of interest, budget range, project details
- Newsletter subscription
- Contact / start-your-project call-to-action

### 5.8 Standard site information

- Navigation: Home, Services, Portfolio, Contact, Academy
- Footer links: Services, Company, Portfolio, Contact, Privacy Policy, Terms of Service
- Social links: Twitter, LinkedIn, GitHub
- Copyright notice

### 5.9 SEO / discoverability metadata

- Page-specific titles and descriptions for Home, Portfolio, Academy, and each Case Study
- Structured data: Organization, WebSite, Course, and Article schemas
- `robots.txt` and `sitemap.xml` for search-engine indexing

---

## 6. Design Mandate

### 6.1 Approach

- **Total redesign and rebranding** using the **OSE.builds** design system
- Immersive, high-end, animation-aware marketing site
- Not a theme paint over Lovable defaults — rebuild marketing surfaces
- Keep useful backend/integration pieces from the existing repo (Supabase forms, data, admin if needed)

### 6.2 Creative direction (OSE triad)

| Question | Direction |
|---|---|
| Dominant mood | Cinematic + industrial tech — warm forge, not cold SaaS purple |
| Memorable moment | Sticky WebGL / abstract “fusion” hero dissolving into warm paper services curtain |
| 3-second message | FuseLabs is the technical partner that builds, ships, and grows — with a pay-for-results backbone |

**One-sentence aesthetic direction:**  
A dark warm-charcoal agency site with molten amber accents, distinctive display + body type, Lenis smooth scroll, and one elaborate hero — dual CTAs for “Start a Project” and “Join Academy.”

### 6.3 OSE non-negotiables

- Accent used in **exactly three primary places**: primary CTA, one hero word/device, one active/progress state
- Fixed SVG **grain overlay** on dark sections
- Asymmetric layouts (45/55, never default 50/50 card grids as the main pattern)
- No Inter / Roboto / Arial / Lato as display fonts
- No purple-on-white / purple-indigo gradient AI-slop
- One elaborate motion moment; quieter scroll reveals elsewhere
- Cards only when they hold interaction or media hierarchy
- Respect `prefers-reduced-motion`

### 6.4 Proposed typography

- Display: Cabinet Grotesk or Clash Display (Fontshare)
- Body / UI: General Sans or Outfit
- Eyebrows: ~11–12px uppercase, tracked

### 6.5 Proposed hero archetype

**WebGL / Three.js abstract fusion field** (Nimbus-adjacent) — optional cinematic still/video later via Higgsfield pipeline.

---

## 7. Color System

Map into Tailwind / CSS variables. Site is **dark-first** with warm cream interrupts.

### 7.1 CSS variables

```css
@layer base {
  :root {
    --text-50: #f2f2f2;
    --text-100: #e6e6e6;
    --text-200: #cccccc;
    --text-300: #b3b3b3;
    --text-400: #999999;
    --text-500: #808080;
    --text-600: #666666;
    --text-700: #4d4d4d;
    --text-800: #333333;
    --text-900: #1a1a1a;
    --text-950: #0d0d0d;

    --background-50: #f3f1f1;
    --background-100: #e7e4e4;
    --background-200: #cfc9c9;
    --background-300: #b7aeae;
    --background-400: #9f9393;
    --background-500: #877878;
    --background-600: #6c6060;
    --background-700: #514848;
    --background-800: #363030;
    --background-900: #1b1818;
    --background-950: #0e0c0c;

    --primary-50: #fcf3e9;
    --primary-100: #f8e6d3;
    --primary-200: #f2cda6;
    --primary-300: #ebb47a;
    --primary-400: #e49c4e;
    --primary-500: #de8321;
    --primary-600: #b1691b;
    --primary-700: #854e14;
    --primary-800: #59340d;
    --primary-900: #2c1a07;
    --primary-950: #160d03;

    --secondary-50: #f9f2eb;
    --secondary-100: #f3e6d8;
    --secondary-200: #e7ccb1;
    --secondary-300: #dbb38a;
    --secondary-400: #cf9963;
    --secondary-500: #c3803c;
    --secondary-600: #9c6630;
    --secondary-700: #754d24;
    --secondary-800: #4e3318;
    --secondary-900: #271a0c;
    --secondary-950: #140d06;

    --accent-50: #f9efeb;
    --accent-100: #f3ded8;
    --accent-200: #e7beb1;
    --accent-300: #db9d8a;
    --accent-400: #cf7c63;
    --accent-500: #c35b3c;
    --accent-600: #9c4930;
    --accent-700: #753724;
    --accent-800: #4e2518;
    --accent-900: #27120c;
    --accent-950: #140906;
  }

  .dark {
    --text-50: #0d0d0d;
    --text-100: #1a1a1a;
    --text-200: #333333;
    --text-300: #4d4d4d;
    --text-400: #666666;
    --text-500: #808080;
    --text-600: #999999;
    --text-700: #b3b3b3;
    --text-800: #cccccc;
    --text-900: #e6e6e6;
    --text-950: #f2f2f2;

    --background-50: #0e0c0c;
    --background-100: #1b1818;
    --background-200: #363030;
    --background-300: #514848;
    --background-400: #6c6060;
    --background-500: #877878;
    --background-600: #9f9393;
    --background-700: #b7aeae;
    --background-800: #cfc9c9;
    --background-900: #e7e4e4;
    --background-950: #f3f1f1;

    --primary-50: #160d03;
    --primary-100: #2c1a07;
    --primary-200: #59340d;
    --primary-300: #854e14;
    --primary-400: #b1691b;
    --primary-500: #de8321;
    --primary-600: #e49c4e;
    --primary-700: #ebb47a;
    --primary-800: #f2cda6;
    --primary-900: #f8e6d3;
    --primary-950: #fcf3e9;

    --secondary-50: #140d06;
    --secondary-100: #271a0c;
    --secondary-200: #4e3318;
    --secondary-300: #754d24;
    --secondary-400: #9c6630;
    --secondary-500: #c3803c;
    --secondary-600: #cf9963;
    --secondary-700: #dbb38a;
    --secondary-800: #e7ccb1;
    --secondary-900: #f3e6d8;
    --secondary-950: #f9f2eb;

    --accent-50: #140906;
    --accent-100: #27120c;
    --accent-200: #4e2518;
    --accent-300: #753724;
    --accent-400: #9c4930;
    --accent-500: #c35b3c;
    --accent-600: #cf7c63;
    --accent-700: #db9d8a;
    --accent-800: #e7beb1;
    --accent-900: #f3ded8;
    --accent-950: #f9efeb;
  }
}
```

### 7.2 Tailwind color map

```js
colors: {
  text: {
    50: 'var(--text-50)',
    100: 'var(--text-100)',
    200: 'var(--text-200)',
    300: 'var(--text-300)',
    400: 'var(--text-400)',
    500: 'var(--text-500)',
    600: 'var(--text-600)',
    700: 'var(--text-700)',
    800: 'var(--text-800)',
    900: 'var(--text-900)',
    950: 'var(--text-950)',
  },
  background: {
    50: 'var(--background-50)',
    100: 'var(--background-100)',
    200: 'var(--background-200)',
    300: 'var(--background-300)',
    400: 'var(--background-400)',
    500: 'var(--background-500)',
    600: 'var(--background-600)',
    700: 'var(--background-700)',
    800: 'var(--background-800)',
    900: 'var(--background-900)',
    950: 'var(--background-950)',
  },
  primary: {
    50: 'var(--primary-50)',
    100: 'var(--primary-100)',
    200: 'var(--primary-200)',
    300: 'var(--primary-300)',
    400: 'var(--primary-400)',
    500: 'var(--primary-500)',
    600: 'var(--primary-600)',
    700: 'var(--primary-700)',
    800: 'var(--primary-800)',
    900: 'var(--primary-900)',
    950: 'var(--primary-950)',
  },
  secondary: {
    50: 'var(--secondary-50)',
    100: 'var(--secondary-100)',
    200: 'var(--secondary-200)',
    300: 'var(--secondary-300)',
    400: 'var(--secondary-400)',
    500: 'var(--secondary-500)',
    600: 'var(--secondary-600)',
    700: 'var(--secondary-700)',
    800: 'var(--secondary-800)',
    900: 'var(--secondary-900)',
    950: 'var(--secondary-950)',
  },
  accent: {
    50: 'var(--accent-50)',
    100: 'var(--accent-100)',
    200: 'var(--accent-200)',
    300: 'var(--accent-300)',
    400: 'var(--accent-400)',
    500: 'var(--accent-500)',
    600: 'var(--accent-600)',
    700: 'var(--accent-700)',
    800: 'var(--accent-800)',
    900: 'var(--accent-900)',
    950: 'var(--accent-950)',
  },
}
```

### 7.3 Semantic usage (OSE)

| Role | Token | Notes |
|---|---|---|
| Page void | `background-950` / `background-900` | Dark base |
| Surface | `background-800` | Lifted panels |
| Body text | warm off-white (`text-50` light / inverted in `.dark`) | Never pure `#fff` as brand default |
| Muted | `text-500`–`text-600` | Labels |
| Primary accent | `primary-500` `#de8321` | Rationed (3 places) |
| Secondary warmth | `secondary-500` | Borders, soft fills |
| Accent heat | `accent-500` | Rare emphasis only |
| Cream interrupt | `background-50` / `primary-50` | Process / academy bands |

---

## 8. Site Map & Routes

| Route | Purpose |
|---|---|
| `/` | Home — full conversion spine |
| `/portfolio` | Case study index |
| `/portfolio/:slug` or case-study route | Case study detail |
| `/academy` | Academy + enrollment |
| `/contact` or `#contact` | Project inquiry |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/admin` | CMS/admin (keep if present; functional chrome only) |

**Nav:** Home · Services · Portfolio · Academy · Contact · CTA “Start a Project”

---

## 9. Home Section Spine

Each section has one job:

1. Loader — brand lockup  
2. Nav — floating glass  
3. Hero — promise + dual CTA + WebGL  
4. Proof strip — 60 days / guarantee / logo marquee  
5. Services — unequal mosaic (6 services)  
6. Process — 4 steps  
7. Portfolio preview — asymmetric tiles  
8. Academy teaser — cream band + 3 tracks  
9. Testimonials — editorial  
10. Team  
11. Final CTA / project form entry  
12. Footer  

**CTA hierarchy:** primary = Start a Project (`primary-500`); secondary = Join Academy (outline).

---

## 10. Technical Baseline (existing repo)

Clone / base from: https://github.com/Beta-dev64/p-902055.git

| Keep | Rebuild |
|---|---|
| Vite + React + TypeScript | Marketing UI / branding |
| Supabase integrations & forms | Visual system + tokens |
| React Router routes | Hero, nav, sections, motion |
| Helmet SEO patterns | Layout composition |
| Zod / react-hook-form schemas | Tailwind theme + grain |
| Admin CRUD if used | Page immersive layouts |
| Case study / portfolio data shapes | Equal-card Lovable chrome |

**Add:** `gsap`, `lenis`, optionally `three`

**Security note:** Existing public repo contains a `.env` — rotate secrets; never commit new secrets.

---

## 11. SEO Deliverables

- Per-page `<title>` + meta description (Home, Portfolio, Academy, each Case Study)
- JSON-LD: Organization, WebSite, Course, Article
- `public/robots.txt`
- `public/sitemap.xml`

---

## 12. Agent Tracking

All implementation progress, errors, features, decisions, and QA live under:

```
.agent/
```

Start with [`.agent/README.md`](.agent/README.md).
