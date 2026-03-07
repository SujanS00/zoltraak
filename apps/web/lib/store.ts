import { create } from "zustand";

export type MultiverseTheme = "zenith" | "cyberpunk" | "medieval" | "anime";

export const THEMES: MultiverseTheme[] = ["zenith", "cyberpunk", "medieval", "anime"];

interface PlayerStats {
  xp: number;
  level: number;
  gold: number;
}

interface AppStore {
  currentTheme: MultiverseTheme;
  player: PlayerStats;
  setTheme: (theme: MultiverseTheme) => void;
  cycleTheme: () => void;
  setPlayerStats: (stats: Partial<PlayerStats>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentTheme: "zenith",
  player: {
    xp: 0,
    level: 1,
    gold: 0,
  },
  setTheme: (theme) => set({ currentTheme: theme }),
  cycleTheme: () =>
    set((state) => {
      const idx = THEMES.indexOf(state.currentTheme);
      const next = THEMES[(idx + 1) % THEMES.length];
      return { currentTheme: next };
    }),
  setPlayerStats: (stats) =>
    set((state) => ({
      player: { ...state.player, ...stats },
    })),
}));
