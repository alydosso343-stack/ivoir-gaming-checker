'use client'

import { useState } from 'react'
import { useCheckerStore } from '@/store/useCheckerStore'
import GameSearchInput from './GameSearchInput'
import { Search, Cpu, Loader2, Sparkles } from 'lucide-react'

const HARDWARE_PRESETS = [
  'Intel HD 520',
  'Intel UHD 620',
  'GT 710',
  'GTX 750 Ti',
  'GTX 1050',
]

export default function HeroChecker() {
  const [rawInput, setRawInput] = useState<string>('')
  const [selectedGameSlug, setSelectedGameSlug] = useState<string>('gta-v')
  const { setGpu, setSelectedGame, setIsLoading, isLoading, setResult } = useCheckerStore()

  const handleSelectGame = (gameTitle: string, gameSlug: string) => {
    setSelectedGameSlug(gameSlug)
    setSelectedGame(gameSlug)
  }

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rawInput?.trim()) return

    setIsLoading(true)
    setGpu(rawInput)

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawInput, gameSlug: selectedGameSlug }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error('Erreur lors de l’analyse :', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Ton PC peut-il tourner <span className="text-green-500">ton jeu préféré</span> ?
        </h1>
        <p className="text-gray-400">
          Analyse instantanée optimisée pour les configurations PC courantes en Côte d&apos;Ivoire.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl shadow-2xl backdrop-blur-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GameSearchInput onSelectGame={handleSelectGame} />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-green-500" />
              Ta configuration (GPU / CPU / RAM)
            </label>
            <input
              type="text"
              placeholder="Ex: Intel UHD 620, Core i5 8è gen"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-green-500 transition placeholder-gray-500"
            />
          </div>
        </div>

        {/* Boutons de raccourcis rapides GPU */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Raccourcis fréquents à Abidjan :
          </p>
          <div className="flex flex-wrap gap-2">
            {HARDWARE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setRawInput(preset)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer font-medium ${
                  rawInput === preset
                    ? 'bg-green-500/20 text-green-400 border-green-500/50'
                    : 'bg-gray-800/60 text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white'
                }`}
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !(rawInput ?? '').trim()}
          className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Vérifier la compatibilité
            </>
          )}
        </button>
      </form>
    </section>
  )
}