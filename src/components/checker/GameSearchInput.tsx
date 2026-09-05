'use client'

import { useState, useEffect } from 'react'
import { useCheckerStore, SelectedGame } from '@/store/useCheckerStore'
import { Search } from 'lucide-react'

interface GameSearchInputProps {
  games?: SelectedGame[]
}

export default function GameSearchInput({ games = [] }: GameSearchInputProps) {
  const { selectedGame, setSelectedGame } = useCheckerStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSearchTerm(selectedGame?.title ?? '')
  }, [selectedGame])

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un jeu..."
          className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition"
        />
      </div>

      {isOpen && searchTerm && filteredGames.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto">
          {filteredGames.map((game) => (
            <li
              key={game.id.toString()}
              onClick={() => {
                setSelectedGame(game)
                setSearchTerm(game.title)
                setIsOpen(false)
              }}
              className="px-4 py-3 hover:bg-slate-800 cursor-pointer text-sm text-gray-200 transition flex items-center justify-between"
            >
              <span>{game.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}