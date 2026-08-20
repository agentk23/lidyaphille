import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader that lets Sanity's image CDN do the resizing, skipping the
 * Next optimizer (which would otherwise download the full original on a cold
 * cache). Transforms are cached on Sanity's CDN edge-wide.
 *
 * No `q` param is set unless a quality prop is passed, so encoding quality is
 * left to the CDN's defaults; `auto=format` serves WebP/AVIF to browsers that
 * accept them and `fit=max` prevents upscaling past the original.
 */
export function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  if (quality) url.searchParams.set("q", String(quality));
  return url.href;
}
