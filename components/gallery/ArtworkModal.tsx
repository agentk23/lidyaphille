"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import type { WorkImage } from "@/lib/sanity";
import { ModalArrow } from "./ModalArrow";

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
        className="relative w-full h-full max-w-[80vw] max-h-[85vh] md:max-w-[85vw] lg:max-w-6xl md:max-h-[90vh] xl:max-w-7xl xl:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={selectedArtwork.imageUrl}
          alt={selectedArtwork.title}
          fill
          className="object-scale-down transition-opacity duration-300"
          priority
          sizes="(max-width: 640px) 70vw, (max-width: 768px) 80vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1600px"
        />
      </div>
    </div>
  );
};
