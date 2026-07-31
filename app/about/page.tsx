// app/about/page.tsx
import type { Metadata } from "next";

import Notebook from "@/components/Notebook";

export const metadata: Metadata = {
  title: "About",
  description: "A five-page notebook about the project.",
};

// Stays a server component: metadata and any static copy render on the
// server, and only the interactive notebook ships JavaScript to the client.
export default function AboutPage() {
  return <Notebook />;
}
