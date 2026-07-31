import { ImageMenuContainer } from "../components/ImageMenuContainer";
import Image from "next/image";
import { InteractiveNav } from "@/components/HandNavigation";

const SOCIALS = [
  {
    label: "Linktree",
    link: "https://linktr.ee/sadlilyfly",
    imgHref: "/lnktree.png",
  },
  {
    // TODO: label/icon say Twitter but the URL is Ko-fi — replace the link
    // with the real Twitter/X profile or swap in a Ko-fi icon.
    label: "Ko-fi",
    link: "https://ko-fi.com/lidya",
    imgHref: "/tweet.png",
  },
  {
    label: "Youtube",
    link: "https://www.youtube.com/channel/UChoO0tB_CdStC9dQ8_MWQLw",
    imgHref: "/youtube.png",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="relative w-[90vw] h-[20vh] sm:w-[90vw] sm:h-[30vh] shadow-2xl rounded-3xl">
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
        {SOCIALS.map((item) => (
          <div
            key={item.label}
            className="w-8 h-8 scale-100 flex items-center justify-center cursor-pointer hover:rotate-6 hover:scale-110 duration-300 md:w-10 md:h-10 md:scale-120 md:hover:scale-140"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
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
        <div className="relative w-full h-[8vh] text-black text-center text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl blur-xs opacity-0 sm:opacity-90 top-13 sm:top-20 md:top-18 lg:top-5 xl:top-6">
          <h1>Luiza Pomohaci</h1>
        </div>

        <ImageMenuContainer className="min-h-[35vh] xl:min-h-[80vh] lg:min-h-[70vh] sm:max-h-[50vh] md:min-h-[60vh]  max-w-[60vw] sm:max-w-[55vw] md:max-w-[55vw] lg:max-w-[50vw] xl:min-w-[30vw]">
          <InteractiveNav />
        </ImageMenuContainer>
        <div className="relative w-full z-0 h-[8vh] rotate-y-180 rotate-x-180  opacity-0 sm:opacity-90 text-black text-center text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl blur-xs bottom-15 sm:bottom-23 md:bottom-22 lg:bottom-9 xl:bottom-10">
          <h1>Luiza Pomohaci</h1>
        </div>
      </main>
    </div>
  );
}
