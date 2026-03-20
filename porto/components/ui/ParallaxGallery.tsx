"use client";

import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
 
  // Background parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
        <h1 className="text-6xl md:text-9xl font-bold text-white mb-24 uppercase tracking-tighter">
          {category}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-32">
          {images.map((image, index) => (
            <ParallaxImage
              key={image._id}
              src={image.imageUrl}
              alt={image.title}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ParallaxImage = ({
  src,
  alt,
  index,
  scrollYProgress,
}: {
  src: string;
  alt: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? ["0%", "20%"] : ["-20%", "0%"]
  );

  return (
    <div className="relative aspect-[3/4] w-full">
      <motion.div
        style={{ y }}
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
      </motion.div>
    </div>
  );
};