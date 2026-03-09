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
  zenith: "/images/zenith.jpg",
  cyberpunk: "/images/cyberpunk.png",
  medieval: "/images/medieval.png",
  anime: "/images/anime.png",
};

// Exact `--primary` colors pulled directly from your CSS tokens
const themeVisualizerColorMap: Record<string, string> = {
  zenith: "#6f7bf8",               // Vivid primary from Zenith
  cyberpunk: "oklch(0.7 0.25 325)", // Neon Magenta from Cyberpunk
  medieval: "oklch(0.55 0.12 95)",  // Warm parchment/steel from Medieval
  anime: "#f25c7a",                // Anime Pink
};

export default function ZoltraakDashboard() {
  const { currentTheme, player, wellbeing } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); 

  // Audio & Visualizer Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);

  // Keep a ref of the theme so the animation loop always knows the active color
  const currentThemeRef = useRef(currentTheme);
  useEffect(() => {
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  const activePlaylist = themeMusicMap[currentTheme] || themeMusicMap.zenith || [];
  const safeIndex = currentSongIndex < activePlaylist.length ? currentSongIndex : 0;
  const currentSongUrl = activePlaylist[safeIndex] || "";

  useEffect(() => {
    setMounted(true);
    // Cleanup audio context on unmount to prevent memory leaks
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    setCurrentSongIndex(0);
  }, [currentTheme]);

  // REAL-TIME AUDIO VISUALIZER LOGIC
  const drawVisualizer = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;

      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Takes only the first 45% of frequencies (perfect for Lofi/Bass)
      const visibleBars = Math.floor(bufferLength * 0.45); 
      
      const barWidth = canvas.width / (visibleBars * 2.2); 
      const gap = (canvas.width - (visibleBars * barWidth)) / Math.max(1, visibleBars - 1);
      let x = 0;

      const themeColor = themeVisualizerColorMap[currentThemeRef.current] || "#6f7bf8";

      for (let i = 0; i < visibleBars; i++) {
        const value = dataArray[i] ?? 0; 
        const percent = value / 255;
        
        // Ensure a minimal flatline when silent
        const barHeight = Math.max(percent * canvas.height * 0.9, 2 * window.devicePixelRatio); 

        // Draw solid bars with exact theme colors
        ctx.fillStyle = themeColor;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + gap;
      }
    };
    draw();
  };

  // INITIALIZE WEB AUDIO API
  const initAudioContext = () => {
    if (!audioRef.current || audioContextRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      
      analyser.fftSize = 64; 
      analyser.smoothingTimeConstant = 0.85; 

      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      drawVisualizer();
    } catch (e) {
      console.error("Audio Context initialization failed:", e);
    }
  };

  // Flawless Play/Pause logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSongUrl) return;

    if (isPlaying) {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.warn("Browser prevented playback:", e));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongUrl]); 

  const toggleMusic = () => {
    initAudioContext();
    setIsPlaying((prev) => !prev);
  };

  const handleNextSong = () => {
    initAudioContext();
    const currentList = themeMusicMap[currentTheme] || themeMusicMap.zenith || [];
    if (currentList.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % currentList.length);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    initAudioContext();
    const currentList = themeMusicMap[currentTheme] || themeMusicMap.zenith || [];
    if (currentList.length === 0) return;
    setCurrentSongIndex((prev) => (prev === 0 ? currentList.length - 1 : prev - 1));
    setIsPlaying(true);
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
      
      <audio 
        ref={audioRef} 
        src={currentSongUrl} 
        onEnded={handleNextSong} 
        crossOrigin="anonymous" 
      />

      {/* Hamburger Menu Button - Stayed at top-16 and left-4 */}
      <motion.button
        onClick={() => setIsSidebarOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-16 left-4 z-[60] flex items-center justify-center p-3 rounded-full bg-background/80 backdrop-blur-md ring-1 ring-primary/40 shadow-[0_0_15px_var(--primary)] text-primary cursor-pointer"
      >
        <Menu className="h-6 w-6" />
      </motion.button>

      {/* COMPACT MUSIC PLAYER & VISUALIZER (Bottom Right Corner) */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-center w-[180px]">
        
        {/* Real Audio Visualizer Canvas - Height reduced to h-8 */}
        <canvas 
          ref={canvasRef}
          className="w-[70%] h-8 pointer-events-none z-0 mb-[-1px]"
        />

        {/* Music Player Controls */}
        <motion.div className="w-full flex justify-between items-center p-2 rounded-full bg-background/80 backdrop-blur-md ring-1 ring-primary/40 shadow-[0_0_20px_var(--primary)] text-primary z-10 relative">
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
      </div>

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
        
        {/* Pomodoro Timer (Kept outside AnimatePresence so it never resets) */}
        <div 
          style={{ display: activeTab === "home" ? "flex" : "none" }} 
          className="w-full flex-col items-center justify-center mb-10"
        >
          <PomodoroTimer />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center justify-center gap-10"
            >
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
