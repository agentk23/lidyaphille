"use client";

import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { WorkImage } from "@/lib/sanity";

export const ParallaxGallery = ({
  category,
  images,
}: {
  category: string;
  images: WorkImage[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Background parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [selectedArtwork, setSelectedArtwork] = useState<WorkImage | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] bg-zinc-950 overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[120%] w-full">
        <Image
          src="/2ndbg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
        />
      </motion.div>
      <div className="relative z-10 pt-32 px-8 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-4xl font-bold text-white mb-24 uppercase tracking-tighter text-center">
          {category}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 pb-32">
          {images?.map((image) => (
            <GalleryImage
              key={image._id}
              src={image.imageUrl}
              alt={image.title}
              onClick={() => setSelectedArtwork(image)}
            />
          ))}
        </div>
      </div>
      {selectedArtwork && (
        <ArtworkModal
          images={images}
          selectedArtwork={selectedArtwork}
          onSelect={setSelectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
};

const ArtworkModal = ({
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
      const nextIndex =
        (currentIndex + delta + images.length) % images.length;
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

const ModalArrow = ({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) => {
  const sideClasses =
    direction === "prev"
      ? "left-2 md:left-8 xl:left-12"
      : "right-2 md:right-8 xl:right-12";

  return (
    <button
      aria-label={label}
      className={`absolute ${sideClasses} top-1/2 -translate-y-1/2 cursor-pointer z-50 group hidden sm:block`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="relative w-24 h-16 md:w-34 md:h-28 xl:w-36 xl:h-32 opacity-100 hover:scale-102 transition-transform duration-300 hover:rotate-1">
        <Image
          src="/select-hand.png"
          alt={label}
          fill
          className={`object-fill opacity-80 ${direction === "prev" ? "rotate-y-180" : ""}`}
        />
      </div>
    </button>
  );
};

const GalleryImage = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => {
  return (
    <div className="relative aspect-3/4 w-full">
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
