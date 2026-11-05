# PROJECT GUIDE — M7MD.dsgn

This document provides explicit guidelines for any engineer or AI assistant working on the M7MD.dsgn codebase.

---

## 1. Primary Constraints & Architectural Invariants

1. **Independent Full-Screen Views (NOT A Stacked Landing Page)**:
   - The Home hero occupies `100svh` and must never reveal other sections on standard vertical scroll.
   - Transitions between Home, Work, About, Services, and Contact are controlled via the top navigation and side dots.
   - Internal scrolling is permitted ONLY inside content-heavy containers (such as the Work gallery).

2. **Synchronized Navigation**:
   - `Navbar.tsx` and `SideNavDots.tsx` must always share the same active section state.
   - Active section is marked with neon lime (`#ccff00`).

3. **Color Palette & Theme Discipline**:
   - Dark theme only: `#09090b` canvas, `#121219` surfaces, `#181822` cards, `#272732` borders.
   - **Zero white surfaces**: No white backgrounds, white cards, or white tabs.
   - Primary accent: Neon lime green (`#ccff00` / `#bef264`).

4. **Category Structure**:
   - Exactly two main categories: `Static Designs` and `Motion & AI`.
   - Never split Motion and AI into separate top-level categories.

5. **Static Masonry & Motion Video Rules**:
   - Static designs must preserve original artwork aspect ratios (no destructive cropping).
   - Motion videos must never autoplay with sound; clicking opens the dedicated lightbox player.

6. **Bilingual Requirement**:
   - Arabic is true RTL (`dir="rtl"`) with proper Arabic typography (`Alexandria` font).
   - English is LTR (`dir="ltr"`) with modern geometric typography (`Plus Jakarta Sans`).
   - Every text element is stored in `src/locales/translations.ts`.

7. **Backend Simplicity**:
   - Do not add complex databases, servers, lead management dashboards, or user accounts.
   - Form inquiries use direct email and WhatsApp triggers.

---

## 2. How to Test Changes

Before committing:
```bash
# 1. Run pure unit tests
npx --yes tsx --test src/utils/portfolio.test.ts

# 2. Check TypeScript and compilation
npm run build
```
