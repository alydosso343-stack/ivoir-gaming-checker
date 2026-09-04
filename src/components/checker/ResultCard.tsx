'use client'

import { useCheckerStore } from '@/store/useCheckerStore'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, ExternalLink, Lightbulb } from 'lucide-react'

export default function ResultCard() {
  const { result } = useCheckerStore()

  // Empêche le crash si aucun résultat n'est disponible
  if (!result) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl space-y-6"
    >
      <div className="flex items-start justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Résultat pour <span className="text-green-400">{result.gameTitle ?? 'Jeu sélectionné'}</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {result.isAiFallback
              ? 'Analyse générée par l’IA (Groq)'
              : 'Analyse basée sur les benchmarks de la base de données'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {result.canRun ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
              <CheckCircle2 className="w-4 h-4" /> Jouable
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              <XCircle className="w-4 h-4" /> Non fluide
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">FPS Moyen Estimé</p>
          <p className="text-3xl font-extrabold text-green-400 mt-1">{result.fpsAvg} FPS</p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Réglage Conseillé</p>
          <p className="text-xl font-bold text-white mt-2">{result.setting}</p>
        </div>
      </div>

      {result.notes && (
        <div className="bg-gray-800/30 border border-gray-800 p-4 rounded-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">{result.notes}</p>
        </div>
      )}

      {result.youtubeUrl && (
        <a
          href={result.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-medium transition"
        >
          Voir le gameplay de référence sur YouTube <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  )
}