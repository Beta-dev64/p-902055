# Assets

Track graphics, video, 3D, and motion assets for the redesign.

---

## Strategy (v1)

| Need | Approach | Tooling |
|---|---|---|
| Hero atmosphere | Procedural WebGL fusion field | Three.js |
| Grain | SVG fractalNoise overlay | CSS `body::after` |
| Case study screens | Real product screenshots | Client assets / existing repo |
| Partner logos | SVG/PNG mono treatments | Existing or request |
| Team photos | Real portraits, editorial grade | Client |
| Optional cinematic hero | Still → Kling → frames | Higgsfield / Nano Banana / Premiere / FFmpeg |

---

## Asset inventory

| ID | Asset | Type | Status | Path / source | Notes |
|---|---|---|---|---|---|
| A-001 | Hero WebGL scene | 3d/code | planned | `src/...` | Molten amber on void |
| A-002 | Grain texture | css | planned | inline SVG | opacity ~0.03–0.04 |
| A-003 | Logo wordmark | brand | planned | TBD | FuseLabs IO |
| A-004 | Partner logos set | image | planned | TBD | Marquee |
| A-005 | Case study media | image | planned | reuse Supabase/public | Treat with CSS |
| A-006 | Team headshots | image | planned | TBD | |
| A-007 | OG / social share image | image | planned | TBD | SEO |

---

## Prompt bank (if generative hero media needed)

### Still (Nano Banana skeleton)

```
Abstract molten metal and circuit fusion core, matte charcoal and amber
(#de8321) materials, no glass, no chrome. Single directional key light upper
left, rim light behind right, ambient occlusion in crevices, subtle dust.
Soft contact glow. Solid background #0e0c0c. Product/tech photography, 3/4 view.
No text, no logos.
```

### Motion (Kling)

```
Slow orbit around fusion core as amber energy pulses through channels.
Smooth, steady, product-film motion. No morphing materials. No text.
```

---

## Treatment rules

- Hero media: directional vignette + restrained grade
- Cards with text on image: brightness 0.5–0.6 + bottom gradient
- Never drop raw untreated photos into layout