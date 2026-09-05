import { create } from 'zustand'
import { Game, HardwareConfig } from '@/utils/checkerEngine'

interface CheckerState {
  selectedGame: Game | null
  userConfig: HardwareConfig
  setSelectedGame: (game: Game | null) => void
  setUserConfig: (config: HardwareConfig) => void
}

export const useCheckerStore = create<CheckerState>((set) => ({
  selectedGame: null,
  userConfig: {
    gpu: null,
    cpu: null,
    ram: '8 GB',
  },
  setSelectedGame: (game) => set({ selectedGame: game }),
  setUserConfig: (config) => set({ userConfig: config }),
}))