import { SmartBackButton } from "@/components/ui/SmartBackButton";
import { ImageMenuContainer } from "../components/ui/ImageMenuContainer";
import Image from "next/image";
import { InteractiveNav } from "@/components/ui/HandNavigation";

export default function Home() {
  const socials = [
    {
      label: "Instagram",
      link: "https://www.instagram.com/lidya_phille/",
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
      {/* Background Container */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="relative w-[50vw] h-[45vh] shadow-2xl rounded-3xl blur-xs">
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
      <div className="fixed top-16 right-16 z-50 flex gap-8">
        {socials.map((item) => (
          <div
            key={item.label}
            className="w-10 h-10 scale-120 flex items-center justify-center cursor-pointer hover:rotate-6 hover:scale-140 duration-300"
          >
            <a href={item.link}> 

            <Image
              src={item.imgHref}
              alt={item.label}
              width={72}
              height={72}
              className="w-full h-full"
            ></Image>
          </a>
          </div>
        ))}
      </div>
      <main className="relative z-10 flex min-h-screen w-full max-w-3xl flex-col items-center justify-center  py-32 px-16  sm:items-start">
        <div className="relative w-full h-[5vh] -bottom-3 overflow-hidden">
          <Image src="/luizaa.png" alt="Top" fill className="object-cover" />
        </div>
        <ImageMenuContainer>
          <InteractiveNav />
        </ImageMenuContainer>
        <div className="relative w-full h-[5vh] -top-6  rotate-y-180 rotate-x-180 overflow-hidden">
          <Image src="/luizaa.png" alt="Bottom" fill className="object-cover" />
        </div>
      </main>
    </div>
  );
}
