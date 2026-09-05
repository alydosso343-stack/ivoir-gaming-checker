'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Zap, Loader2, Sparkles, RefreshCw } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'
import GameSearchInput from './GameSearchInput'
import HardwareSelector from './HardwareSelector'

export default function HeroChecker() {
  const [isLoading, setIsLoading] = useState(false)
  const { selectedGame, cpu, gpu, ram, setResult } = useCheckerStore()

  const handleCheck = async () => {
    if (!selectedGame || (!cpu && !gpu)) return
    setIsLoading(true)

    const fullSpecs = `CPU: ${cpu || 'Non spécifié'}, GPU: ${gpu || 'Graphiques intégrés'}, RAM: ${ram}`

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawInput: fullSpecs,
          gameSlug: selectedGame.name,
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative w-full min-h-[580px] flex items-center justify-center overflow-hidden py-10 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/50 via-black to-black" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Moteur Diagnostic IA Llama 3.1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase"
        >
          Vérifie la compatibilité PC de <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            Tes Jeux Préférés
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950/90 border border-cyan-500/20 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl shadow-cyan-950/60 max-w-4xl mx-auto space-y-5"
        >
          {/* Étape 1 : Choisir le Jeu */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" /> 1. Recherche ou Sélectionne un Jeu
            </label>
            <GameSearchInput />
          </div>

          {/* Étape 2 : Sélecteurs de Matériel */}
          <HardwareSelector />

          {/* Bouton de Validation */}
          <button
            onClick={handleCheck}
            disabled={isLoading || !selectedGame || (!cpu && !gpu)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-black uppercase tracking-wider text-xs md:text-sm hover:brightness-125 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                Analyse de compatibilité en cours...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black" />
                Lancer le Test de Compatibilité
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}