'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Play, Search, Filter, ChevronDown } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'
import GameImage from '@/components/ui/GameImage'
import { CATALOG_50_GAMES } from '@/data/games'

export default function WeeklyTop() {
  const { setSelectedGame } = useCheckerStore()
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const categories = ['Tous', 'Action', 'FPS', 'Sport', 'RPG', 'Course']

  const filteredGames = CATALOG_50_GAMES.filter((game) => {
    const matchesCategory = selectedCategory === 'Tous' || game.category === selectedCategory
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
              Catalogue PC <span className="text-cyan-400 text-sm font-bold bg-cyan-950 border border-cyan-500/30 px-2 py-0.5 rounded-md">+50 Jeux</span>
            </h2>
            <p className="text-xs text-gray-400">
              Sélectionne un jeu pour tester instantanément la compatibilité avec ton PC
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            placeholder="Filtrer les 50+ jeux..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat)
              setVisibleCount(12)
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-gray-900/80 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.slice(0, visibleCount).map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ y: -6 }}
            className="group relative bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div className="relative h-44 w-full overflow-hidden bg-gray-950">
              <GameImage
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                {game.rating}
              </div>
              <div className="absolute bottom-2 left-3 bg-black/80 text-[9px] uppercase font-bold text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                {game.category}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-white text-sm group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {game.name}
                </h3>
              </div>

              <button
                onClick={() => {
                  setSelectedGame({ id: game.id, name: game.name, header_image: game.image })
                  const checkerSection = document.getElementById('checker') || document.body
                  checkerSection.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Tester ce Jeu
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < filteredGames.length && (
        <div className="text-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 16)}
            className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 hover:border-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/10"
          >
            Afficher plus de jeux ({filteredGames.length - visibleCount} restants)
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      )}
    </section>
  )
}
