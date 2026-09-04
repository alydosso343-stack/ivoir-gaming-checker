import { create } from 'zustand'

export interface CheckResult {
  canRun: boolean
  fpsAvg: number
  setting: string
  notes?: string
  youtubeUrl?: string
  isAiFallback?: boolean
  gameTitle?: string
}

interface CheckerState {
  gpu: string
  cpu: string
  ram: number
  selectedGame: string
  isLoading: boolean
  result: CheckResult | null
  
  // Actions
  setGpu: (gpu: string) => void
  setCpu: (cpu: string) => void
  setRam: (ram: number) => void
  setSelectedGame: (game: string) => void
  setIsLoading: (loading: boolean) => void
  setResult: (result: CheckResult | null) => void
  reset: () => void
}

export const useCheckerStore = create<CheckerState>((set) => ({
  gpu: '',
  cpu: '',
  ram: 8,
  selectedGame: 'gta-v',
  isLoading: false,
  result: null,

  setGpu: (gpu) => set({ gpu }),
  setCpu: (cpu) => set({ cpu }),
  setRam: (ram) => set({ ram }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setResult: (result) => set({ result }),
  reset: () =>
    set({
      gpu: '',
      cpu: '',
      ram: 8,
      selectedGame: 'gta-v',
      result: null,
      isLoading: false,
    }),
}))