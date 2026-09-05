'use client'

import { useCheckerStore } from '@/store/useCheckerStore'
import GameSearchInput from './GameSearchInput'

export default function HeroChecker() {
  const { selectedGame, cpu, gpu, ram, setResult } = useCheckerStore()

  const handleCheck = () => {
    if (!selectedGame || !cpu || !gpu) return

    setResult({
      status: 'FLUID',
      fpsEstimate: 60,
      bottleneck: null,
      recommendations: ['Graphismes réglés en 1080p Élevé'],
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md shadow-2xl">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center">
        Tester la compatibilité PC
      </h1>

      <div className="space-y-4">
        <GameSearchInput />

        <div className="flex justify-center pt-4">
          <button
            onClick={handleCheck}
            disabled={!selectedGame || !cpu || !gpu}
            className="w-full sm:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-gray-600 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
          >
            Lancer le diagnostic
          </button>
        </div>
      </div>
    </div>
  )
}