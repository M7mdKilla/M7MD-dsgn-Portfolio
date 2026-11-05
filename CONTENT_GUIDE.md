# CONTENT GUIDE — M7MD.dsgn

This guide is written in plain language for graphic designers and AI assistants. You do not need to write complex code to update your portfolio, add new projects, or replace your portrait.

---

## 1. How to Replace Your Profile Portrait

When you are ready to upload your real portrait:

1. Prepare your photo:
   - **Format**: Transparent background `.png` (cutout / removed background).
   - **Composition**: Half-body shot (chest and shoulders up, facing forward or slight 3/4 turn).
   - **Dimensions**: Vertical orientation (recommended 600×800px or 800×1000px).
2. Place (or overwrite) the file at:
   ```text
   public/images/profile-portrait.png
   ```
3. Open `src/config/siteConfig.ts` if you want to fine-tune scale or vertical alignment:
   ```typescript
   portrait: {
     src: "/images/profile-portrait.png",
     scale: 1.05,            // Increase to zoom in, decrease to zoom out
     objectPosition: "center 22%", // Adjust vertical position
   }
   ```
   *No other file needs to be modified!* See `README_PORTRAIT.md` for more details.

---

## 2. Replacing or Adding 3D Orbital Icons

Each orbiting tool badge is an independent transparent 3D asset located at:
```text
public/images/orbit/
  ├── photoshop.svg
  ├── illustrator.svg
  ├── chatgpt.svg
  ├── gemini.svg
  ├── instagram.svg
  └── facebook.svg
```

You can replace any of these SVGs or PNGs with custom 3D renders using the same file names. The orbital depth layering system will automatically animate them along the back and front planes of your portrait.

To tweak orbital speeds or radiuses, adjust `orbitIcons` in `src/config/siteConfig.ts`.

---

## 3. How to Add a New Project

Open `src/data/portfolioData.ts`. Add a new item to `PORTFOLIO_ITEMS`:

```typescript
{
  id: "my-new-project-slug",
  title: "Project Title in English",
  titleAr: "عنوان المشروع بالعربية",
  clientId: "zenith", // ID of the client (from CLIENTS list)
  clientName: "Zenith Specialty Coffee",
  category: "static", // Must be either 'static' or 'motion-ai'
  aspectRatio: "4:5", // '4:5' | '1:1' | '16:9' | '9:16' | '3:4'
  tagline: "Social Media Campaign Visuals",
  taglineAr: "تصاميم حملة تسويقية رقمية",
  description: "Description of what was crafted and the visual strategy.",
  descriptionAr: "وصف العمل والاستراتيجية البصرية المعتمدة.",
  tools: ["Photoshop", "Illustrator"],
  year: "2026",
  featured: true, // true to show on the Featured Highlights tab
  posterUrl: "/images/portfolio/my_new_project.webp",
  videoUrl: "https://.../video.mp4", // optional for motion-ai projects
  mediaType: "image", // 'image' or 'video'
  accentColor: "#ccff00",
}
```

---

## 4. How to Add a New Client

In `src/data/portfolioData.ts`, add an entry to the `CLIENTS` array:

```typescript
{
  id: "client-id",
  name: "Client Brand Name",
  industry: "Industry in English",
  industryAr: "مجال العمل بالعربية",
  description: "Short summary of the brand.",
  descriptionAr: "نبذة موجزة عن البراند.",
  logoSvgType: "tech",
  confidential: false, // set to true if this client must be hidden from public display
}
```

---

## 5. How to Update Contact Info (WhatsApp & Email)

Open `src/config/siteConfig.ts`:
- Change `whatsappNumber: "+971500000000"` to your real mobile number with country code.
- Change `email: "hello@m7mddsgn.com"` to your real email.

The bottom-left stacked shortcuts and inquiry form will automatically reflect your new contact information.
