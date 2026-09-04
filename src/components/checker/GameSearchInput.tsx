'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, Gamepad2 } from 'lucide-react'

interface GameResult {
  id: number
  title: string
  slug: string
  headerImage: string
}

interface Props {
  onSelectGame: (gameTitle: string, gameSlug: string, image: string) => void
}

export default function GameSearchInput({ onSelectGame }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GameResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedGame, setSelectedGame] = useState<GameResult | null>(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Erreur chargement jeux:', err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (game: GameResult) => {
    setSelectedGame(game)
    setQuery(game.title)
    setResults([])
    onSelectGame(game.title, game.slug, game.headerImage)
  }

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
        <Gamepad2 className="w-4 h-4 text-green-500" />
        Chercher un jeu PC (Steam)
      </label>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (selectedGame) setSelectedGame(null)
          }}
          placeholder="Ex: FIFA, GTA V, Cyberpunk, Naruto..."
          className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl p-3 pl-10 focus:outline-none focus:border-green-500 transition placeholder-gray-500"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
        {loading && <Loader2 className="w-4 h-4 text-green-400 animate-spin absolute right-3 top-3.5" />}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50 max-h-72 overflow-y-auto">
          {results.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => handleSelect(game)}
              className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-800 transition text-left cursor-pointer border-b border-gray-800/50 last:border-none"
            >
              <img
                src={game.headerImage}
                alt={game.title}
                className="w-16 h-8 object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none'
                }}
              />
              <span className="text-sm font-semibold text-gray-200 truncate">{game.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}