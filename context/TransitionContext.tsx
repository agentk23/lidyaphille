"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// Fallback path only (browsers without the View Transitions API): how long
// the template's exit animation runs before the route actually changes.
export const TRANSITION_MS = 300;

const supportsViewTransitions = () =>
  typeof document !== "undefined" && "startViewTransition" in document;

interface TransitionContextType {
  isExiting: boolean;
  /**
   * True once navigation runs through the View Transitions API. The template
   * then leaves animation to the browser (root cross-fade + shared-element
   * morphs via `view-transition-name`) instead of running its own.
   */
  viewTransitionsActive: boolean;
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
  const [viewTransitionsActive, setViewTransitionsActive] = useState(false);
  const isExiting = exitingFrom === pathname;

  // Resolves the in-flight view transition's DOM-update promise once the new
  // route has rendered, letting the browser start animating between snapshots.
  const pendingNavigation = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    pendingNavigation.current?.();
    pendingNavigation.current = null;
  }, [pathname]);

  const navigateWithTransition = useCallback(
    (path: string) => {
      if (exitingFrom === pathname || path === pathname) return;

      if (supportsViewTransitions()) {
        setViewTransitionsActive(true);
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              pendingNavigation.current = resolve;
              router.push(path);
            }),
        );
        return;
      }

      setExitingFrom(pathname);
      setTimeout(() => {
        router.push(path);
      }, TRANSITION_MS);
    },
    [router, pathname, exitingFrom],
  );

  return (
    <TransitionContext.Provider
      value={{ isExiting, viewTransitionsActive, navigateWithTransition }}
    >
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
