"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import * as React from "react";

const srcByTheme: Record<string, string> = {
  anime: "/anime.png",
  medieval: "/medieval.png",
  cyberpunk: "/cyberpunk.png",
  zenith: "/zenith.png",
};

export function SoulCoreHero() {
  const theme = useAppStore((s) => s.currentTheme);

  // One-time entrance only; no looping after settle
  const settleAnimate = { opacity: 1, scale: 1, y: 0 };
  const settleTransition = { type: "spring", stiffness: 240, damping: 22, mass: 0.6 };

  const glowClass =
    theme === "medieval"
      ? "drop-shadow-[0_0_8px_rgba(214,157,52,0.6)]"
      : "";

  const src = srcByTheme[theme] ?? srcByTheme.zenith;

  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.7, y: 80 }}
          animate={settleAnimate}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="-mt-6 md:-mt-10"
        >
          <img
            src={src}
            alt={`${theme} mascot`}
            className={`w-full max-w-7xl max-h-[32rem] sm:max-h-[36rem] object-contain mx-auto ${glowClass}`}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
