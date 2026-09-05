import { create } from 'zustand'

export interface SelectedGame {
  id: number | string
  name: string
  header_image?: string
}

export interface CheckResult {
  canRun: boolean
  fpsEstimate: string
  verdict: string
  explanation: string
  recommendations: string[]
  gameTitle?: string
  isAiFallback?: boolean
  fpsAvg?: string
  setting?: string
  notes?: string
  youtubeUrl?: string
}

interface CheckerState {
  selectedGame: SelectedGame | null
  cpu: string
  gpu: string
  ram: string
  result: CheckResult | null
  isLoading: boolean
  setSelectedGame: (game: SelectedGame | null) => void
  setCpu: (cpu: string) => void
  setGpu: (gpu: string) => void
  setRam: (ram: string) => void
  setResult: (result: CheckResult | null) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useCheckerStore = create<CheckerState>((set) => ({
  selectedGame: null,
  cpu: '',
  gpu: '',
  ram: '8 Go',
  result: null,
  isLoading: false,
  setSelectedGame: (game) => set({ selectedGame: game }),
  setCpu: (cpu) => set({ cpu }),
  setGpu: (gpu) => set({ gpu }),
  setRam: (ram) => set({ ram }),
  setResult: (result) => set({ result }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))