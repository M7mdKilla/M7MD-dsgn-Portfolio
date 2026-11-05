# Replacing Your Profile Portrait — M7MD.dsgn

This website is engineered for **effortless portrait replacement** with **zero code modifications** and **no backend or admin panel required**.

---

## Quick Replacement (1 Step)

1. Save your transparent half-body photo as a PNG named:
   ```text
   profile-portrait.png
   ```
2. Place (or overwrite) the file at:
   ```text
   public/images/profile-portrait.png
   ```
3. Refresh your browser preview. That's it!

---

## Recommended Photo Guidelines

- **Format**: Transparent background `.png` (cutout / removed background).
- **Composition**: Half-body shot (chest and shoulders up, facing forward or slight 3/4 turn).
- **Dimensions**: Vertical orientation (recommended 600×800px or 800×1000px).
- **Lighting**: Cinematic or directional studio lighting (warm or cool rim light harmonizes with the dark lime theme).

---

## Fine-Tuning Position, Scale, or Crop (Optional)

If your photo needs adjustment (e.g. shift up/down or zoom), open `src/config/siteConfig.ts`:

```typescript
portrait: {
  src: "/images/profile-portrait.png",
  scale: 1.05,            // Increase (e.g. 1.1) to zoom in, decrease (e.g. 0.95) to zoom out
  objectPosition: "center 22%", // Adjust vertical alignment: "center 15%" (higher) or "center 30%" (lower)
}
```

No other files or components need to be changed.
