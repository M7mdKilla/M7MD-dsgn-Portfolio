# M7MD.dsgn — Portfolio Website

Premium personal creative portfolio and lead-generation website for **M7MD.dsgn**, specializing in:
> **"Social Media Design · Motion · AI"**

---

## ⚡ Overview

Built as a lightweight, static-friendly, high-performance portfolio for prospective commercial clients to discover the designer's work, browse clients and projects, review service packages, and submit project inquiries.

### Key Highlights
- **Independent Full-Screen Views**: Home, Work, About, Services, and Contact operate as distinct viewport views with smooth directional transitions—not one long stacked scrolling page.
- **Synchronized Dual Navigation**: Top menu and vertical side dots remain in two-way sync with animated neon lime indicators and tooltip labels.
- **Hero & Orbital Badges**: Brand statement and replaceable portrait placeholder framed by floating, rotating 3D dark-tile badges (Photoshop, Illustrator, Gemini, ChatGPT, Instagram, Facebook).
- **Two Core Disciplines**:
  1. *Static Designs* (Masonry grid preserving authentic artwork ratios)
  2. *Motion & AI* (Click-to-play video cards with polished modal lightbox)
- **Full Arabic (RTL) & English (LTR)**: Instant one-click switcher with translated metadata, forms, and navigation.
- **Designer-Friendly Content**: No complex backend or database; content is managed in simple TypeScript/JSON data files and public folders.
- **Zero White Surfaces**: Near-black/charcoal dark palette with electric neon lime accents.

---

## 🚀 Getting Started

### Requirements
- Node.js 18+
- npm or bun

### Local Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
```
Generates an exportable, static distribution in `dist/`, deployable directly to Cloudflare Pages, Vercel, Netlify, or GitHub Pages.

---

## 📁 Project Structure

```text
├── public/
│   ├── images/
│   │   ├── profile-portrait.svg   # Replaceable portrait placeholder
│   │   └── portfolio/             # Portfolio artworks & video posters
├── src/
│   ├── config/
│   │   └── siteConfig.ts          # Central brand, portrait, and contact config
│   ├── data/
│   │   └── portfolioData.ts       # Projects catalog & client showcase
│   ├── locales/
│   │   └── translations.ts        # English & Arabic bilingual dictionary
│   ├── utils/
│   │   ├── portfolio.ts           # Pure logic for filtering, form validation, and URLs
│   │   └── portfolio.test.ts      # Unit tests
│   ├── components/
│   │   ├── BrandLogo.tsx          # 7-arrow glyph brand mark
│   │   ├── Navbar.tsx             # 3-zone top navigation
│   │   ├── SideNavDots.tsx        # Vertical side navigation dots
│   │   ├── OrbitBadges.tsx        # 3D dark-tile orbiting creative tools
│   │   ├── HomeHero.tsx           # Split hero section with portrait & orbit
│   │   ├── WorkSection.tsx        # Featured, Clients, and Masonry portfolio
│   │   ├── MediaLightbox.tsx      # High-res image & video modal
│   │   ├── AboutSection.tsx       # Creative intro, philosophy, and tools
│   │   ├── ServicesSection.tsx    # Static Design and Motion & AI offerings
│   │   ├── ContactSection.tsx     # Direct WhatsApp/email & 7-field inquiry form
│   │   └── ContactDock.tsx        # Fixed bottom-corner quick shortcuts
│   ├── App.tsx                    # Viewport orchestrator & transitions
│   ├── main.tsx
│   └── index.css
├── CONTENT_GUIDE.md               # Guide for updating images, clients, and projects
├── DESIGN_SYSTEM.md               # Design tokens, typography, and motion rules
├── PROJECT_GUIDE.md               # Instructions for AI and developer maintenance
└── CHANGELOG.md                   # Version and change history
```
