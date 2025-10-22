"use client";

import { useEffect } from "react";
import { Theme } from "@/types/landing";
import { applyTheme } from "@/lib/themes";

interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

/**
 * ThemeProvider - Client component to apply theme CSS variables
 * Used in landing pages to apply theme dynamically
 */
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  return <>{children}</>;
}
