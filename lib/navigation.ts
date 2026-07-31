import type { NavItem } from "@/context/NavigationContext";

// The site's main navigation, rendered by InteractiveNav on the home page.
export const NAV_SECTIONS: NavItem[] = [
  { id: "1", label: "Works", path: "/works" },
  { id: "2", label: "CV", path: "/about" },
  { id: "3", label: "Contact", path: "/contact" },
];
