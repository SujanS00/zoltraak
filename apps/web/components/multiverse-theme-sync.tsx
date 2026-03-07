"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Syncs Zustand currentTheme to <html data-theme> so multiverse.css
 * variables take effect. Does not touch ThemeProvider (class-based dark/light).
 */
export function MultiverseThemeSync() {
  const currentTheme = useAppStore((state) => state.currentTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return null;
}
