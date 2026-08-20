"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { WorkImage } from "@/lib/sanity";
import { sanityImageLoader } from "@/lib/sanityImageLoader";
import { getTileLayout } from "./GalleryImage";
import { ModalArrow } from "./ModalArrow";

/**
 * The full-resolution layer, fading in over the cached-tile underlay once the
 * file has actually loaded. Keyed by artwork in ArtworkModal, so every
 * navigation remounts it with a fresh transparent state.
 */
const FullSizeImage = ({ artwork }: { artwork: WorkImage }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={artwork.imageUrl}
      alt={artwork.title}
      loader={sanityImageLoader}
      fill
      onLoad={() => setLoaded(true)}
      className={`object-contain transition-opacity duration-500 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      priority
      sizes="(max-width: 640px) 70vw, (max-width: 768px) 80vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1600px"
    />
  );
};

export const ArtworkModal = ({
  images,
  selectedArtwork,
  onSelect,
  onClose,
}: {
  images: WorkImage[];
  selectedArtwork: WorkImage;
  onSelect: (artwork: WorkImage) => void;
  onClose: () => void;
}) => {
  const currentIndex = images.findIndex(
    (art) => art._id === selectedArtwork._id,
  );

  const step = useCallback(
    (delta: number) => {
      const nextIndex = (currentIndex + delta + images.length) % images.length;
      onSelect(images[nextIndex]);
    },
    [currentIndex, images, onSelect],
  );

  const prevArtwork = images[(currentIndex - 1 + images.length) % images.length];
  const nextArtwork = images[(currentIndex + 1) % images.length];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, step]);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-2 sm:p-4 md:p-8 xl:p-12"
      onClick={(e) => {
        e.stopPropagation();
        if (!(e.target instanceof HTMLImageElement)) onClose();
      }}
    >
      {images.length > 1 && (
        <>
          <ModalArrow
            direction="prev"
            label={`Previous: ${prevArtwork.title}`}
            onClick={() => step(-1)}
          />
          <ModalArrow
            direction="next"
            label={`Next: ${nextArtwork.title}`}
            onClick={() => step(1)}
          />
        </>
      )}

      {/* FULL-SIZE MAIN IMAGE CONTAINER */}
      <div
        className="relative w-full h-full max-w-[80vw] max-h-[85vh] md:max-w-[85vw] lg:max-w-6xl md:max-h-[90vh] xl:max-w-7xl xl:max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Underlay: the exact variant the grid tile already fetched (same
            loader + same sizes = same URL), painted straight from the browser
            cache so something sharp shows while the full-size image loads. */}
        {/* Keyed by artwork so navigation mounts fresh <img> elements — a
            reused element keeps showing the previous artwork's bitmap until
            the new src decodes. */}
        <Image
          key={`underlay-${selectedArtwork._id}`}
          src={selectedArtwork.imageUrl}
          alt=""
          aria-hidden
          loader={sanityImageLoader}
          fill
          className="object-contain"
          priority
          sizes={getTileLayout(selectedArtwork.imageUrl).sizes}
          {...(selectedArtwork.lqip && {
            placeholder: "blur" as const,
            blurDataURL: selectedArtwork.lqip,
          })}
        />
        <FullSizeImage
          key={`full-${selectedArtwork._id}`}
          artwork={selectedArtwork}
        />
      </div>
    </div>
  );
};
