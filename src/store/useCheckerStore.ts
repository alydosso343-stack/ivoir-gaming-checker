import { create } from 'zustand'

export interface UserConfig {
  cpu: string
  gpu: string
  ram: string
}

export interface SelectedGame {
  id: string
  title: string
  name?: string
  image?: string
  requirements?: {
    minimum?: string
    recommended?: string
  }
}

export interface GameResult {
  status: 'PERFECT' | 'FLUID' | 'PLAYABLE' | 'UNPLAYABLE'
  fpsEstimate: number
  bottleneck: string | null
  recommendations: string[]
}

export interface CheckerState {
  selectedGame: SelectedGame | null
  cpu: string
  gpu: string
  ram: string
  userConfig: UserConfig
  result: GameResult | null
  setSelectedGame: (game: SelectedGame | null) => void
  setCpu: (cpu: string) => void
  setGpu: (gpu: string) => void
  setRam: (ram: string) => void
  setUserConfig: (config: UserConfig) => void
  setResult: (result: GameResult | null) => void
}

export const useCheckerStore = create<CheckerState>((set) => ({
  selectedGame: null,
  cpu: '',
  gpu: '',
  ram: '16GB',
  userConfig: { cpu: '', gpu: '', ram: '16GB' },
  result: null,
  setSelectedGame: (game) =>
    set({
      selectedGame: game
        ? {
            ...game,
            id: game.id.toString(),
            name: game.name || game.title,
            title: game.title || game.name || '',
          }
        : null,
    }),
  setCpu: (cpu) =>
    set((state) => ({ cpu, userConfig: { ...state.userConfig, cpu } })),
  setGpu: (gpu) =>
    set((state) => ({ gpu, userConfig: { ...state.userConfig, gpu } })),
  setRam: (ram) =>
    set((state) => ({ ram, userConfig: { ...state.userConfig, ram } })),
  setUserConfig: (userConfig) =>
    set({ userConfig, cpu: userConfig.cpu, gpu: userConfig.gpu, ram: userConfig.ram }),
  setResult: (result) => set({ result }),
}))