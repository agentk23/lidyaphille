/* eslint-disable react-hooks/immutability */
"use client";
import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/context/NavigationContext";
import { useRouter } from "next/navigation";



export const InteractiveNav = () => {
  const { sections, activeIndex, setActiveIndex } = useNavigation();
  const SECTIONS = sections.map((section) => section.label);
  const router = useRouter();
  
  // 1. Handle Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < sections.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : sections.length - 1));
    }
  }, [sections.length, setActiveIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    document.body.style.transition = "transform 1s cubic-bezier(0.65, 0, 0.35, 1)";
    document.body.style.transform = "translateY(-100vh)";
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      document.body.style.transform = "";
      document.body.style.transition = "";
    };
  }, []);

  return (
    <nav className="flex flex-col gap-6 p-10 relative w-fit">
      {SECTIONS.map((section, index) => (
        <div
          key={section}
          onMouseEnter={() => setActiveIndex(index)} // 2. Handle Hover
          className="relative cursor-pointer "
        >
          {/* The Text Section */}
          <span
            className={` text-4xl md:text-7xl transition-colors   ${
              activeIndex === index ? "text-black " : "text-gray-400"
            }`}
          >
            <Link
            href={sections[index].path}
            onClick={(e) => handleNavigation(e, sections[index].path)}
            >{section}</Link>
          </span>

          {/* 3. The Hand Indicator */}
          {activeIndex === index && (
            <motion.div
              layoutId="hand-pointer" // Magic prop: animates between different parents
              className="absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-none"
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
                className="left-1/2 -translate-x-1/2 " // Adjust based on your PNG's orientation
              />
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
};