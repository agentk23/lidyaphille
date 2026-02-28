"use client";

import Image from "next/image";
import { ImageMenuContainer } from "@/components/ui/ImageMenuContainer";

export default function WorksPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-zinc-950">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 h-full">
        <Image
          src="/2ndbg.jpg"
          alt="Works Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-10 w-full max-w-7xl px-8">
        <div className="flex-1 min-w-0">
          <ImageMenuContainer className="h-[450px]">
            <div className="flex flex-col gap-6 h-full items-center justify-center">
              <h2 className="text-4xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
                Traditional
              </h2>
              <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src="/2ndbg.jpg"
                  alt="Digital Placeholder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ImageMenuContainer>
        </div>
        <div className="flex-1 min-w-0">
          <ImageMenuContainer className="h-[450px]">
            <div className="flex flex-col gap-6 h-full items-center justify-center">
              <h2 className="text-4xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
                Digital
              </h2>
              <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src="/2ndbg.jpg"
                  alt="Oil Placeholder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ImageMenuContainer>
        </div>
        <div className="flex-1 min-w-0">
          <ImageMenuContainer className="h-[450px]">
            <div className="flex flex-col gap-6 h-full items-center justify-center">
              <h2 className="text-4xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
                Animation
              </h2>
              <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src="/2ndbg.jpg"
                  alt="Sculpture Placeholder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ImageMenuContainer>
        </div>
      </div>
    </div>
  );
}