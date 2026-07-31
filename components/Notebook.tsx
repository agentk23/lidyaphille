// components/notebook.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type NotebookPage = {
  src: string;
  alt: string;
};

/**
 * Source images are 4:3. Drop them in /public/about/.
 * Alt text should describe the page content, not "page 1" — the
 * counter below already announces position.
 */
const PAGES: readonly NotebookPage[] = [
  { src: "/about/1.png", alt: "Handwritten title page reading 'About'." },
  { src: "/about/2.png", alt: "Sketch of the project's origin story." },
  { src: "/about/3.png", alt: "Diagram of how the system fits together." },
  { src: "/about/4.png", alt: "Notes on the tools and stack used." },
  { src: "/about/5.png", alt: "Closing page with contact details." },
];

/** Upper bound on the rendered width. Raise or lower to taste. */
const MAX_WIDTH_PX = 1200;

const SWIPE_THRESHOLD_PX = 48;

export default function Notebook() {
  const [index, setIndex] = useState(0);
  const lastIndex = PAGES.length - 1;
  const pointerStartY = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => Math.min(lastIndex, Math.max(0, current + delta)));
    },
    [lastIndex],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Don't hijack typing if a form control ever lands on this page.
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault(); // stop the arrow keys from scrolling
          go(1);
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          go(-1);
          break;
        case "Home":
          event.preventDefault();
          setIndex(0);
          break;
        case "End":
          event.preventDefault();
          setIndex(lastIndex);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, lastIndex]);

  const onPointerDown = (event: React.PointerEvent) => {
    pointerStartY.current = event.clientY;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (pointerStartY.current === null) return;
    const dy = event.clientY - pointerStartY.current;
    pointerStartY.current = null;
    if (Math.abs(dy) >= SWIPE_THRESHOLD_PX) go(dy < 0 ? 1 : -1);
  };

  return (
    <main
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="relative flex min-h-[100dvh] bg-zinc-50 touch-none select-none flex-col items-center justify-center gap-4 overflow-hidden px-10 py-4"
    >
      <EdgeZone
        side="top"
        label="Previous page"
        disabled={index === 0}
        onClick={() => go(-1)}
      />
      <EdgeZone
        side="bottom"
        label="Next page"
        disabled={index === lastIndex}
        onClick={() => go(1)}
      />

      {/*
        The picture grows to whatever the viewport allows, capped three ways:
        the ceiling above, the viewport width (w-full inside the padded parent),
        and the viewport height converted back into a width through the 4:3
        ratio. min() covers every size continuously — a breakpoint ladder here
        would need a rule per device height and still miss the ones between.
      */}
      <figure
        className="relative z-10 w-full"
        style={{
          maxWidth: `min(${MAX_WIDTH_PX}px, calc((100dvh - 7rem) * 4 / 3))`,
        }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
          {PAGES.map((page, i) => (
            <Image
              key={page.src}
              src={page.src}
              alt={page.alt}
              fill
              quality={90}
              // Tells next/image which resized file to ship. Without this it
              // sends a desktop-width image to every phone.
              sizes={`(max-width: 640px) 100vw, (max-width: 1280px) 90vw, ${MAX_WIDTH_PX}px`}
              priority={i === 0}
              aria-hidden={i !== index}
              className={`object-contain transition duration-300 ease-out motion-reduce:transition-none ${
                i === index
                  ? "translate-y-0 opacity-100"
                  : i < index
                    ? "pointer-events-none -translate-y-6 opacity-0 motion-reduce:translate-y-0"
                    : "pointer-events-none translate-y-6 opacity-0 motion-reduce:translate-y-0"
              }`}
            />
          ))}
        </div>

       
      </figure>

      <nav
        aria-label="Notebook pages"
        className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2"
      >
        {PAGES.map((page, i) => (
          <button
            key={page.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-8 w-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
              i === index
                ? "bg-neutral-800"
                : "bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </nav>
    </main>
  );
}

function EdgeZone({
  side,
  label,
  disabled,
  onClick,
}: {
  side: "top" | "bottom";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const isTop = side === "top";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`group absolute inset-x-0 z-20 flex h-1/5 justify-center focus-visible:outline-none disabled:cursor-default ${
        isTop
          ? "top-0 cursor-n-resize items-start pt-3"
          : "bottom-0 cursor-s-resize items-end pb-3"
      }`}
    >
      <span
        aria-hidden="true"
        // Both glyphs rotate the same way: "‹" turns to point up, "›" to point down.
        className="rotate-90 rounded-full p-2 text-2xl leading-none text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-visible:outline-2 group-focus-visible:outline-current group-disabled:opacity-0 motion-reduce:transition-none"
      >
        {isTop ? "\u2039" : "\u203A"}
      </span>
    </button>
  );
}
