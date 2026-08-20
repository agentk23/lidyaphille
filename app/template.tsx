"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePageTransition, TRANSITION_MS } from "@/context/TransitionContext";

// Fallback animation for browsers without the View Transitions API.
// Enter decelerates into place (fast start, gentle settle); exit accelerates
// away. The asymmetry is what makes the pair read as one continuous motion.
const ENTER_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_EASE = [0.55, 0, 0.85, 0.4] as const;

/** How far a page drifts, in px. Home sits "above" the rest of the site. */
const DRIFT = 28;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExiting, viewTransitionsActive } = usePageTransition();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/";

  // Reduced motion: pure cross-fade, no vertical movement.
  const enterFrom = reduceMotion ? 0 : isHome ? -DRIFT : DRIFT;
  const exitTo = reduceMotion ? 0 : isHome ? DRIFT : -DRIFT;

  // Once navigation goes through the View Transitions API, the browser owns
  // the animation (root cross-fade + shared-element morphs); running our own
  // on top would double-fade. Same element type either way — no remount.
  if (viewTransitionsActive) {
    return (
      <motion.div initial={false} animate={{ y: 0, opacity: 1 }} className="w-full">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: enterFrom, opacity: 0 }}
      animate={
        isExiting
          ? {
              y: exitTo,
              opacity: 0,
              transition: { duration: TRANSITION_MS / 1000, ease: EXIT_EASE },
            }
          : {
              y: 0,
              opacity: 1,
              transition: { duration: 0.45, ease: ENTER_EASE },
            }
      }
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
