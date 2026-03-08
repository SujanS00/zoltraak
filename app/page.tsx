"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { QuestLog } from "@/components/QuestLog";
import { MindPalace } from "@/components/MindPalace";
import { Archives } from "../components/Archives"; 
import { CalendarWithEvents } from "@/components/calendar-with-events";
import { Coins, Heart, BookOpen, Layout, ChevronDown } from "lucide-react";
import { SoulCoreHero } from "@/components/SoulCoreHero";
import { useEffect, useState, useRef } from "react";

export default function ZoltraakDashboard() {
  const { currentTheme, player, wellbeing } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const statsAnchorRef = useRef<HTMLDivElement | null>(null);

  // Prevents Hydration Mismatch
  useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  // Visual Effect: Screen dims when energy is low
  const energyBrightness = 0.6 + (wellbeing.energy / 250);

  return (
    <motion.div 
      animate={{ filter: `brightness(${energyBrightness})` }}
      className="min-h-screen bg-background text-foreground"
    >
      {/* Hero band (occupies most of the viewport to avoid UI flashing) */}
      <section className="w-full flex flex-col items-center pt-4 pb-6 px-6 relative min-h-[90vh]">
        <SoulCoreHero />
        <div className="absolute bottom-14 md:bottom-16 right-6 md:right-12">
          <motion.button
            type="button"
            onClick={() => statsAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ delay: 1.5, duration: 1.2, repeat: Infinity }}
            className="flex items-center justify-center rounded-full bg-background/90 backdrop-blur-md ring-1 ring-primary/40 shadow-[0_0_20px_var(--primary)] p-3 md:p-3.5"
            aria-label="Scroll to Soul Core"
          >
            <ChevronDown className="h-5 w-5 text-primary" />
          </motion.button>
        </div>
      </section>

      {/* Stats and title are now in the section below the hero */}
      <motion.section
        className="w-full flex flex-col items-center pb-12 px-6 mt-6"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div id="soul-core" ref={statsAnchorRef} className="text-center space-y-6 mt-2 scroll-mt-24 sm:scroll-mt-28">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-primary">Soul Core</h1>
          <div className="space-y-4">
            <div className="text-9xl font-black">{player.level}</div>
            <div className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Current Level</div>
            <div className="h-3 w-80 bg-muted rounded-full overflow-hidden border border-border/20 mx-auto shadow-inner">
              <motion.div 
                className="h-full bg-primary shadow-[0_0_15px_var(--primary)]" 
                animate={{ width: `${player.xp}%` }} 
              />
            </div>
          </div>
          <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Coins className="text-primary h-4 w-4"/> {player.gold} Gold
            </span>
            <span className="text-primary/60">{currentTheme} Reality</span>
          </div>
        </div>
      </motion.section>

      <motion.section className="w-full flex items-center justify-center bg-primary/5 py-16 px-6" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl w-full space-y-8">
           <div className="flex items-center gap-4">
             <Layout className="h-8 w-8 text-primary" />
             <h2 className="text-4xl font-bold uppercase italic">Quest Ledger</h2>
           </div>
           <QuestLog />
        </div>
      </motion.section>

      <motion.section className="w-full flex items-center justify-center py-16 px-6 bg-background" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl w-full space-y-8 text-center">
           <div className="flex items-center justify-center gap-4 mb-4">
             <Heart className="h-8 w-8 text-red-500" />
             <h2 className="text-4xl font-bold uppercase italic">Mind Palace</h2>
           </div>
           <MindPalace />
        </div>
      </motion.section>

      <motion.section className="w-full flex items-center justify-center bg-muted/20 py-16 px-6" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}>
        <div className="max-w-5xl w-full space-y-8">
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold uppercase italic">The Archives</h2>
          </div>
          <Archives />
        </div>
      </motion.section>

      <motion.section className="w-full flex items-center justify-center bg-background py-16 px-4 sm:px-10" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl w-full rounded-3xl">
          <CalendarWithEvents />
        </div>
      </motion.section>

    </motion.div>
  );
}
