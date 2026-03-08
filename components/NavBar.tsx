"use client";

import { Sparkles } from "lucide-react";
import { FormButton } from "@repo/ui/form";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function NavBar() {
  const { currentTheme, cycleTheme } = useAppStore();
  const glow =
    currentTheme === "cyberpunk"
      ? "shadow-[0_0_24px_rgba(255,0,204,0.6)]"
      : currentTheme === "anime"
        ? "shadow-[0_0_24px_rgba(255,183,197,0.6)]"
        : currentTheme === "medieval"
          ? "shadow-[0_0_24px_rgba(214,157,52,0.5)]"
          : "shadow-[0_0_24px_rgba(139,92,246,0.5)]";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [trackInset, setTrackInset] = useState<{ left: number; right: number }>({ left: 112, right: 160 });

  useEffect(() => {
    const compute = () => {
      const c = containerRef.current?.getBoundingClientRect();
      const b = brandRef.current?.getBoundingClientRect();
      const r = buttonRef.current?.getBoundingClientRect();
      if (!c || !b || !r) return;
      const left = Math.max(0, Math.round(b.right - c.left + 8));
      const right = Math.max(0, Math.round(c.right - r.left + 8));
      setTrackInset({ left, right });
    };
    compute();
    const onResize = () => compute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [currentTheme]);

  return (
    <div className="fixed top-0 left-0 right-0 z-60">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div ref={containerRef} className="relative overflow-hidden flex items-center justify-between rounded-2xl border border-primary/20 bg-background/60 backdrop-blur-xl backdrop-saturate-150 shadow-[0_0_24px_var(--primary)]/20">
          <div ref={brandRef} className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2"
            >
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-black tracking-[0.35em]">ZOLTRAAK</span>
            </Link>
          </div>
          <div ref={buttonRef} className="px-3 py-1.5">
            <FormButton
              type="button"
              onClick={() => cycleTheme()}
              className={`rounded-full px-5 py-2 font-bold uppercase tracking-widest bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ${glow}`}
            >
              Warp Reality
            </FormButton>
          </div>
          <div
            className="pointer-events-none absolute inset-y-1.5"
            style={{ left: `${trackInset.left}px`, right: `${trackInset.right}px` }}
          >
            <motion.div
              aria-hidden
              initial={{ x: "-110%" }}
              animate={{ x: "110%" }}
              transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}
              className="absolute bottom-1 h-0.5 w-2/5 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--primary) 70%, transparent 100%)",
                boxShadow:
                  "0 0 8px var(--primary), 0 0 18px var(--primary), 0 0 28px color-mix(in oklab, var(--primary) 40%, transparent)",
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
