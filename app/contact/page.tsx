"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [message, setMessage] = useState("");


  const mailtoLink = `mailto:lidyaphille@gmail.com?subject=Inquiry from Art Portfolio&body=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen w-full bg-stone-100 p-4 md:p-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full min-h-[80vh]">
        {/* =========================================
            LEFT SECTION: 3 Background Pictures
        ========================================= */}
        <div className="hidden md:flex relative h-full  items-center justify-center min-h-150">
          {/* Top Row Image */}
          <div className="absolute top-[3%] left-[10%] w-72 aspect-[4/3] transform z-20 hover:scale-105 transition-transform cursor-pointer">
            <Image
              src="/lilmonster.png"
              alt="Lil Monster artwork"
              fill
              className="object-contain"
            />
          </div>

          {/* Middle Row Image */}
          <div className="absolute top-[35%] left-[10%] w-72 aspect-[4/3] z-20 hover:scale-105 transition-transform cursor-pointer">
            <Image
              src="/lilmonster.png"
              alt="Lil Monster artwork"
              fill
              className="object-fill"
            />
          </div>

          {/* Bottom Row Image */}
          <div className="absolute bottom-[3%] left-[10%] w-72 aspect-[4/3] z-20 hover:scale-105 transition-transform cursor-pointer">
            <Image
              src="/lilmonster.png"
              alt="Lil Monster artwork"
              fill
              className="object-fill"
            />
          </div>
        </div>

        {/* =========================================
            RIGHT SECTION: 2 Background Pictures + Notepad
        ========================================= */}
        <div className="relative flex items-center justify-center h-full w-full">
          {/* Background Top Right */}
          <div className="hidden md:block absolute md:-bottom-[25%] xl:-bottom-[35%] md:right-[25%] xl:right-[30%]  md:w-64   md:h-[70%]  xl:h-[90%] rotate-90 transform z-10 opacity-70">
            <Image
              src="/background-motif.png"
              alt="Background Motif"
              fill
              className="object-cover"
            />
          </div>

          {/* Background Bottom Left */}
          <div className="hidden md:block absolute md:bottom-[5%] xl:bottom-[5%] md:-left-[12%] xl:-left-[15%] md:w-64   md:h-[90%]  transform  z-10 opacity-70">
            <Image
              src="/background-motif.png"
              alt="Background Motif"
              fill
              className="object-cover"
            />
          </div>

          {/* Foreground Interactive Notepad */}
          <div className="relative z-20 h-full w-full ">
            {/* The Specific Menu Background Image */}
            <Image
              src="/menu-bg.png"
              alt="Contact Menu Background"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 flex flex-col p-8 sm:p-12 md:p-14 xl:p-16 pt-16 sm:pt-20 xl:pt-24">
              <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-800 mb-4 xl:mt-10 mt-20">
                Contact me
              </h2>
              <textarea
                className="w-full h-[50%] border-none outline-none mt-10 resize-none text-gray-800 placeholder:text-gray-500 font-serif leading-relaxed md:text-lg"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="mt-4 flex justify-end">
                <a
                  href={mailtoLink}
                  className={`px-3 py-2 xl:px-8 xl:py-3  rounded-md shadow transition-colors ${
                    message.trim().length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none opacity-50"
                      : "bg-gray-800 text-white hover:bg-black cursor-pointer opacity-90 hover:opacity-100"
                  }`}
                >
                  Send
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
