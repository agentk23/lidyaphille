import "./globals.css";
import { NavigationProvider } from "@/context/NavigationContext";
import { SmartBackButton } from "@/components/ui/SmartBackButton";
import localFont from "next/font/local";

const lFont = localFont({
  src: "./fonts/scientific-graphics.regular.otf",
  variable: "--font-scientific",
  display: "swap",
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
      <body className={lFont.className}>
        <NavigationProvider initialSections={mockSections}>
          {children}
          <SmartBackButton />
        </NavigationProvider>
      </body>
    </html>
  );
}
