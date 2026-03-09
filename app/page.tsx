"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { QuestLog } from "@/components/QuestLog";
import { MindPalace } from "@/components/MindPalace";
import { Archives } from "../components/Archives";
import { CalendarWithEvents } from "@/components/calendar-with-events";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import {
  Coins,
  Heart,
  BookOpen,
  Layout,
  Menu,
  X,
  Home,
  Calendar,
  Play,
  Pause,
  SkipBack,
  SkipForward
} from "lucide-react";
import { SoulCoreHero } from "@/components/SoulCoreHero";
import { useEffect, useState, useRef } from "react";

// Arrays of your awesome reality tracks
const themeMusicMap: Record<string, string[]> = {
  zenith: [
    "/music/zenith1.mp3", 
    "/music/zenith2.mp3",
    "/music/zenith3.mp3",
    "/music/zenith4.mp3",
    "/music/zenith5.mp3"
  ],
  cyberpunk: [
    "/music/cyberpunk1.mp3",
    "/music/cyberpunk2.mp3",
    "/music/cyberpunk3.mp3",
    "/music/cyberpunk4.mp3",
    "/music/cyberpunk5.mp3"
  ],
  medieval: [
    "/music/medieval1.mp3",
    "/music/medieval2.mp3",
    "/music/medieval3.mp3",
    "/music/medieval4.mp3",
    "/music/medieval5.mp3"
  ],
  anime: [
    "/music/anime1.mp3",
    "/music/anime2.mp3",
    "/music/anime3.mp3",
    "/music/anime4.mp3",
    "/music/anime5.mp3"
  ],
};

const themeImageMap: Record<string, string> = {
  zenith: "/images/zenith.png",
  cyberpunk: "/images/cyberpunk.png",
  medieval: "/images/medieval.png",
  anime: "/images/anime.png",
};

export default function ZoltraakDashboard() {
  const { currentTheme, player, wellbeing } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); 

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // FIXED: Added "|| []" so TypeScript knows it is 100% an array
  const activePlaylist = themeMusicMap[currentTheme] || themeMusicMap.zenith || [];
  const safeIndex = currentSongIndex < activePlaylist.length ? currentSongIndex : 0;
  const currentSongUrl = activePlaylist[safeIndex] || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset track to beginning when swapping realities
  useEffect(() => {
    setCurrentSongIndex(0);
  }, [currentTheme]);

  // Flawless Play/Pause logic relying entirely on React state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSongUrl) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn("Browser prevented playback:", e);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongUrl]); 

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  // FIXED: Added "|| []" fallback here too to silence TypeScript
  const handleNextSong = () => {
    const currentList = themeMusicMap[currentTheme] || themeMusicMap.zenith || [];
    if (currentList.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % currentList.length);
  };

  const handlePrevSong = () => {
    const currentList = themeMusicMap[currentTheme] || themeMusicMap.zenith || [];
    if (currentList.length === 0) return;
    setCurrentSongIndex((prev) => (prev === 0 ? currentList.length - 1 : prev - 1));
  };

  if (!mounted) return null;

  const energyBrightness = 0.6 + wellbeing.energy / 250;
  const currentImageUrl = themeImageMap[currentTheme] || "/images/zenith.png";

  const navItems = [
    { id: "home", label: "Soul Core", icon: Home },
    { id: "quests", label: "Quest Ledger", icon: Layout },
    { id: "palace", label: "Mind Palace", icon: Heart },
    { id: "archives", label: "The Archives", icon: BookOpen },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      
      {/* React handles the src directly */}
      <audio 
        ref={audioRef} 
        src={currentSongUrl} 
        onEnded={handleNextSong} 
      />

      {/* Hamburger Menu Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 left-6 z-[60] flex items-center justify-center p-3 rounded-full bg-background/80 backdrop-blur-md ring-1 ring-primary/40 shadow-[0_0_15px_var(--primary)] text-primary cursor-pointer"
      >
        <Menu className="h-6 w-6" />
      </motion.button>

      {/* COMPACT MUSIC PLAYER CARD (Top Right Corner) */}
      <motion.div
        className="fixed top-6 right-6 z-[60] flex items-center gap-2 p-2 rounded-full bg-background/80 backdrop-blur-md ring-1 ring-primary/40 shadow-[0_0_20px_var(--primary)] text-primary"
      >
        <button 
          onClick={handlePrevSong}
          className="p-2 hover:bg-primary/20 rounded-full transition-colors cursor-pointer"
          aria-label="Previous Song"
        >
          <SkipBack className="h-4 w-4" />
        </button>

        <button 
          onClick={toggleMusic}
          className="p-3 bg-primary/10 hover:bg-primary/30 rounded-full transition-colors cursor-pointer shadow-inner"
          aria-label="Toggle Music"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>

        <button 
          onClick={handleNextSong}
          className="p-2 hover:bg-primary/20 rounded-full transition-colors cursor-pointer"
          aria-label="Next Song"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Sidebar Overlay (Mobile & Desktop) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-[65] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-64 bg-background/90 backdrop-blur-xl border-r border-primary/20 z-[70] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black italic text-primary uppercase">Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-primary/70 hover:text-primary">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                        activeTab === item.id 
                          ? "bg-primary/20 text-primary border border-primary/30" 
                          : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-bold uppercase tracking-wider text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TRUE FIXED BACKGROUND POSTER */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="relative w-[85vw] h-[85vh] md:w-[90vw] md:h-[90vh] rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.25)] border border-primary/10 bg-background"
          >
            <Image 
              src={currentImageUrl} 
              alt={`${currentTheme} background`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 85vw, 90vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Content Area */}
      <motion.div
        animate={{ filter: `brightness(${energyBrightness})` }}
        className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6"
      >
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center justify-center gap-10"
            >
              <PomodoroTimer />
              <SoulCoreHero />
              
              <div className="text-center space-y-6 bg-background/70 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-border/20 shadow-2xl w-full max-w-2xl">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-primary">
                  Soul Core
                </h1>
                <div className="space-y-4">
                  <div className="text-9xl font-black">{player.level}</div>
                  <div className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
                    Current Level
                  </div>
                  <div className="h-3 w-full max-w-xs bg-muted/50 backdrop-blur-md rounded-full overflow-hidden border border-border/20 mx-auto shadow-inner">
                    <motion.div
                      className="h-full bg-primary shadow-[0_0_15px_var(--primary)]"
                      animate={{ width: `${player.xp}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest pt-4">
                  <span className="flex items-center gap-2">
                    <Coins className="text-primary h-4 w-4" /> {player.gold} Gold
                  </span>
                  <span className="text-primary/60">{currentTheme} Reality</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "quests" && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl space-y-6 bg-background/70 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-border/20 shadow-2xl"
            >
              <div className="flex items-center gap-4 border-b border-border/20 pb-4">
                <Layout className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold uppercase italic">Quest Ledger</h2>
              </div>
              <QuestLog />
            </motion.div>
          )}

          {activeTab === "palace" && (
            <motion.div
              key="palace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl space-y-6 text-center bg-background/70 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-border/20 shadow-2xl"
            >
              <div className="flex items-center justify-center gap-4 border-b border-border/20 pb-4 mb-4">
                <Heart className="h-8 w-8 text-red-500" />
                <h2 className="text-3xl sm:text-4xl font-bold uppercase italic">Mind Palace</h2>
              </div>
              <MindPalace />
            </motion.div>
          )}

          {activeTab === "archives" && (
            <motion.div
              key="archives"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-5xl space-y-6 bg-background/70 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-border/20 shadow-2xl"
            >
              <div className="flex items-center gap-4 border-b border-border/20 pb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold uppercase italic">The Archives</h2>
              </div>
              <Archives />
            </motion.div>
          )}

          {activeTab === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl bg-background/70 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-border/20 shadow-2xl"
            >
              <CalendarWithEvents />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
