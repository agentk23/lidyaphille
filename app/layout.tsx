import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";
import { NavigationProvider } from "@/context/NavigationContext";
import { TransitionProvider } from "@/context/TransitionContext";
import { SmartBackButton } from "@/components/SmartBackButton";
import { NAV_SECTIONS } from "@/lib/navigation";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";

const rFont = localFont({
  src: "./fonts/DEADCRT.ttf",
  variable: "--font-scientific",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luiza Pomohaci — Art Portfolio",
  description:
    "Traditional art, digital art, and animation by Luiza Pomohaci.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rFont.className}>
        <NavigationProvider initialSections={NAV_SECTIONS}>
          <TransitionProvider>
            {children}
            <SmartBackButton />
          </TransitionProvider>
        </NavigationProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
