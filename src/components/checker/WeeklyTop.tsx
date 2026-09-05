'use client'

import { motion } from 'framer-motion'
import { Flame, Star, Play } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'

const TOP_GAMES = [
  { id: 271590, name: 'GTA V', rating: '4.8', genre: 'Action / Monde Ouvert', image: 'https://cdn2.unrealengine.com/egs-grandtheftauto-rockstargames-g1a-00-1920x1080-353683884.jpg' },
  { id: 2195250, name: 'FC 24 / FIFA', rating: '4.5', genre: 'Sport / Football', image: 'https://e0.365dm.com/23/07/1600x900/skysports-ea-sports-fc-24_6218174.jpg' },
  { id: 1091500, name: 'Cyberpunk 2077', rating: '4.7', genre: 'RPG / Cyberpunk', image: 'https://images.sqex-cdn.net/squareenix/game/cyberpunk2077/hero.jpg' },
  { id: 1172470, name: 'Fortnite', rating: '4.6', genre: 'Battle Royale', image: 'https://cdn2.unrealengine.com/14br-s14-keyart-1920x1080-1920x1080-870632283.jpg' },
]

export default function WeeklyTop() {
  const { setSelectedGame } = useCheckerStore()

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-wide uppercase">
              Tendance en Côte d&apos;Ivoire
            </h2>
            <p className="text-xs text-gray-400">
              Les jeux les plus vérifiés cette semaine
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOP_GAMES.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ y: -6 }}
            className="group relative bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-950">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                {game.rating}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition-colors">
                  {game.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{game.genre}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedGame({ id: game.id, name: game.name, header_image: game.image })
                  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    </section>
  )
}