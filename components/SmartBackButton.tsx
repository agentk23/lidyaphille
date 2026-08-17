"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePageTransition } from "@/context/TransitionContext";
import { isCategoryPath } from "@/lib/categories";

export const SmartBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { navigateWithTransition } = usePageTransition();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = useRef(false);

  const isHome = pathname === "/";
  // Gallery pages keep the button at the top; everywhere else it sits bottom-left.
  const isDown = !isCategoryPath(pathname);

  const handleAction = useCallback(() => {
    if (isHome) return;
    navigateWithTransition("/");
  }, [isHome, navigateWithTransition]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname]);

  const handlePressStart = () => {
    longPressTriggered.current = false;
    // Hidden shortcut: holding the button for 3 seconds opens the Sanity Studio.
    timerRef.current = setTimeout(() => {
      longPressTriggered.current = true;
      router.push("/studio");
    }, 3000);
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
      whileHover={{ scale: 1.1, rotate: -3 }}
      whileTap={{ scale: 0.9 }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className={
        isDown
          ? "fixed bottom-4 left-4 z-100 p-2 focus:outline-none cursor-pointer md:bottom-8 md:left-4"
          : "fixed top-4 z-100 p-2 cursor-pointer md:top-4 md:left-4"
      }
      aria-label={isHome ? "Long press to go to studio" : "Back to home"}
    >
      <div className="relative w-16 h-18 md:h-20 md:w-20 sm:h-20 sm:w-20">
        <Image
          src="/back-hand.png"
          alt="Navigation Icon"
          fill
          sizes="(max-width: 640px) 64px, 80px"
          loading="eager"
          className="object-contain transition-transform duration-500 ease-in-out"
          priority
        />
      </div>
    </motion.button>
  );
};
