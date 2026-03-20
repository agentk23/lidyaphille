"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SmartBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = useRef(false);

  const isHome = pathname === "/";
 

  const handleAction = useCallback(() => {
    if (isHome) {
      // Do nothing for a short press on the home page
      return;
    } else {
      setTimeout(() => {
        const segments = pathname.split("/").filter(Boolean);
        const parentPath =
          segments.length > 1
            ? `/${segments.slice(0, -1).join("/")}`
            : "/";
        router.push(parentPath);
      }, 1000);
    }
  }, [isHome, pathname, router]);

  useEffect(() => {
    document.body.style.transform = "";
    document.body.style.transition = "";

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
     
      
    };
  }, [pathname]);

  const handlePressStart = () => {
    longPressTriggered.current = false;
    timerRef.current = setTimeout(() => {
      longPressTriggered.current = true;
      router.push("/studio");
    }, 3000); // 3-second long press
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Only trigger the short-press action if the long-press wasn't activated
    if (!longPressTriggered.current) {
      handleAction();
    }
  };
  

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, rotate: -3 }} // Subtle tilt on hover
      whileTap={{ scale: 0.9 }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      // Positioned in the bottom-left corner
      className="fixed bottom-4 left-4 z-100 p-2 focus:outline-none cursor-pointer md:bottom-8 md:left-8"
      aria-label={isHome ? "Long press to go to studio" : "Go back"}
    >
      <div className="relative w-16 h-18 md:h-20 md:w-20 sm:h-20  sm:w-20 ">
        <Image
          src="/back-hand.png"
          alt="Navigation Icon"
          fill
          loading="eager"
          className="object-contain transition-transform duration-500 ease-in-out"
          priority
        />
      </div>
    </motion.button>
  );
};
