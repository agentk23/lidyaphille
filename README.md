# Lidya Portfolio

An art-portfolio site built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion**, and **Sanity** as the CMS.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires the env vars `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (see `sanity/env.ts`). The Sanity Studio is mounted at `/studio`.

---

# Code Review: Smells & Refactoring Opportunities

This section is an honest audit of the current codebase — the spaghetti, the copy-paste, and the outright bugs — with concrete suggestions for making the code easier to extend.

## 🐛 Actual bugs (fix these first)

### 1. Category casing mismatch breaks static generation — `app/works/[category]/page.tsx`

`generateStaticParams` returns capitalized categories:

```ts
return [{ category: "Traditional" }, { category: "Digital" }, { category: "Animation" }];
```

…but the links in `app/works/page.tsx` navigate to lowercase paths (`/works/traditional`), and the Sanity schema stores lowercase values (`value: 'traditional'`). So the pre-rendered pages are `/works/Traditional` (never visited), and the GROQ filter `category == $category` would return **zero images** for them anyway. The actually-visited lowercase routes are rendered on demand instead of at build time.

**Fix:** define the categories once (see "single source of truth" below) and use the same lowercase slugs everywhere.

### 2. Escape key never closes the modal — `components/ui/ParallaxGallery.tsx`

```ts
if (e.key == "escape") {   // key values are case-sensitive: it's "Escape"
```

Worse, the `onKeyDown` sits on a `<div>` with no `tabIndex`, so the handler never fires at all. **Fix:** use a `useEffect` with a `window` keydown listener while the modal is open (and remove the leftover `console.log(e)`).

### 3. Broken className interpolation — `components/ui/ImageMenuContainer.tsx`

```tsx
className={` ${cname} + relative h-full w-full mx-auto z-10 `}
```

That literal `+` ends up in the DOM as a class named `+`. The `const cname = className;` alias is also pointless. **Fix:** `` className={`relative h-full w-full mx-auto z-10 ${className ?? ""}`} `` — or add a tiny `cn()` helper (e.g. `clsx` + `tailwind-merge`) since class merging happens all over this codebase.

### 4. Invalid markup in the root layout — `app/layout.tsx`

`<meta name="viewport">` and `<SpeedInsights />` are rendered as direct children of `<html>`, outside `<head>`/`<body>`. React will hoist the meta tag, but the idiomatic (and reliable) approach is:

```ts
export const viewport: Viewport = { width: "device-width", initialScale: 1 };
```

…and move `<SpeedInsights />` inside `<body>`. Also note the layout exports no `metadata` at all — the site currently has no title or description for SEO/social sharing.

### 5. Copy-paste alt text — `ParallaxGallery.tsx` and `app/works/page.tsx`

The **next** arrow says `` alt={`Previous: ${prevArtwork.title}`} `` (wrong direction *and* wrong artwork), and the Traditional card's image is `alt="Digital Placeholder"`. Classic symptom of the copy-paste-driven layout described below.

### 6. Wrong link data — `app/page.tsx`

The social labeled `Twitter` with a bird icon points to `https://ko-fi.com/lidya`. Either the label or the URL is wrong.

---

## 🍝 Spaghetti: duplication & hardcoding

### 7. The page-transition logic is scattered and inconsistent

The "slide the page away, then navigate" trick exists in **three** diverging copies:

- `app/works/page.tsx` → mutates `document.body.style.transform/transition` directly, then `setTimeout(router.push, 1000)`
- `components/ui/HandNavigation.tsx` → `setTimeout(router.push, 1000)` with **no animation at all** (the body-style code was removed but the dead 1-second delay stayed — clicking a nav item just freezes for a second)
- `components/ui/SmartBackButton.tsx` → same bare `setTimeout(..., 1000)`, plus a `useEffect` whose job is to *clean up* the body styles that `works/page.tsx` left behind. `HandNavigation` has an identical cleanup effect.

Meanwhile `app/template.tsx` runs its own Framer Motion entrance animation with `duration: 0.2` — so the exit "animation" takes 1000 ms and the entrance takes 200 ms, driven by two unrelated mechanisms.

**Refactor:** one `usePageTransition()` hook (or a `<TransitionLink>` component) that owns the exit animation, the delay, and the navigation. Direct `document.body.style` mutation from React components is the biggest smell here — it's global mutable state that other components must know to clean up. Framer Motion's `AnimatePresence` in `template.tsx` can handle exit + enter in one place, and the magic number `1000` should be a single exported `TRANSITION_MS` constant instead of appearing in four files.

### 8. `app/works/page.tsx` — three copies of the same card

Traditional / Digital / Animation are three ~25-line JSX blocks that differ only in title, href, and image. Adding a fourth category means copy-pasting a fourth block (and probably a fourth wrong alt text).

**Refactor to data + map:**

```tsx
const CATEGORIES = [
  { slug: "traditional", title: "Traditional", image: "/trad.png" },
  { slug: "digital",     title: "Digital",     image: "/digital.png" },
  { slug: "animation",   title: "Animation",   image: "/anim.gif" },
] as const;

{CATEGORIES.map((c) => <CategoryCard key={c.slug} {...c} />)}
```

### 9. No single source of truth for categories

The category list is currently hardcoded in **four** places: `works/page.tsx` (cards), `works/[category]/page.tsx` (`generateStaticParams`), `sanity/schemaTypes/image.ts` (schema options), and implicitly in `SmartBackButton.tsx` (see #11). This is the main obstacle to extension: adding a category is a four-file shotgun surgery.

**Refactor:** a shared `lib/categories.ts` exporting the list, imported by the works page, `generateStaticParams`, and the Sanity schema (the schema file can map over it to build its `options.list`). If categories should be fully dynamic, query them from Sanity instead and drop the hardcoding entirely.

### 10. `app/contact/page.tsx` — three identical `<Image src="/lilmonster.png">` blocks

Same image, same width, only the vertical offset differs. Map over an array of position configs. The recipient email `lidyaphille@gmail.com` is also hardcoded mid-JSX — hoist it to a constant or env var. The disabled "Send" state is faked with `pointer-events-none` on an `<a>`; a `<button>` with a real `disabled` state (calling `window.location.href = mailtoLink`) would be more accessible.

### 11. `SmartBackButton.tsx` — route knowledge leaking in

```ts
const isDown = (pathname !== "/works/traditional" && pathname !== "/works/digital" && pathname !== "/works/animation") ? true : false;
```

Three smells in one line: the `? true : false` is redundant, the route list will silently rot when a category is added, and a shared component now knows every gallery URL. **Refactor:** `const isGallery = /^\/works\/[^/]+$/.test(pathname)` or derive it from the shared category list (#9). Also: the 3-second long-press that secretly navigates to `/studio` is undiscoverable and deserves at least a comment — right now it reads like dead code until you notice the `router.push("/studio")`.

### 12. `mockSections` in `app/layout.tsx` is not mock

The site's real navigation (`Works / CV / Contact`) lives in a variable called `mockSections`, injected through `NavigationProvider`. The name says "temporary," but this *is* production nav. Rename it, move it to a `lib/navigation.ts` (or fold it into the categories module), and note the label/path mismatch (`CV` → `/about`) — fine if intentional, confusing if not.

---

## 🧹 Smaller cleanups

| Where | Smell | Suggestion |
|---|---|---|
| `HandNavigation.tsx:1` | `/* eslint-disable react-hooks/immutability */` file-wide | The disable hides the real issue: `handleKeyDown` is a `useCallback` referencing `handleNavigation` declared *after* it, with incomplete deps. Reorder, or move the key handling into a single `useEffect`. |
| `HandNavigation.tsx:14` | `const SECTIONS = sections.map(s => s.label)` | Recomputed each render and forces `sections[index]` lookups later. Just map over `sections` directly in JSX. |
| `ParallaxGallery.tsx:161` | `};;` and unused imports (`MouseEventHandler`, `KeyboardEventHandler`) | Lint sweep. |
| `ParallaxGallery.tsx:163-198` | `ParallaxImage` takes `index` and `scrollYProgress` props that feed only commented-out code | Either restore the per-image parallax or delete the props and dead code — don't ship both. |
| `ParallaxGallery.tsx` | Prev/next arrow blocks are duplicated | Extract a `ModalArrow direction="prev|next"` component; the modal itself (~70 lines) is worth extracting to `ArtworkModal` so the gallery component does one thing. |
| `ParallaxGallery.tsx:31-37` | Index math re-derived on every render, no wraparound helper | `const step = (delta: number) => setSelectedArtwork(images[(currentIndex + delta + images.length) % images.length])`. |
| `lib/sanity.ts:13` | `console.log(images)` on every fetch | Remove; also give the function a return type (`Promise<WorkImage[]>`) — right now it returns `any`, and `ParallaxGallery` re-declares its own `ImageProps` type. Share one `WorkImage` type between the fetcher and the component. |
| `lib/sanity.ts:17` | `export default getWorkImages` alongside the named export | Pick one (named) — dual exports invite inconsistent imports. |
| `sanity/lib/client.ts` | `useCdn: true` with a comment saying to disable it for static generation | The gallery *is* statically generated (`generateStaticParams`), so this contradicts itself. Set `useCdn: false` or adopt tag-based revalidation deliberately. |
| `app/page.tsx:6` | `socials` array recreated inside the component | Hoist to module scope; while there, the `<a>` tags need `target="_blank" rel="noopener noreferrer"` for external links. |
| `app/about/page.tsx` | Placeholder page (`This is the about page.`) linked as "CV" in the main nav | Ship it or unlink it. |
| Tailwind classes everywhere | Long chains of magic responsive offsets (`top-13 sm:top-20 md:top-18 lg:top-5 xl:top-6`) | These pixel-nudge chains are the CSS version of magic numbers — they break every time layout changes. Prefer flex/grid centering over absolute nudging; where nudges are unavoidable, comment *why*. |

---

## Suggested refactoring order

1. **Fix the bugs** (#1–#6) — small diffs, immediate correctness wins.
2. **Create `lib/categories.ts` + `lib/navigation.ts`** (#9, #12) and wire the works page, `generateStaticParams`, the Sanity schema, and `SmartBackButton` to them. This is the single highest-leverage change for extensibility: after it, "add a category" = add one array entry + upload images.
3. **Centralize page transitions** (#7) into one hook/component and delete the `document.body` mutation.
4. **Componentize** (#8, #10, and the `ParallaxGallery` modal) so each file has one job.
5. **Lint sweep** for the small stuff, then remove the `eslint-disable` at the top of `HandNavigation.tsx` and let the linter keep you honest.
