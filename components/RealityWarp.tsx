"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";

export function RealityWarp() {
  const theme = useAppStore((s) => s.currentTheme);
  const prev = useRef(theme);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prev.current !== theme) {
      setActive(true);
      const t = setTimeout(() => setActive(false), 900);
      prev.current = theme;
      return () => clearTimeout(t);
    }
  }, [theme]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="warp"
          className="pointer-events-none fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ background: "var(--color-background)" }}
        />
      )}
    </AnimatePresence>
  );
}
