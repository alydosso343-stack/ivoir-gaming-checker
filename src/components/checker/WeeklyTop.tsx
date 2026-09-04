'use client'

import { useCheckerStore } from '@/store/useCheckerStore'
import { TrendingUp, Sparkles } from 'lucide-react'

const POPULAR_SEARCHES = [
  { gpu: 'Intel HD Graphics 520', game: 'gta-v', label: 'HP Folio - GTA V' },
  { gpu: 'Intel UHD Graphics 620', game: 'efootball-2024', label: 'Core i5 8è gen - eFootball' },
  { gpu: 'NVIDIA GTX 750 Ti', game: 'gta-v', label: 'PC Fixe Gamer d\'entrée' },
  { gpu: 'Intel HD Graphics 4000', game: 'efootball-2024', label: 'Laptop Bureautique standard' },
]

export default function WeeklyTop() {
  const { setGpu, setSelectedGame, setIsLoading, setResult } = useCheckerStore()

  const handleSelectTrend = async (gpu: string, gameSlug: string) => {
    setGpu(gpu)
    setSelectedGame(gameSlug)
    setIsLoading(true)

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawInput: gpu, gameSlug }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error('Erreur test rapide :', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-bold text-white">Top Recherches Abidjan</h3>
        <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Tendances CI
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {POPULAR_SEARCHES.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectTrend(item.gpu, item.game)}
            className="p-3 bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl text-left transition group cursor-pointer"
          >
            <p className="font-semibold text-gray-200 group-hover:text-green-400 transition text-sm">
              {item.label}
            </p>
            <p className="text-xs text-gray-500 mt-1 truncate">{item.gpu}</p>
          </button>
        ))}
      </div>
    </div>
  )
}