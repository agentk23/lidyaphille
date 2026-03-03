"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";




export const ImageMenuContainer = ({
  children,
  className = "h-165",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.div
      whileHover={isHome ? {} : { scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className={`relative w-full max-w-full max-h-full mx-auto overflow-hidden ${className}`}
    >
      {/* 1. The Background Image Layer */}
      <div className="absolute inset-0 z-1">
        <Image
          src="/menu-bg.png" // Replace with your PNG path
          alt="Menu Background"
          fill
          className="object-cover transition-transform duration-700 hover:scale-100 shadow-2xs"
          priority
        />
        {/* Dark overlay to ensure text contrast */}
        <div className="absolute inset-0" />
      </div>

      {/* 2. The Menu Content Layer */}
      <div className="relative z-2 h-full flex flex-col justify-center md:px-20">
        {children}
      </div>
    </motion.div>
  );
};
