"use client";

import { useState, useRef, MouseEventHandler, MouseEvent } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

type ImageProps = {
  _id: string;
  title: string;
  imageUrl: string;
  description?: string;
};

export const ParallaxGallery = ({
  category,
  images,
}: {
  category: string;
  images: ImageProps[];
}) => {
  // Parallax container}
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Background parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [selectedArtwork, setSelectedArtwork] = useState<ImageProps | null>(null);
  const currentIndex = selectedArtwork
    ? images.findIndex((art) => art._id === selectedArtwork._id)
    : -1;
  const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  const prevArtwork = images[prevIndex];
  const nextArtwork = images[nextIndex];

  // Handle navigation
  const handlePrev = () => {
    setSelectedArtwork(prevArtwork);
  };

  const handleNext = () => {
    setSelectedArtwork(nextArtwork);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] bg-zinc-950 overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
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
          {images?.map((image, index) => (
            <ParallaxImage
              key={image._id}
              src={image.imageUrl}
              alt={image.title}
              index={index}
              scrollYProgress={scrollYProgress}
              clickAction={(e: MouseEvent<HTMLDivElement>) =>
                setSelectedArtwork(image)
              }
            />
          ))}
        </div>
      </div>
      {/* THE MODAL OVERLAY */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-200  flex items-center justify-center bg-black/80 p-2 sm:p-4 md:p-8 xl:p-12"
          onClick={() => setSelectedArtwork(null)}
        >
          {/* LEFT NAVIGATION (PREVIOUS IMAGE) */}
          {images.length > 1 && (
            <div
              className="absolute left-2 md:left-8 xl:left-12 top-1/2 -translate-y-1/2 cursor-pointer z-50 group hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <div className="relative w-24 h-16 md:w-34 md:h-28 xl:w-36 xl:h-32 opacity-100 hover:scale-102 transition-transform duration-300 hover:rotate-1">
                <Image
                  src="/select-hand.png"
                  alt={`Previous: ${prevArtwork.title}`}
                  fill
                  className="object-fill rotate-y-180 opacity-80"
                />
              </div>
            </div>
          )}

          {/* FULL-SIZE MAIN IMAGE CONTAINER */}
          <div
            className="relative w-full h-full max-w-[80vw] max-h-[85vh] md:max-w-[85vw] lg:max-w-6xl md:max-h-[90vh] xl:max-w-7xl xl:max-h-[92vh] "
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

          {/* RIGHT NAVIGATION (NEXT IMAGE) */}
          {images.length > 1 && (
            <div
              className="absolute right-2 md:right-8 xl:right-12  cursor-pointer z-50 group hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <div className="relative w-24 h-16 md:w-34 md:h-28 xl:w-36 xl:h-32 opacity-100 hover:scale-102 transition-transform duration-300 hover:rotate-1">
                <Image
                  src="/select-hand.png"
                  alt={`Previous: ${prevArtwork.title}`}
                  fill
                  className="object-fill opacity-80 "
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};;

const ParallaxImage = ({
  src,
  alt,
  index,
  scrollYProgress,
  clickAction,
}: {
  src: string;
  alt: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  clickAction: MouseEventHandler<HTMLDivElement>;
}) => {
  // const y = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   index % 2 === 0 ? ["0%", "20%"] : ["-20%", "0%"]
  // );

  return (
    <div className="relative aspect-3/4 w-full">
      <motion.div
        // style={{ y }}
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl "
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 "
          onClick={clickAction}
        />
      </motion.div>
    </div>
  );
};