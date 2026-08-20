"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { WorkImage } from "@/lib/sanity";
import { GalleryImage } from "./gallery/GalleryImage";
import { ArtworkModal } from "./gallery/ArtworkModal";

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

  // Images whose CDN request failed (e.g. 400 for a broken asset) get pulled
  // from the grid and the modal instead of rendering as broken tiles.
  const [failedIds, setFailedIds] = useState<ReadonlySet<string>>(new Set());
  const visibleImages =
    images?.filter((image) => image.imageUrl && !failedIds.has(image._id)) ??
    [];

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
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </motion.div>
      <div className="relative z-10 pt-32 px-8 max-w-7xl mx-auto">
        <h1
          className="md:text-4xl text-3xl  text-white mb-24 uppercase tracking-tighter text-center"
          style={{ viewTransitionName: `work-title-${category}` }}
        >
          {category}
        </h1>

        {/* Masonry: fine-grained rows that each tile spans according to its
            height, with dense packing to backfill what wide tiles leave over. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-dense auto-rows-[8px] gap-x-16 pb-32">
          {visibleImages.map((image) => (
            <GalleryImage
              key={image._id}
              src={image.imageUrl}
              alt={image.title}
              lqip={image.lqip}
              onClick={() => setSelectedArtwork(image)}
              onError={() => {
                setFailedIds((prev) => new Set(prev).add(image._id));
                setSelectedArtwork((current) =>
                  current?._id === image._id ? null : current,
                );
              }}
            />
          ))}
        </div>
      </div>
      {selectedArtwork && (
        <ArtworkModal
          images={visibleImages}
          selectedArtwork={selectedArtwork}
          onSelect={setSelectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
};
