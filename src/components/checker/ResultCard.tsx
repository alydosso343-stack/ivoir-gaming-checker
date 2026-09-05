'use client'

import { useCheckerStore } from '@/store/useCheckerStore'
import { CheckCircle, AlertTriangle, XCircle, Zap } from 'lucide-react'

export default function ResultCard() {
  const { selectedGame, userConfig, result } = useCheckerStore()

  if (!result || !selectedGame) return null

  const gameTitle = selectedGame.name || selectedGame.title

  const getStatusBadge = () => {
    switch (result.status) {
      case 'PERFECT':
        return (
          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <CheckCircle className="w-4 h-4" /> Parfait (60+ FPS)
          </span>
        )
      case 'FLUID':
        return (
          <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <Zap className="w-4 h-4" /> Très Fluide
          </span>
        )
      case 'PLAYABLE':
        return (
          <span className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <AlertTriangle className="w-4 h-4" /> Jouable
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-1.5 text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <XCircle className="w-4 h-4" /> Incompatible
          </span>
        )
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Résultat du diagnostic
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5">{gameTitle}</h2>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <span className="text-xs text-gray-500 block">CPU utilisé</span>
          <span className="text-sm font-semibold text-gray-200">
            {userConfig.cpu || 'Non renseigné'}
          </span>
        </div>
        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <span className="text-xs text-gray-500 block">GPU utilisé</span>
          <span className="text-sm font-semibold text-gray-200">
            {userConfig.gpu || 'Non renseigné'}
          </span>
        </div>
        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <span className="text-xs text-gray-500 block">RAM disponible</span>
          <span className="text-sm font-semibold text-gray-200">{userConfig.ram}</span>
        </div>
      </div>

      {result.recommendations && result.recommendations.length > 0 && (
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
            Conseils d'optimisation
          </h4>
          <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}