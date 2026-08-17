"use client";

import Image from "next/image";

export const ModalArrow = ({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) => {
  const sideClasses =
    direction === "prev"
      ? "left-2 md:left-8 xl:left-12"
      : "right-2 md:right-8 xl:right-12";

  return (
    <button
      aria-label={label}
      className={`absolute ${sideClasses} top-1/2 -translate-y-1/2 cursor-pointer z-50 group hidden sm:block`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="relative w-24 h-16 md:w-34 md:h-28 xl:w-36 xl:h-32 opacity-100 hover:scale-102 transition-transform duration-300 hover:rotate-1">
        <Image
          src="/select-hand.png"
          alt={label}
          fill
          sizes="(max-width: 768px) 96px, (max-width: 1280px) 136px, 144px"
          className={`object-fill opacity-80 ${direction === "prev" ? "rotate-y-180" : ""}`}
        />
      </div>
    </button>
  );
};
