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
}

interface CheckerState {
  selectedGame: SelectedGame | null
  cpu: string
  gpu: string
  ram: string
  result: CheckResult | null
  setSelectedGame: (game: SelectedGame | null) => void
  setCpu: (cpu: string) => void
  setGpu: (gpu: string) => void
  setRam: (ram: string) => void
  setResult: (result: CheckResult | null) => void
}

export const useCheckerStore = create<CheckerState>((set) => ({
  selectedGame: null,
  cpu: '',
  gpu: '',
  ram: '8 Go',
  result: null,
  setSelectedGame: (game) => set({ selectedGame: game }),
  setCpu: (cpu) => set({ cpu }),
  setGpu: (gpu) => set({ gpu }),
  setRam: (ram) => set({ ram }),
  setResult: (result) => set({ result }),
}))