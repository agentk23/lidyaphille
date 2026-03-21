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
  const cname = className;
  const isHome = pathname === "/";

  return (
    <motion.div
      whileHover={isHome ? {} : { scale: 1.01 }}
      transition={{ duration: 0.5 }}
      className={` ${cname} + relative h-full w-full mx-auto z-10 `}
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
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:top-1 md:top-10 lg:top-7 md:px-15 py-8 md:py-12">
        {children}
      </div>
    </motion.div>
  );
};
