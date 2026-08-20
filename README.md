# Lidya Portfolio

An art-portfolio site for Luiza Pomohaci built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion**, and **Sanity** as the CMS.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires the env vars `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (see `sanity/env.ts`). The Sanity Studio is mounted at `/studio` — reachable directly, or by long-pressing the hand back-button for 3 seconds (a deliberate hidden shortcut in `SmartBackButton`).

## Site map

| Route | What it is |
|---|---|
| `/` | Home: hand-drawn interactive nav (`InteractiveNav`) with keyboard support, plus social links |
| `/works` | Category cards (Traditional / Digital / Animation) |
| `/works/[category]` | Masonry gallery of Sanity-hosted artwork with a full-size modal viewer |
| `/about` | Five-page interactive notebook (`Notebook`), linked as "CV" in the nav |
| `/contact` | Notepad-style mailto form with decorative artwork that reacts to focus |
| `/studio` | Embedded Sanity Studio |

## Architecture

### Content (Sanity)

- `lib/categories.ts` is the **single source of truth** for categories. The works page, `generateStaticParams`, the Sanity schema's radio options, and `SmartBackButton`'s route detection all derive from it — adding a category is one array entry plus uploaded images.
- `lib/sanity.ts` fetches typed `WorkImage[]` per category via GROQ, filtering out documents with broken/missing asset references (`defined(image.asset)`) and including each asset's `lqip` (tiny base64 preview) for blur-up placeholders.
- `sanity/lib/client.ts` runs with `useCdn: false` because gallery pages are statically generated at build time.

### Images

Gallery images are optimized end to end:

- **Sanity CDN resizing** — `lib/sanityImageLoader.ts` is a custom `next/image` loader appending `w={width}&fit=max&auto=format`, so the browser fetches exactly-sized WebP/AVIF variants straight from Sanity's globally-cached CDN. No Next optimizer hop, and originals are never shipped. No `q` param is set; encoding quality stays at CDN defaults.
- **Blur-up placeholders** — every gallery tile and the modal show the Sanity LQIP instantly while the real file loads.
- **Failure handling** — if an image request errors at runtime, `ParallaxGallery` removes that tile (and excludes it from the modal) instead of rendering a broken box.
- **Masonry layout** — a CSS grid with fine-grained rows; `GalleryImage` measures itself (`ResizeObserver`) and spans the rows its height needs. Aspect ratios are parsed from Sanity CDN filenames, so the layout reserves space before images load.

### Artwork modal

`ArtworkModal` (arrow/Escape keyboard support via `ModalArrow`) layers two images: an underlay requesting the *same URL the grid tile already fetched* (same loader + same `sizes`, via `getTileLayout`) so it paints instantly from the browser's HTTP cache, and the full-resolution image fading in on top once loaded. Both are keyed by artwork id so navigating never lingers on a stale bitmap.

### Page transitions

`context/TransitionContext.tsx` owns navigation. `navigateWithTransition(path)`:

- **With the View Transitions API** (modern browsers): wraps `router.push` in `document.startViewTransition`. Pages cross-fade, and elements sharing a `view-transition-name` morph between routes — the category card title morphs into the gallery heading (`work-title-<slug>`). Timing/easing live in `app/globals.css`, which also collapses the animation for `prefers-reduced-motion`.
- **Fallback** (older browsers): the previous behavior — a 300 ms framer-motion exit in `app/template.tsx` (small vertical drift + fade, asymmetric easing, reduced-motion aware), then navigation.

`app/template.tsx` steps aside automatically once view transitions take over, so the two systems never animate on top of each other. Note: browser back/forward bypasses `navigateWithTransition` and swaps instantly.

## Known rough edges

- The second social link on the home page points to Ko-fi but still uses the Twitter bird icon (`/tweet.png`) — see the TODO in `app/page.tsx`.
- The home page's mirrored name headings rely on chains of responsive pixel offsets (`top-13 sm:top-20 …`); they work but are fragile if the layout changes.
- Browser back/forward gets no transition animation (see above); wiring it up would require intercepting popstate.
