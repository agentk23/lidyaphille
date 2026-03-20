"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";




export const ImageMenuContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.div
      whileHover={isHome ? {} : { scale: 1.0051 }}
      transition={{ duration: 0.7 }}
      className={`  relative h-full w-full mx-auto z-10 min-h-[40vh]  xl:min-h-[67vh] lg:min-h-[60vh] sm:min-h-[90vh] md:min-h-[50vh]  sm:max-w-[30vw] md:max-w-[60vw] lg:max-w-[80vw] xl:min-w-[20vw]`}
    >
      {/* 1. The Background Image Layer */}
      <div className="absolute mx-auto inset-2 z-1 ">
        <Image
          src="/menu-bg.png" // Replace with your PNG path
          alt="Menu Background"
          fill
          className="transition-transform duration-700 hover:scale-100 "
          priority
        />
        {/* Dark overlay to ensure text contrast */}
        <div className="absolute z-2 inset-0" />
      </div>

      {/* 2. The Menu Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:top-1 md:top-10 lg:top-7 md:px-20 py-8 md:py-16">
        {children}
      </div>
    </motion.div>
  );
};
