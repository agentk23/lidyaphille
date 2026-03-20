import { ImageMenuContainer } from "../components/ui/ImageMenuContainer";
import Image from "next/image";
import { InteractiveNav } from "@/components/ui/HandNavigation";

export default function Home() {
  const socials = [
    {
      label: "Linktree",
      link: "https://linktr.ee/sadlilyfly",
      imgHref: "/lnktree.png",
    },
    {
      label: "Twitter",
      link: "https://ko-fi.com/lidya",
      imgHref: "/tweet.png",
    },
    {
      label: "Youtube",
      link: "https://www.youtube.com/channel/UChoO0tB_CdStC9dQ8_MWQLw",
      imgHref: "/youtube.png",
    },
  ];
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="relative w-[90vw] h-[30vh] sm:w-[90vw] sm:h-[40vh] shadow-2xl rounded-3xl">
          <Image
            src="/2ndbg.jpg"
            alt="Page Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      {/* 3 Pictogram Mini-Menu */}
      <div className="absolute top-4 right-4 z-3 flex gap-4 md:top-16 md:right-16 md:gap-8">
        {socials.map((item) => (
          <div
            key={item.label}
            className="w-8 h-8 scale-100 flex items-center justify-center cursor-pointer hover:rotate-6 hover:scale-110 duration-300 md:w-10 md:h-10 md:scale-120 md:hover:scale-140"
          >
            <a href={item.link}>
              <Image
                src={item.imgHref}
                alt={item.label}
                width={86}
                height={86}
                className="w-full h-full"
              ></Image>
            </a>
          </div>
        ))}
      </div>
      <main className="relative flex max-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-4 sm:py-32 sm:px-16  sm:items-start">
        <div className="relative w-full h-[8vh] text-black sm:opacity-0 md:opacity-90 text-center text-xl sm:text-4xl blur-xs opacity-90 top-13 md:top-4">
          <h1>Luiza Pomohaci</h1>
        </div>

        <ImageMenuContainer>
          <InteractiveNav />
        </ImageMenuContainer>
        <div className="relative w-full z-0 h-[8vh] rotate-y-180 rotate-x-180 sm:opacity-0 md:opacity-90 text-black text-center text-xl md:text-4xl blur-xs opacity-90  bottom-14 sm:bottom-4 sm:text-4xl  ">
          <h1>Luiza Pomohaci</h1>
        </div>
      </main>
    </div>
  );
}
