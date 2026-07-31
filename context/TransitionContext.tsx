"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// How long the exit animation runs before the route actually changes.
export const TRANSITION_MS = 1000;
export const TRANSITION_EASE = [0.65, 0, 0.35, 1] as const;

interface TransitionContextType {
  isExiting: boolean;
  navigateWithTransition: (path: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  // The pathname an exit animation was started from. Once navigation
  // completes, pathname changes and isExiting derives back to false.
  const [exitingFrom, setExitingFrom] = useState<string | null>(null);
  const isExiting = exitingFrom === pathname;

  const navigateWithTransition = useCallback(
    (path: string) => {
      if (exitingFrom === pathname || path === pathname) return;
      setExitingFrom(pathname);
      setTimeout(() => {
        router.push(path);
      }, TRANSITION_MS);
    },
    [router, pathname, exitingFrom],
  );

  return (
    <TransitionContext.Provider value={{ isExiting, navigateWithTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context)
    throw new Error("usePageTransition must be used within a TransitionProvider");
  return context;
};
