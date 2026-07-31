// Single source of truth for work categories.
// Used by the works index page, static params for /works/[category],
// the Sanity schema options, and SmartBackButton's route detection.

export type Category = {
  slug: string;
  title: string;
  image: string;
};

export const CATEGORIES: readonly Category[] = [
  { slug: "traditional", title: "Traditional", image: "/trad.png" },
  { slug: "digital", title: "Digital", image: "/digital.png" },
  { slug: "animation", title: "Animation", image: "/anim.gif" },
] as const;

export const isCategoryPath = (pathname: string) =>
  CATEGORIES.some((c) => pathname === `/works/${c.slug}`);
