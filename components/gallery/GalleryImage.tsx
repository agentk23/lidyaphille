"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getImageDimensions } from "@/lib/sanity";
import { sanityImageLoader } from "@/lib/sanityImageLoader";

/** Aspect ratio used when a URL carries no dimensions. */
const FALLBACK_RATIO = 3 / 4;
/** Landscape images past this ratio earn a second column. */
const WIDE_RATIO = 1.3;

/**
 * How wide a tile actually renders, tracking the grid in ParallaxGallery: one
 * column under md, two up to xl, three beyond it, inside a max-w-7xl px-8
 * container with a 4rem gap. Wide tiles span two of those columns.
 */
const TILE_SIZES = {
  narrow:
    "(max-width: 768px) calc(100vw - 4rem), (max-width: 1280px) calc((100vw - 8rem) / 2), 363px",
  wide: "(max-width: 1280px) calc(100vw - 4rem), 790px",
};

/**
 * Layout facts for a tile, derived from the image URL. Exported so ArtworkModal
 * can request the exact variant the grid already fetched (same loader + same
 * `sizes` string = same URL = browser cache hit) as its instant underlay.
 */
export function getTileLayout(src: string) {
  const dimensions = getImageDimensions(src);
  const ratio = dimensions
    ? dimensions.width / dimensions.height
    : FALLBACK_RATIO;
  const isWide = ratio >= WIDE_RATIO;
  return { ratio, isWide, sizes: isWide ? TILE_SIZES.wide : TILE_SIZES.narrow };
}

export const GalleryImage = ({
  src,
  alt,
  lqip,
  onClick,
  onError,
}: {
  src: string;
  alt: string;
  lqip?: string;
  onClick: () => void;
  onError?: () => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { ratio, isWide, sizes } = getTileLayout(src);

  useMasonrySpan(itemRef, contentRef);

  return (
    <div ref={itemRef} className={isWide ? "md:col-span-2" : undefined}>
      {/* Vertical spacing lives inside the tile (the grid's row-gap stays 0) so
          the row span can account for it. */}
      <div ref={contentRef} className="pb-16">
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{ aspectRatio: `${ratio}` }}
        >
          <Image
            src={src}
            alt={alt}
            loader={sanityImageLoader}
            fill
            sizes={sizes}
            className="object-cover cursor-pointer transition-transform shadow-4xl duration-700 hover:scale-101"
            onClick={onClick}
            onError={onError}
            {...(lqip && { placeholder: "blur" as const, blurDataURL: lqip })}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Makes a tile claim as many of the grid's fine-grained rows as its rendered
 * height needs, which is what turns the plain grid into a masonry.
 */
function useMasonrySpan(
  itemRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const item = itemRef.current;
    const content = contentRef.current;
    const grid = item?.parentElement;
    if (!item || !content || !grid) return;

    const observer = new ResizeObserver(() => {
      const gridStyles = getComputedStyle(grid);
      const rowUnit = parseFloat(gridStyles.gridAutoRows);
      const rowGap = parseFloat(gridStyles.rowGap) || 0;
      const height = content.getBoundingClientRect().height;
      const span = Math.max(
        1,
        Math.ceil((height + rowGap) / (rowUnit + rowGap)),
      );
      item.style.gridRowEnd = `span ${span}`;
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, [itemRef, contentRef]);
}
