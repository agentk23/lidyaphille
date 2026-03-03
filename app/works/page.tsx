"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageMenuContainer } from "@/components/ui/ImageMenuContainer";
import { useRouter } from "next/navigation";

export default function WorksPage() {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    document.body.style.transition = "transform 1s cubic-bezier(0.65, 0, 0.35, 1)";
    document.body.style.transform = "translateY(-100vh)";
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

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
          <Link href="/works/traditional" className="block h-full w-full" onClick={(e) => handleNavigation(e, "/works/traditional")}>
            <ImageMenuContainer className="h-[40vh] md:h-[50vh]">
              <div className="flex flex-col gap-6 h-full items-center justify-center">
                <h2 className="text-2xl md:text-4xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
                  Traditional
                </h2>
                <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg border border-white/20">
                  <Image
                    src="/2ndbg.jpg"
                    alt="Traditional Placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ImageMenuContainer>
          </Link>
        </div>
        <div className="flex-1 min-w-0">
          <Link href="/works/digital" className="block h-full w-full" onClick={(e) => handleNavigation(e, "/works/digital")}>
            <ImageMenuContainer className="h-[40vh] md:h-[50vh]">
              <div className="flex flex-col gap-6 h-full items-center justify-center">
                <h2 className="text-2xl md:text-4xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
                  Digital
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
          </Link>
        </div>
        <div className="flex-1 min-w-0">
          <Link href="/works/animation" className="block h-full w-full" onClick={(e) => handleNavigation(e, "/works/animation")}>
            <ImageMenuContainer className="h-[40vh] md:h-[50vh]">
              <div className="flex flex-col gap-6 h-full items-center justify-center">
                <h2 className="text-2xl md:text-4xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
                  Animation
                </h2>
                <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg border border-white/20">
                  <Image
                    src="/2ndbg.jpg"
                    alt="Animation Placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ImageMenuContainer>
          </Link>
        </div>
      </div>
    </div>
  );
}