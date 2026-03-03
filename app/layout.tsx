import "./globals.css";
import { NavigationProvider } from "@/context/NavigationContext";
import { SmartBackButton } from "@/components/ui/SmartBackButton";
import {  Orbitron } from "next/font/google";

const rubikGlitch = Orbitron({
  weight: "700",
  subsets: ["latin" ],
});

const mockSections = [
  { id: "1", label: "Works", path: "/works" },
  { id: "2", label: "CV", path: "/about" },
  { id: "3", label: "Contact", path: "/contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubikGlitch.className}>
        <NavigationProvider initialSections={mockSections}>
          {children}
          <SmartBackButton />
        </NavigationProvider>
      </body>
    </html>
  );
}
