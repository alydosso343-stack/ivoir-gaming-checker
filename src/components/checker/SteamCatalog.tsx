'use client'

import { useCheckerStore, SelectedGame } from '@/store/useCheckerStore'

interface SteamCatalogProps {
  games?: SelectedGame[]
}

export default function SteamCatalog({ games = [] }: SteamCatalogProps) {
  const { setSelectedGame } = useCheckerStore()

  return (
    <div className="w-full py-8">
      <h2 className="text-xl font-bold text-white mb-4">Jeux Populaires Steam</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => {
          const idStr = game.id.toString()
          return (
            <div
              key={idStr}
              id={idStr}
              onClick={() => setSelectedGame(game)}
              className="p-4 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl cursor-pointer transition group"
            >
              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                {game.title}
              </h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}