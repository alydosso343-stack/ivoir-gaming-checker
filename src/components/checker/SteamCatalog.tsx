'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Play, Sparkles, MonitorCheck } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'

const STEAM_CATALOG = [
  { id: 271590, name: 'Grand Theft Auto V', category: 'Action / Monde Ouvert', rating: '4.8', minCpu: 'Core 2 Quad Q6600', image: 'https://cdn2.unrealengine.com/egs-grandtheftauto-rockstargames-g1a-00-1920x1080-353683884.jpg', tag: 'Top CI 🇨🇮' },
  { id: 1091500, name: 'Cyberpunk 2077', category: 'RPG / Next-Gen', rating: '4.7', minCpu: 'Core i7-6700', image: 'https://images.sqex-cdn.net/squareenix/game/cyberpunk2077/hero.jpg', tag: 'Lourd' },
  { id: 1172470, name: 'Apex Legends', category: 'Battle Royale', rating: '4.6', minCpu: 'Core i3-6300', image: 'https://images.alphacoders.com/100/1000673.jpg', tag: 'Gratuit' },
  { id: 2195250, name: 'EA SPORTS FC 24', category: 'Sport / Football', rating: '4.5', minCpu: 'Core i5-6600K', image: 'https://e0.365dm.com/23/07/1600x900/skysports-ea-sports-fc-24_6218174.jpg', tag: 'Populaire' },
  { id: 570, name: 'Dota 2', category: 'MOBA / eSport', rating: '4.9', minCpu: 'Dual Core Intel/AMD', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg', tag: 'PC Bureautique OK' },
  { id: 730, name: 'Counter-Strike 2', category: 'FPS / Compétitif', rating: '4.8', minCpu: 'Core i5-750', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', tag: 'Très Demandé' },
  { id: 1085660, name: 'Destiny 2', category: 'Action / MMO', rating: '4.4', minCpu: 'Core i3-3250', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg', tag: 'Gratuit' },
  { id: 359550, name: 'Tom Clancy\'s Rainbow Six Siege', category: 'Tactique FPS', rating: '4.6', minCpu: 'Core i3-560', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg', tag: 'Populaire' },
]

export default function SteamCatalog() {
  const { setSelectedGame } = useCheckerStore()
  const [filter, setFilter] = useState('ALL')

  const filteredGames = STEAM_CATALOG.filter((g) => {
    if (filter === 'LIGHT') return g.tag.includes('PC Bureautique') || g.tag.includes('Gratuit')
    if (filter === 'TOP') return g.tag.includes('Top CI') || g.tag.includes('Populaire')
    return true
  })

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      {/* Header section avec filtres */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-wide uppercase flex items-center gap-2">
              Catalogue Steam & Tendance CI <Sparkles className="w-4 h-4 text-cyan-400" />
            </h2>
            <p className="text-xs text-gray-400">
              Clique sur un jeu pour l&apos;insérer directement dans le testeur
            </p>
          </div>
        </div>

        {/* Filtres de catégorie */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'ALL'
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            Tous les Jeux
          </button>
          <button
            onClick={() => setFilter('TOP')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'TOP'
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            Top Côte d&apos;Ivoire
          </button>
          <button
            onClick={() => setFilter('LIGHT')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'LIGHT'
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            PC Bureautique OK
          </button>
        </div>
      </div>

      {/* Grille de cartes Steam */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ y: -6 }}
            className="group relative bg-gray-950 border border-gray-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div className="relative h-44 w-full overflow-hidden bg-gray-900">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

              <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                {game.tag}
              </span>

              <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                {game.rating}
              </div>
            </div>

            <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-white text-sm group-hover:text-cyan-400 transition-colors">
                  {game.name}
                </h3>
                <p className="text-[11px] text-gray-400">{game.category}</p>
                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                  <MonitorCheck className="w-3 h-3 text-cyan-500" /> Min CPU: {game.minCpu}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedGame({ id: game.id, name: game.name, header_image: game.image })
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/30 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Sélectionner pour le Test
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}