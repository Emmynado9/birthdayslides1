# Dawa's Birthday Universe & Magical Storybook ✨🎂

A personal, mobile-first interactive birthday microsite crafted for **Dawa** (**Monday, 9 November 2026**).

## Creative Concept & Scene Journey
1. **Envelope Entrance (`Envelope.tsx`)**: Interactive cosmic birthday envelope with wax heart seal and hand-drawn doodle pointer.
2. **Birthday Reveal (`BirthdayReveal.tsx`)**: Gathering stars around Dawa's portrait and handwritten birthday reveal.
3. **28-Photo Storybook & Constellation (`PhotoMemory.tsx`)**:
   - **Storybook View**: Polaroid cards with animated hand-drawn SVG doodly corner ornaments (`PhotoDoodleFrame`), auto-glide mode, heart reactions, and thumbnail strip.
   - **Constellation Map View**: All 28 photos grouped into 4 constellations (*Golden Dawn*, *Radiant Joy*, *Adventures*, *Starlight Era*).
4. **Wish Orbit (`WishPage.tsx`)**: 5 orbiting wish planets connected by a doodly constellation path.
5. **Make-a-Wish Candle Cake (`CandleCake.tsx`)**: 5 flickering birthday candles to tap or blow out all at once with confetti burst.
6. **Grand Finale (`Finale.tsx`)**: Final birthday note, celebration summary badges, confetti launcher, Web Share / copy-link button, and replay button.
7. **Always-On Cosmic Ambience (`Starfield.tsx` & `DoodleLayer.tsx`)**: Interactive flying star bubbles that pop with floating birthday compliments, twinkling starfield, and reduced-motion support.

---

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open **`http://localhost:3005`** in your browser.

### Verification Commands
```bash
npm run lint
npm run build
```

---

## Single-File Personalization (`src/content/birthday.ts`)

All personalized text, dates, photo captions, constellation groupings, wishes, audio track path, and public deployment URL live in **`src/content/birthday.ts`**:

- **`friendName`**: `'Dawa'`
- **`birthdayDate`**: `'2026-11-09'`
- **`senderName`**: `'Your Friends & Inner Circle'` (update to your personal name if desired)
- **`publicUrl`**: Set via `NEXT_PUBLIC_SITE_URL` environment variable or directly in `src/content/birthday.ts`
- **`photos`**: 28 curated photos located in `public/photos/01.jpg` – `public/photos/28.jpg` (sourced from the `Dawa/` folder)
- **`musicSrc`**: `/audio/music.mp3` (explicit play/pause button in the top header; never autoplays before user interaction)

---

## Deployment & WhatsApp Sharing

1. Push this repository to GitHub and import it into **Vercel** (or **Netlify**).
2. Set the environment variable `NEXT_PUBLIC_SITE_URL=https://your-production-domain.vercel.app` so Open Graph metadata (`public/og/preview-1200x630.jpg`) resolves to an absolute HTTPS URL.
3. **WhatsApp Delivery Note**: Sharing the public HTTPS link in a WhatsApp chat uses the 1200×630 Open Graph preview (`og:image`, `og:title`, `og:description`), though WhatsApp link preview caching is not guaranteed. WhatsApp Status cannot embed an interactive website directly; post a vertical video teaser to Status and attach the website link using the Status link sticker.

