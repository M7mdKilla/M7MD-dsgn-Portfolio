# CHANGELOG — M7MD.dsgn

## [1.1.0] - Navigation, 3D Orbit & Transition Polish

### Added & Improved
- **Right-Side Vertical Navigation**:
  - Replaced generic dots with 5 minimal outline icons: Home (`Home`), Work (`Layers`), About (`UserRound`), Services (`LayoutGrid`), and Contact (`Send`).
  - Vertically elongated, narrower rail with increased icon breathing room.
  - Active section indicator with neon lime background, soft lime glow, and localized tooltip labels on hover/focus.
  - Full two-way synchronization with top navigation.
- **Bottom-Left Contact Shortcuts**:
  - Replaced text pill dock with two compact icon-only circular buttons stacked vertically (WhatsApp and Email).
  - Subtle lime-glow hover states and tooltips.
  - Fully accessible with fixed positioning that never overlaps hero copy or CTAs.
- **Portrait Composition & Asset Architecture**:
  - Configured standalone transparent half-body PNG asset at `public/images/profile-portrait.png`.
  - Added centralized configuration in `src/config/siteConfig.ts` for scale, crop, and object-position.
  - Created standalone `README_PORTRAIT.md` with clear instructions for updating the portrait without code changes.
- **Real 3D Orbiting Badges with Physical Depth Layering**:
  - Removed flat text labels and created 6 standalone transparent 3D dark glass badge assets under `public/images/orbit/` (Photoshop, Illustrator, ChatGPT, Google Gemini, Instagram, Facebook).
  - Implemented dual-layer 3D depth system (`back` and `front` orbit planes relative to the portrait).
  - Badges physically travel behind the portrait and in front of the lower torso without ever obscuring the face.
  - Smooth continuous orbital speeds between 19s and 28s per orbit with perspective depth scaling (0.74 to 1.08) and lime-green light accents.
- **Premium Fluid Section Transitions**:
  - Upgraded section transitions to a 750ms spring-like easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) with subtle temporary blur, directional elevation, and masked clip-path reveals.
  - Staggered entrance delays (`transition-stagger-1` through `transition-stagger-4`) for headers, body copy, CTAs, and cards.
  - Full `prefers-reduced-motion` compliance.

---

## [1.0.0] - Initial Release

- Independent full-screen view system (Home, Work, About, Services, Contact).
- 3-Zone top navigation synchronized with side navigation.
- Hybrid portfolio experience with Masonry grid for Static Designs and video lightbox for Motion & AI.
- Arabic (RTL) & English (LTR) bilingual switcher.
- Initial project guides and unit tests.
