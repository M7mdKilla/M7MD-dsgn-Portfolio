# M7MD.dsgn — Master Project Reference

**Document version:** 1.2  
**Status:** Approved product and design direction; implementation in progress  
**Purpose:** Portable source of truth for any AI website builder or developer. This document is independent of Google AI Studio, Gemini, Claude, Replit, GitHub, or any hosting provider.

---

## 1. Project purpose

Build a polished personal portfolio website for **M7MD.dsgn**, a social-media-focused graphic designer working across:

- **Static Designs** — static social media posts and campaign graphics.
- **Motion & AI** — motion graphics, animated videos, and AI-assisted creative video work.

The website's primary business purpose is to help prospective clients understand the designer's visual quality, browse relevant work, review previous clients, and contact the designer or submit a project inquiry.

This is primarily a **showcase and lead-generation website**, not a complex web application or client-management platform.

## 2. Brand identity

- **Brand name:** `M7MD.dsgn`
- **Primary tagline:** `Social Media Design · Motion · AI`
- **Brand mark concept:** The numeral **7** is the distinctive visual element. The arrow indicating launch, forward movement, and growth should be integrated into the typographic construction of the 7 itself—not look like a separate decorative arrow. The final logo artwork is not yet approved; treat this as a direction, not a finished logo.
- **Primary palette:** black / near-black / charcoal with **neon lime green** as the signature accent.
- **No white theme:** do not use white page backgrounds, white cards, white navigation tabs, or white navigation indicators. Use near-black, charcoal, dark gray, muted gray text, and lime accents. Light gray text is allowed for readability; the visual theme remains dark.
- **Typography direction:** a combination of Modern Geometric and Bold Condensed for impactful headings, with a calm, highly readable body font. Arabic and English fonts must pair well and remain legible.
- **Brand personality:** bold, dynamic, creative, modern, confident, premium, and technically aware—without looking noisy or gimmicky.

## 3. Languages and directionality

The public website must support **Arabic and English** with a visible language switcher.

- Arabic must use true RTL layout and suitable Arabic typography.
- English must use true LTR layout.
- Navigation, labels, buttons, project metadata, forms, and all interface text must be translated—not only the hero.
- Preserve the selected language while navigating within the site.
- Use central translation/content dictionaries so language text is easy to maintain.
- The approved English tagline remains exactly: `Social Media Design · Motion · AI`.
- The Arabic version of the tagline is not approved yet; do not invent a permanent Arabic translation. Keep it configurable for later approval.

## 4. Information architecture and navigation

Top navigation order:

1. Home
2. Work
3. About
4. Services
5. Contact

There must also be a **vertical side navigation made of dots/indicators**. It is functional navigation, not decoration.

- Every side dot maps to the corresponding top-menu destination.
- Clicking a top-menu item updates the active side dot.
- Clicking a side dot updates the active top-menu item.
- The active destination must be unmistakable using lime color, shape, or a subtle animated indicator.
- On hover and keyboard focus, show the destination name as a small tooltip/label.
- Navigation must work with keyboard and touch, not only mouse hover.
- A compact persistent contact dock may provide WhatsApp and email shortcuts, provided it does not obstruct content.

### Screen-based navigation (important)

The website should behave like a set of **independent full-screen sections / views**, not one long landing page with every section stacked vertically.

- The Home view occupies the initial viewport and must not reveal the next sections by ordinary page scrolling.
- Moving between Home, Work, About, Services, and Contact happens through the navigation controls, with animated transitions.
- Keep each primary view within the viewport where practical (`100svh`/viewport-aware layout).
- If a Work gallery contains more items than fit on screen, scrolling may happen **inside the Work view/gallery region only**. It must not turn the entire site into a long stacked page.
- Avoid accidental document-level vertical scrolling on the Home view.
- On smaller screens, adapt the navigation and internal content without losing the section-based experience. Do not rigidly force desktop composition onto mobile.

## 5. Home / Hero view

The first screen should immediately communicate the designer's identity and look visually alive.

### Composition

- Make `M7MD.dsgn` and the tagline prominent.
- Keep the text/brand on one side and a personal portrait composition on the other side for desktop.
- The portrait will be supplied by the owner later. **Do not invent, generate, or hardcode a fake real-person portrait.** For now, use an elegant neutral silhouette or a well-designed portrait placeholder.
- The image must be replaceable without changing application code. Use a standalone asset path such as `public/images/profile-portrait.webp` and one central content/config setting referencing it.
- Include configurable image crop, scale, and position values (for example, object-position and scale) in one easy-to-find configuration file.
- Document exactly how to replace the portrait later by replacing the same file or updating one central path.

### Orbital creative tools / social icons

Create a tasteful orbital visual around the portrait. Use recognizable vector/SVG brand marks or a reliable icon source for:

- Adobe Photoshop
- Adobe Illustrator
- Google Gemini
- ChatGPT / OpenAI
- Instagram
- Facebook

Visual treatment:

- Each icon sits inside a small, dark, premium 3D-style floating badge with restrained lime highlights, depth, and soft shadow/glow.
- Arrange the badges along one or two carefully composed orbital paths around the portrait.
- Use gentle rotation/orbit and subtle floating motion, optionally with slightly different speeds and directions.
- Keep the portrait dominant and the face unobstructed.
- Avoid clutter, overly fast rotation, visual noise, or icons appearing randomly scattered.
- Use a mobile adaptation with fewer visible orbiting elements or a simplified composition so nothing clips or overlaps.
- Respect `prefers-reduced-motion`; provide a static or greatly reduced-motion presentation when requested.

The orbiting icons are decorative brand/creative-tool cues, not links unless explicitly configured.

## 6. Motion, transitions, and interaction quality

The prototype must not feel like a static mockup. Motion is an important part of the brand experience.

Approved direction: **Subtle & Premium as the foundation, with Dynamic & Creative accents.**

Use a coordinated transition system:

- Smooth outgoing and incoming section transitions; never replace a section instantly.
- Combine restrained opacity, directional movement, slight blur, layered overlap, and optional mask/clip reveals where they improve the visual flow.
- Stagger heading, supporting text, buttons, and hero visual entrances.
- Use polished easing curves and consistent timing. Keep transitions fast enough to feel responsive, not slow or theatrical.
- Animate the active navigation indicator.
- Give cards and buttons refined hover/focus micro-interactions.
- Add small depth/parallax accents only where they improve the composition.
- Animate the portrait-orbit system smoothly and continuously, but subtly.
- Avoid abrupt cuts, default browser-like tab switching, excessive zoom, constant large movement, or heavy effects that distract from the work.
- Maintain performance and accessibility; respect reduced-motion preferences and avoid making important content inaccessible during animation.

The implementation may use a suitable lightweight motion library if already available or if genuinely needed, but do not introduce unnecessary dependencies.

## 7. Work experience — hybrid showcase

The Work experience should combine:

1. **Featured Works first:** visually compelling selected projects.
2. **Clients showcase:** names/logos of previous clients.
3. **Full Portfolio:** browse and filter all projects by the two approved categories and by client.

All client names and logos may be shown publicly by default, but allow individual clients/projects to be hidden if confidentiality or a specific client request requires it.

### Category structure

There are exactly **two main categories**:

- `Static Designs`
- `Motion & AI`

Do not create separate top-level Motion and AI categories or filters in this version.

### Static Designs gallery

- Use **Masonry Grid**: variable image heights and sizes, visually similar in spirit to Pinterest, while retaining a premium art-directed finish.
- Do not use the previously considered Editorial Layout as the chosen default.
- Preserve each artwork's original aspect ratio as far as practical. Avoid destructive cropping.
- Use generous spacing and dark surfaces; no white cards or backgrounds.
- Provide client filtering and a clean image-detail/lightbox experience.
- The layout should be responsive and reorganize elegantly on mobile.

### Motion & AI gallery

- Use large video cards with a clear poster/preview image and a prominent play button.
- Do not autoplay video with sound.
- The viewer intentionally starts playback by clicking/tapping.
- Provide a polished lightbox/modal or dedicated video view.
- Ensure posters load quickly and video playback controls are usable.
- Support filtering by client, but keep the category taxonomy as the single combined category `Motion & AI`.

### Client pages / groupings

Each client can have:

- Client name
- Logo (optional)
- Short description
- Optional cover/thumbnail
- Related Static Designs projects
- Related Motion & AI projects

Client pages should visually organize their work without requiring a database or a complex content-management backend.

## 8. About and Services

Create distinct full-screen views for About and Services.

- About should provide editable biography/introduction content, approach, and relevant skills.
- Services should explain the available services clearly, centered on Static Social Media Design and Motion & AI.
- Do not invent awards, years of experience, client results, testimonials, or credentials. Use editable placeholders until the owner supplies real information.

## 9. Contact and inquiries

Primary contact methods:

- WhatsApp direct link.
- Email contact.
- A project inquiry form.

Approved inquiry form fields:

1. Name
2. Company / brand name
3. Email or contact number
4. Requested service (Static Designs / Motion & AI)
5. Project description
6. Expected budget
7. Desired delivery date

### Keep the backend simple (important)

The user explicitly does **not** want a complex backend.

Do not build:

- A custom backend/server for inquiries
- A database for leads
- A CRM
- A request-management dashboard
- User registration or client accounts
- A custom admin dashboard

Use a simple external form-to-email service (to be selected/configured later) or a clearly documented email-based fallback. Do not pretend the form sends successfully until a real destination/service has been configured. Keep service keys or endpoints out of source control. WhatsApp and email buttons should be driven by editable configuration values; do not invent phone numbers or email addresses.

## 10. Content and asset management — designer-friendly, no coding required

The owner is a graphic designer with general familiarity with folders and files, but is not a programmer. All future content updates must be possible through simple, documented steps and AI-assisted edits.

There is no requirement for a web-based upload/admin interface in the current version.

Use a straightforward, portable content workflow:

- Keep client/project metadata in one clearly named central content file or a small set of obvious files.
- Keep images, logos, thumbnails, and videos in a predictable public assets folder.
- Organize project media by client and category.
- Provide an easy-to-follow folder convention and a plain-language `CONTENT_GUIDE.md`.
- Make it easy for an AI tool to add a client/project by editing the content data and placing media in the correct folder.
- Avoid scattering content details across many components.
- Provide a clear portrait-replacement instruction.
- Do not require the user to manually write code; AI-assisted edits should be the normal workflow.

Suggested folder convention (the exact framework paths may differ, but keep the structure clear):

```text
public/
  images/
    profile-portrait.webp
    clients/
      client-name/
        logo.webp
        static/
          project-01.webp
          project-02.webp
        motion/
          project-01-poster.webp
          project-01.mp4
```

Project data should be stored separately from media files and should include title, client, category, description, media path(s), thumbnail/poster, featured status, and visibility.

## 11. Technical approach and portability

Build a **portable, standards-based frontend** that can be exported and hosted independently of Google AI Studio.

Preferred lightweight direction:

- React + TypeScript + Vite, or another similarly portable static-friendly setup if the AI builder has a strong reason.
- Static frontend output suitable for hosting on common static hosting platforms such as Cloudflare Pages, GitHub Pages (with correct routing setup), or Vercel.
- Keep dependencies lean and mainstream.
- No platform-specific proprietary runtime dependency.
- No database or custom server in the current scope.
- Keep the project source readable and organized for future AI-assisted maintenance.
- Keep environment-specific values separate from source code.

Do not attempt GitHub connection, repository creation, billing changes, or deployment during the initial build. The user will handle those later after reviewing the local preview.

## 12. AI portability and project documentation

The project must include these human- and AI-readable documents:

- `README.md` — what the project is and how to run/build it.
- `PROJECT_GUIDE.md` — instructions for any AI tool joining the project; current goals, key constraints, and how to make safe changes.
- `DESIGN_SYSTEM.md` — colors, typography, components, spacing, interaction and motion rules.
- `CONTENT_GUIDE.md` — how to add/edit clients, projects, images, videos, and the portrait without coding.
- `CHANGELOG.md` — record of meaningful changes.
- `.env.example` only if environment configuration is genuinely needed; never include real secrets.

Any AI tool modifying the project must read `PROJECT_GUIDE.md` and relevant documentation first, preserve existing features, make focused changes, test the result, and update the changelog when appropriate.

## 13. Quality requirements

- Excellent desktop, tablet, and mobile layouts.
- Smooth navigation and no broken section links.
- Side dots and top navigation always stay synchronized.
- No unintended full-page vertical scroll on Home.
- No white theme surfaces or white navigation tabs.
- No abrupt section changes.
- Portrait path is replaceable and documented.
- Orbit icons are recognizable, restrained, and responsive.
- Static masonry preserves artwork proportions.
- Motion cards use poster + click-to-play.
- Arabic RTL and English LTR both work correctly.
- Images lazy-load where appropriate; avoid loading all videos at once.
- Keyboard focus, accessible labels, and reduced-motion support.
- No fabricated personal details, testimonials, clients, awards, contact details, or portfolio claims.
- Use clearly marked demo placeholders only where necessary to show layout.

## 14. Latest requested iteration — highest priority

The next implementation pass must focus on these exact items before expanding other pages:

1. Make the side navigation dots functional and synchronized with the top menu; add clear active state and hover/focus labels.
2. Improve the transition system substantially with smooth layered overlap, coordinated exit/entry, opacity, subtle movement/blur/mask reveals, and staggered content—not abrupt switching.
3. Refine the palette to black/charcoal + neon lime only; remove white tabs/cards/surfaces.
4. Redesign the Home hero: brand and tagline on one side; replaceable portrait placeholder on the other; create orbiting Photoshop, Illustrator, Gemini, ChatGPT, Instagram, and Facebook icon badges around the portrait.
5. Add a central portrait asset/config so the owner can replace the image in the future without editing components or adding a backend.
6. Preserve the independent full-screen section navigation; do not stack all sections vertically under Home.
7. Keep all existing working behavior; do not rebuild or discard the current work if an existing project is available. If starting a new project in a new account, reconstruct the approved overall direction from this document.

## 15. Working style with the owner

- The owner is a designer, not a software developer.
- Explain actions in plain language and provide clear UI steps.
- Do not ask the owner to write or debug code.
- Prefer small, visible iterations and a preview after each meaningful change.
- Do not send the owner into unnecessary GitHub, billing, or hosting workflows while visual design is still being reviewed.
- Do not claim a feature works until it has been tested.
- Keep decisions and project context portable so a different AI tool can continue the work.

---

**This document is the current source of truth. If an older prompt, prototype, or generated file conflicts with it, follow this document.**
