# DESIGN SYSTEM — M7MD.dsgn

## 1. Color Palette

| Token | Hex Value | Usage |
|---|---|---|
| Background Canvas | `#09090b` | Primary dark page background |
| Surface Dark | `#121219` | Elevated panels, navbars, side containers |
| Card Dark | `#181824` | Project cards, client cards, form inputs |
| Hairline Border | `#272732` | Subtle section & card dividers |
| Neon Lime Accent | `#ccff00` | Primary brand accent, active indicators, focal CTAs |
| Lime Glow | `rgba(204, 255, 0, 0.25)` | Micro-glows around active dots & primary buttons |
| Primary Text | `#f4f4f5` | Headlines and prominent copy |
| Muted Text | `#a1a1aa` / `#71717a` | Secondary text, tool labels, unboxed metadata |

> **Anti-Slop Rule**: Absolutely NO white cards, white tabs, or generic purple gradients.

---

## 2. Typography

- **Latin Display & Body**: `Plus Jakarta Sans`, modern geometric sans-serif with geometric roundness and high legibility.
- **Arabic Display & Body**: `Alexandria`, modern geometric Arabic typeface with matched x-height and optical balance.
- **Data & Metadata**: `font-mono tabular-nums`, used for aspect ratios, timestamps, and section indexes (`01 // PORTFOLIO`).

---

## 3. Brand Mark

The brand mark features the distinctive numeral **7** with an upward-forward 45° arrow integrated into the diagonal stem, communicating momentum, launch, and growth.

---

## 4. Interaction & Motion Rules

- **Coordinated Section Transitions**: Direction-aware vertical slide (18px) with subtle blur (3px) and 320ms spring easing.
- **Orbital Badges**: Smooth orbital trajectory with 3D z-depth scaling and reduced-motion detection.
- **Hover Micro-interactions**: 150ms border transition to neon lime and subtle elevation.
