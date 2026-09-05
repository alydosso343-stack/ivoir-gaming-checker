'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, Gamepad2 } from 'lucide-react'
import { useCheckerStore, SelectedGame } from '@/store/useCheckerStore'

interface Props {
  onSelectGame?: (game: SelectedGame) => void
}

export default function GameSearchInput({ onSelectGame }: Props) {
  const { selectedGame, setSelectedGame } = useCheckerStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SelectedGame[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (selectedGame) {
      setQuery(selectedGame.name)
    }
  }, [selectedGame])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchGames = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(Array.isArray(data) ? data : [])
        setIsOpen(true)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(searchGames, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (game: SelectedGame) => {
    setSelectedGame(game)
    if (onSelectGame) onSelectGame(game)
    setQuery(game.name)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!e.target.value) setSelectedGame(null)
          }}
          placeholder="Rechercher un jeu (ex: GTA V, FIFA, Fortnite...)"
          className="w-full bg-gray-900 border border-gray-800 text-white placeholder-gray-500 text-xs rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-cyan-500 transition-all"
        />
        {loading && <Loader2 className="absolute right-3.5 w-4 h-4 animate-spin text-cyan-400" />}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto divide-y divide-gray-900">
          {results.map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelect(game)}
              className="w-full text-left px-4 py-2.5 text-xs text-gray-200 hover:bg-cyan-950/50 hover:text-cyan-400 flex items-center gap-2 transition-colors"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
              <span className="truncate font-semibold">{game.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}