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
          className="object-cover opacity-80"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row  gap-8 w-full max-w-full px-20 lg:bg-black justify-center align-center items-center">
        <div className="flex-1  sm:min-w-[23vw] lg:min-w-[30vw] grow-0 lg:ml-30">
          <Link
            href="/works/traditional"
            className="block h-full w-full"
            onClick={(e) => handleNavigation(e, "/works/traditional")}
          >
            <ImageMenuContainer className="h-[40vh] md:h-[50vh] md:p-15 sm:p-20 p-16">
              <div className="flex flex-col gap-6 h-full items-center">
                <h4 className="absolute  -top-1 text-xl md:text-xl sm:text-xl lg:text-xl  font-bold text-black  uppercase tracking-widest drop-shadow-lg">
                  Traditional
                </h4>
                <div className="relative w-48 h-48 rounded-lg  shadow-lg border border-white/20 ">
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
        <div className="flex-1 min-w-[23vw] lg:min-w-[30vw] grow-0 ">
          <Link
            href="/works/digital"
            className="block h-full w-full"
            onClick={(e) => handleNavigation(e, "/works/digital")}
          >
            <ImageMenuContainer className="h-[40vh] md:h-[50vh]">
              <div className="flex flex-col gap-6 h-full items-center justify-center md:p-15 sm:p-20 p-16">
                <h2 className="absolute top-14 text-xl md:text-xl sm:text-xl lg:text-xl  font-bold text-black uppercase tracking-widest drop-shadow-lg">
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
        <div className="flex-1 min-w-[23vw] sm:min-w-[20vw] lg:min-w-[30vw] grow-0 lg:mr-30 ">
          <Link
            href="/works/animation"
            className="block h-full w-full"
            onClick={(e) => handleNavigation(e, "/works/animation")}
          >
            {/* upon clicking on animation, use https://www.sanity.io/docs/media-library/working-with-video#a902fd2a81f7 to get video resources */}
            <ImageMenuContainer className="h-[40vh] md:h-[50vh]">
              <div className="flex flex-col gap-6 h-full items-center justify-center md:p-15 sm:p-20 p-16 ">
                <h2 className="absolute top-15 text-xl md:text-xl sm:text-xl lg:text-xl font-bold text-black uppercase tracking-widest drop-shadow-lg">
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