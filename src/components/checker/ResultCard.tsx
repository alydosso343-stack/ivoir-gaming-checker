'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Gauge, Cpu, Wrench, Youtube, Info } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'

export default function ResultCard() {
  const { result } = useCheckerStore()

  if (!result) return null

  const isCompatible = result.canRun

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 my-8"
    >
      <div className={`p-8 rounded-3xl border backdrop-blur-xl relative overflow-hidden ${
        isCompatible
          ? 'bg-emerald-950/30 border-emerald-500/30 shadow-2xl shadow-emerald-950/40'
          : 'bg-red-950/30 border-red-500/30 shadow-2xl shadow-red-950/40'
      }`}>
        {result.gameTitle && (
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
            Jeu analysé : {result.gameTitle}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            {isCompatible ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-12 h-12 text-red-400 flex-shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                  isCompatible ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  Verdict IA
                </span>
                {result.isAiFallback && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Info className="w-3 h-3" /> Estimation IA
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-white mt-2">{result.verdict}</h3>
            </div>
          </div>

          <div className="bg-black/60 border border-gray-800 px-6 py-3 rounded-2xl flex items-center gap-3">
            <Gauge className="w-6 h-6 text-cyan-400" />
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Estimation FPS</p>
              <p className="text-lg font-black text-cyan-400">{result.fpsEstimate || result.fpsAvg || 'N/A'}</p>
              {result.setting && (
                <p className="text-[10px] text-gray-500">Réglage : {result.setting}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Analyse Matérielle
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-gray-800/80">
              {result.explanation || result.notes || 'Aucune analyse détaillée fournie.'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" /> Recommandations
            </h4>
            <ul className="space-y-2">
              {result.recommendations?.map((rec, i) => (
                <li key={i} className="text-xs text-gray-300 bg-black/40 p-2.5 rounded-lg border border-gray-800/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {rec}
                </li>
              ))}
            </ul>

            {result.youtubeUrl && (
              <div className="pt-2">
                <a
                  href={result.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300 bg-red-950/40 border border-red-500/20 px-3 py-2 rounded-xl transition-all"
                >
                  <Youtube className="w-4 h-4" /> Voir un benchmark vidéo
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}