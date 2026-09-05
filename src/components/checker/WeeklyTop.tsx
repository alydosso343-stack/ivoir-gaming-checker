'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Play, Search, Filter, ChevronDown } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'
import GameImage from '@/components/ui/GameImage'

export const CATALOG_50_GAMES = [
  { id: 271590, name: 'GTA V / Grand Theft Auto V', category: 'Action', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg' },
  { id: 2195250, name: 'EA SPORTS FC 24', category: 'Sport', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/header.jpg' },
  { id: 1811260, name: 'FIFA 23', category: 'Sport', rating: '4.5', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1811260/header.jpg' },
  { id: 1665460, name: 'eFootball 2024', category: 'Sport', rating: '4.2', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1665460/header.jpg' },
  { id: 2338770, name: 'NBA 2K24', category: 'Sport', rating: '4.1', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2338770/header.jpg' },
  { id: 1091500, name: 'Cyberpunk 2077', category: 'RPG', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg' },
  { id: 1172470, name: 'Apex Legends', category: 'FPS', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg' },
  { id: 730, name: 'Counter-Strike 2', category: 'FPS', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg' },
  { id: 1938090, name: 'Call of Duty: Warzone', category: 'FPS', rating: '4.5', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg' },
  { id: 578080, name: 'PUBG: BATTLEGROUNDS', category: 'FPS', rating: '4.4', image: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg' },
  { id: 359550, name: "Tom Clancy's Rainbow Six Siege", category: 'FPS', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg' },
  { id: 1174180, name: 'Red Dead Redemption 2', category: 'Action', rating: '5.0', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg' },
  { id: 1245620, name: 'ELDEN RING', category: 'RPG', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg' },
  { id: 2358720, name: 'Black Myth: Wukong', category: 'Action', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg' },
  { id: 1623730, name: 'Palworld', category: 'RPG', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg' },
  { id: 553850, name: 'HELLDIVERS 2', category: 'Action', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg' },
  { id: 292030, name: 'The Witcher 3: Wild Hunt', category: 'RPG', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg' },
  { id: 990080, name: 'Hogwarts Legacy', category: 'RPG', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg' },
  { id: 1593500, name: 'God of War', category: 'Action', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg' },
  { id: 1817070, name: "Marvel's Spider-Man Remastered", category: 'Action', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg' },
  { id: 1551360, name: 'Forza Horizon 5', category: 'Course', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg' },
  { id: 1846380, name: 'Need for Speed Unbound', category: 'Course', rating: '4.2', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg' },
  { id: 244210, name: 'Assetto Corsa', category: 'Course', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg' },
  { id: 227300, name: 'Euro Truck Simulator 2', category: 'Simulation', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg' },
  { id: 252950, name: 'Rocket League', category: 'Sport', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg' },
  { id: 2208920, name: "Assassin's Creed Valhalla", category: 'Action', rating: '4.4', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2208920/header.jpg' },
  { id: 2369390, name: 'Far Cry 6', category: 'FPS', rating: '4.3', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2369390/header.jpg' },
  { id: 2050650, name: 'Resident Evil 4 Remake', category: 'Action', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg' },
  { id: 1778820, name: 'TEKKEN 8', category: 'Combat', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1778820/header.jpg' },
  { id: 1364780, name: 'Street Fighter 6', category: 'Combat', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1364780/header.jpg' },
  { id: 1798010, name: 'Mortal Kombat 1', category: 'Combat', rating: '4.3', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1798010/header.jpg' },
  { id: 1888930, name: 'The Last of Us Part I', category: 'Action', rating: '4.5', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg' },
  { id: 1659420, name: 'UNCHARTED: Legacy of Thieves', category: 'Action', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1659420/header.jpg' },
  { id: 1259420, name: 'Days Gone', category: 'Action', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1259420/header.jpg' },
  { id: 1151640, name: 'Horizon Zero Dawn Complete Edition', category: 'Action', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg' },
  { id: 252490, name: 'Rust', category: 'Survie', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg' },
  { id: 346110, name: 'ARK: Survival Evolved', category: 'Survie', rating: '4.4', image: 'https://cdn.akamai.steamstatic.com/steam/apps/346110/header.jpg' },
  { id: 1172620, name: 'Sea of Thieves', category: 'Action', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg' },
  { id: 1332010, name: 'Stray', category: 'Aventure', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1332010/header.jpg' },
  { id: 1030840, name: 'Mafia: Definitive Edition', category: 'Action', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg' },
  { id: 307690, name: 'Sleeping Dogs: Definitive Edition', category: 'Action', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/307690/header.jpg' },
  { id: 447040, name: 'Watch Dogs 2', category: 'Action', rating: '4.4', image: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg' },
  { id: 208650, name: 'Batman: Arkham Knight', category: 'Action', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg' },
  { id: 870780, name: 'Control Ultimate Edition', category: 'Action', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/870780/header.jpg' },
  { id: 377160, name: 'Fallout 4', category: 'RPG', rating: '4.6', image: 'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg' },
  { id: 489830, name: 'The Elder Scrolls V: Skyrim Special Edition', category: 'RPG', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg' },
  { id: 397540, name: 'Borderlands 3', category: 'FPS', rating: '4.5', image: 'https://cdn.akamai.steamstatic.com/steam/apps/397540/header.jpg' },
  { id: 534380, name: 'Dying Light 2 Stay Human', category: 'Action', rating: '4.3', image: 'https://cdn.akamai.steamstatic.com/steam/apps/534380/header.jpg' },
  { id: 601150, name: 'Devil May Cry 5', category: 'Action', rating: '4.9', image: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg' },
  { id: 582010, name: 'Monster Hunter: World', category: 'RPG', rating: '4.8', image: 'https://cdn.akamai.steamstatic.com/steam/apps/582010/header.jpg' },
  { id: 1850570, name: 'DEATH STRANDING DIRECTOR\'S CUT', category: 'Action', rating: '4.7', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1850570/header.jpg' },
]

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
      {/* En-tête de section */}
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

        {/* Barre de recherche dans le catalogue */}
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

      {/* Onglets de filtres */}
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

      {/* Grille des jeux */}
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

      {/* Bouton Charger Plus */}
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