"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  usePageTransition,
  TRANSITION_MS,
  TRANSITION_EASE,
} from "@/context/TransitionContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExiting } = usePageTransition();
  const isHome = pathname === "/";

  return (
    <motion.div
      initial={{ y: isHome ? "-100vh" : "100vh", opacity: 0 }}
      animate={isExiting ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{
        duration: isExiting ? TRANSITION_MS / 1000 : 0.2,
        ease: TRANSITION_EASE,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
