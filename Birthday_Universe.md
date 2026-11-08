# Birthday Universe — Codex Implementation Blueprint

## Goal and deadline
Create a beautiful, personal, mobile-first interactive birthday microsite for **Monday, 9 November 2026**. This document describes a standalone concept; do not merge it with the other birthday projects unless requested. Build a working shareable website first, then an optional WhatsApp Status video.

## Creative concept
A magical night sky of memories, orbiting wishes, and a birthday cake surprise.

## User experience
Enter the universe → stars gather around birthday name → 4–8 photo constellations → tap 3–5 wish planets → tap candles to extinguish → final message and confetti.

### Visual direction
Use a carefully coordinated palette, friendly handwritten accent font with legible body font, soft gradients, hand-drawn doodles, and polished photo framing. Maintain strong text contrast and avoid clutter. Design for 360px-wide Android phones first, then tablets and desktops.

## Animation direction
Twinkling stars in lightweight Canvas/CSS; gentle photo float; orbiting wishes; animated cake candles; short particle burst; reduced-motion alternative.

## Functional requirements
- A personalized recipient name, sender name, final birthday note, 4–8 photos with captions, and 3–5 short wishes, all editable in one configuration file.
- Tap-friendly Next/Back navigation and replay; no gestures required to complete the experience.
- Optional music with an explicit play/mute control; never autoplay audio before interaction.
- Accessible buttons, keyboard controls, image alt text, and `prefers-reduced-motion` support.
- Optimized images (WebP/AVIF where possible), lazy loading, and graceful missing-asset fallbacks.
- Share button using the Web Share API with copy-link fallback.
- Public HTTPS deployment on Vercel or Netlify; no database or login needed.

## Suggested stack and components
**Stack:** Next.js, React, TypeScript, Tailwind CSS, Motion for React; custom SVG doodles and lightweight CSS/Canvas effects. Avoid heavy 3D dependencies for MVP.

**Core components:** Starfield, UniverseEntrance, BirthdayReveal, PhotoConstellation, WishOrbit, CandleCake, Finale, MusicToggle, ShareButton, ProgressIndicator.

**Suggested structure:** `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/`, `src/content/birthday.ts`, `public/photos/`, `public/audio/`, `public/og/`.

## Editable content example
```ts
export const birthday = {
  friendName: 'FRIEND_NAME',
  senderName: 'YOUR_NAME',
  birthdayDate: '2026-11-09',
  finalMessage: 'Write a personal birthday message here.',
  photos: [
    { src: '/photos/01.webp', alt: 'Describe the photo', caption: 'A favorite memory' },
    { src: '/photos/02.webp', alt: 'Describe the photo', caption: 'A moment worth keeping' },
  ],
  wishes: ['More laughter', 'New adventures', 'Beautiful surprises'],
  musicSrc: '/audio/music.mp3',
  publicUrl: 'https://YOUR-SITE.example',
};
```
Replace placeholders before launch. Never invent real memories or use personal photos without permission.

## WhatsApp delivery
**Website:** Create a 1200×630 social-preview image and set absolute HTTPS `og:image`, plus `og:title`, `og:description`, `og:url` and canonical metadata. A WhatsApp chat link preview may display the image and title, but preview generation/caching is not guaranteed. The interactive site opens in a browser; WhatsApp Status cannot embed the full experience.

**Separate Status video:** Optionally render a **1080×1920 vertical MP4 (H.264/AAC), 15–25 seconds**, using Remotion or a polished screen capture. Show the opening scene, 2–3 photo transitions, the finale, and “Open the link for your surprise”. Keep text away from Status interface overlays. Use licensed or user-supplied audio. Add the website link to Status when the app supports it.

## Evaluation gates (do not skip failures)
1. **Skeleton:** Next.js setup, typed content config, all scenes reachable. Verify `npm run lint` and `npm run build` pass.
2. **Interactions:** Every tap, modal, Next/Back, replay, and music toggle works on mobile; no console errors.
3. **Motion/accessibility:** Animations remain smooth on modest Android hardware; reduced-motion, keyboard focus, alt text, and contrast checked.
4. **Personalization:** Correct name/date, captions, final message, consented photos, no broken assets, compressed media.
5. **Deployment/sharing:** Public HTTPS URL opens in mobile browsers; OG preview image accessible and tested by sharing in WhatsApp. Do not claim previews are guaranteed.
6. **Video (optional):** Status MP4 plays on phone, text is readable, and music rights are cleared.

## Build order for tomorrow
Prioritize the opening, 4 photo moments, final message, responsive layout, and deployment. Add optional music and the Status video after the site works end-to-end. Keep a README with setup instructions and list remaining placeholders.

## Paste this prompt into Codex
> Implement the attached **Birthday Universe — Codex Implementation Blueprint** as a complete mobile-first Next.js/TypeScript site. Follow the exact creative concept and scene journey. Start with placeholders and a single editable content configuration. Build responsive, accessible interactions and tasteful animations; honor reduced-motion preferences. Run lint/build and report concrete PASS/FAIL evidence for each evaluation gate. Fix failed gates before moving on. Add Open Graph metadata and a 1200×630 preview image, share/copy-link controls, and clear Vercel deployment instructions. Optionally create a 9:16 Remotion WhatsApp Status clip after the website passes all required gates. Ask me for real photos, captions, names, and permission before final publication. Never claim WhatsApp plays the website inside Status.
