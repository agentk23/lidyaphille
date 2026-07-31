"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/context/NavigationContext";
import { usePageTransition } from "@/context/TransitionContext";

export const InteractiveNav = () => {
  const { sections, activeIndex, setActiveIndex } = useNavigation();
  const { navigateWithTransition } = usePageTransition();

  // Keyboard navigation: arrows cycle sections, Enter/ArrowRight follows one
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % sections.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
      } else if (e.key === "Enter" || e.key === "ArrowRight") {
        navigateWithTransition(sections[activeIndex].path);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sections, activeIndex, setActiveIndex, navigateWithTransition]);

  return (
    <nav className="flex flex-col gap-4 sm:gap-8 md:gap-12 lg:gap-12 xl:gap-15 z-10 lg:p-10 relative w-fit top-10 sm:top-10 md:top-5 lg:top-5 xl:top-10">
      {sections.map((section, index) => (
        <div
          key={section.id}
          onMouseEnter={() => setActiveIndex(index)}
          className="relative cursor-pointer left-5 sm:top-5 md:left-10 lg:left-5"
        >
          {/* The Text Section */}
          <span
            className={`text-lg sm:text-2xl md:text-3xl lg:text-5xl transition-shadow ${
              activeIndex === index
                ? "text-black font-stretch-50%"
                : "text-black rotate-2 shadow-2xs"
            }`}
          >
            <Link
              href={section.path}
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition(section.path);
              }}
            >
              {section.label}
            </Link>
          </span>

          {/* The Hand Indicator */}
          {activeIndex === index && (
            <motion.div
              layoutId="hand-pointer" // Magic prop: animates between different parents
              className="absolute z-10 top-1/2 -left-10 md:-left-12 -translate-y-1/2 pointer-events-none"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                mass: 0.8, // Lower mass makes the hand feel lighter/quicker
              }}
            >
              <Image
                src="/select-hand.png"
                alt="Pointer"
                width={64}
                height={64}
                className="left-1/2 -translate-x-1/2"
              />
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
};
