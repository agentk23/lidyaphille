"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.div
      initial={{ y: isHome ? "-100vh" : "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
