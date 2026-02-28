"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SmartBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  
  useEffect(() => {
    document.body.style.transform = "";
    document.body.style.transition = "";
  }, [pathname]);

  const handleAction = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.transition = "transform 1s cubic-bezier(0.65, 0, 0.35, 1)";
      document.body.style.transform = "translateY(100vh)";
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity:  1, scale: 1, y: 0 }}
      whileHover={!isHome ? { scale: 1.1, rotate: -3 } : {}} // Subtle tilt on hover
      whileTap={!isHome ? { scale: 0.9 } : {}}
      onClick={handleAction}
      disabled={isHome}
      // Positioned in the bottom-left corner
      className={`fixed bottom-8 left-8 z-50 p-2 focus:outline-none ${
        isHome ? "cursor-not-allowed grayscale" : "cursor-pointer"
      }`}
      aria-label={isHome ? "Scroll to top" : "Go back"}
    >
      <div className="relative w-20 h-20">
        <Image
          src="/back-hand.png"
          alt="Navigation Icon"
          fill
          loading="eager"
          className={`object-contain transition-transform duration-500 ease-in-out`}
          priority
        />
      </div>
    </motion.button>
  );
};
