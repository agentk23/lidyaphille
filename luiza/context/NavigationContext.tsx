"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a single navigation item
export interface NavItem {
  id: string;
  label: string;
  path: string;
}

interface NavigationContextType {
  sections: NavItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const NavigationProvider = ({
  children,
  initialSections,
}: {
  children: ReactNode;
  initialSections: NavItem[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <NavigationContext.Provider
      value={{
        sections: initialSections,
        activeIndex,
        setActiveIndex,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook for easy access
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context)
    throw new Error("useNavigation must be used within a NavigationProvider");
  return context;
};
