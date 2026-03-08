"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { QuestLog } from "@/components/QuestLog";
import { MindPalace } from "@/components/MindPalace";
import { Archives } from "../components/Archives"; 
import { CalendarWithEvents } from "@/components/calendar-with-events";
import { FormButton } from "@repo/ui/form";
import { Coins, Heart, BookOpen, Layout, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ZoltraakDashboard() {
  const { currentTheme, cycleTheme, player, wellbeing } = useAppStore();
  const [mounted, setMounted] = useState(false);

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
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar bg-background text-foreground"
    >
      {/* SECTION 1: SOUL CORE */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-8">
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
        </motion.div>
      </section>

      {/* SECTION 2: QUEST LEDGER */}
      <section className="h-screen w-full snap-start flex items-center justify-center bg-primary/5 p-10">
        <div className="max-w-4xl w-full space-y-8">
           <div className="flex items-center gap-4">
             <Layout className="h-8 w-8 text-primary" />
             <h2 className="text-4xl font-bold uppercase italic">Quest Ledger</h2>
           </div>
           <QuestLog />
        </div>
      </section>

      {/* SECTION 3: MIND PALACE */}
      <section className="h-screen w-full snap-start flex items-center justify-center p-10 bg-background">
        <div className="max-w-4xl w-full space-y-8 text-center">
           <div className="flex items-center justify-center gap-4 mb-4">
             <Heart className="h-8 w-8 text-red-500" />
             <h2 className="text-4xl font-bold uppercase italic">Mind Palace</h2>
           </div>
           <MindPalace />
        </div>
      </section>

      {/* SECTION 4: THE ARCHIVES */}
      <section className="h-screen w-full snap-start flex items-center justify-center bg-muted/20 p-10">
        <div className="max-w-5xl w-full space-y-8">
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold uppercase italic">The Archives</h2>
          </div>
          <Archives />
        </div>
      </section>

      {/* SECTION 5: CALENDAR SECTION - FULLY CAGED */}
      <section className="h-dvh w-full snap-start flex items-center justify-center bg-background p-4 sm:p-10 overflow-hidden">
        {/* The 85vh container traps the scrolling to JUST the calendar area */}
        <div className="max-w-4xl w-full h-[85vh] overflow-y-auto overscroll-contain custom-scrollbar rounded-3xl pb-20">
          <CalendarWithEvents />
        </div>
      </section>

      {/* FIXED WARP BUTTON */}
      <motion.div 
        className="fixed bottom-10 right-10 z-50" 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
      >
        <FormButton 
          type="button" 
          onClick={() => cycleTheme()} 
          className="rounded-full px-10 py-5 font-black uppercase tracking-tighter shadow-[0_0_40px_var(--primary)]"
        >
          Warp Reality
        </FormButton>
      </motion.div>
    </motion.div>
  );
}