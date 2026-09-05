'use client'

import { useEffect, useState } from 'react'
import { useCheckerStore } from '@/store/useCheckerStore'
import { analyzeCompatibility } from '@/utils/checkerEngine'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Gauge,
  Cpu,
  Zap,
  HardDrive,
  Lightbulb,
  Sliders,
  ShieldCheck,
} from 'lucide-react'

export default function ResultCard() {
  const [mounted, setMounted] = useState(false)
  const { selectedGame, userConfig } = useCheckerStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Empêche le rendu côté serveur pour éviter les erreurs d'hydratation avec Zustand
  if (!mounted || !selectedGame) {
    return null
  }

  const analysis = analyzeCompatibility ? analyzeCompatibility(selectedGame, userConfig) : null

  if (!analysis) {
    return null
  }

  const getStatusBadge = () => {
    switch (analysis?.verdictStatus) {
      case 'EXCELLENT':
        return {
          bg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400',
          icon: <CheckCircle2 className="w-7 h-7 text-emerald-400" />,
          tag: 'PARFAIT / 60+ FPS',
        }
      case 'GOOD':
        return {
          bg: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400',
          icon: <ShieldCheck className="w-7 h-7 text-cyan-400" />,
          tag: 'TRÈS FLUIDE',
        }
      case 'PLAYABLE':
        return {
          bg: 'bg-amber-950/60 border-amber-500/40 text-amber-400',
          icon: <AlertTriangle className="w-7 h-7 text-amber-400" />,
          tag: 'JOUABLE (720p/LOW)',
        }
      default:
        return {
          bg: 'bg-rose-950/60 border-rose-500/40 text-rose-400',
          icon: <XCircle className="w-7 h-7 text-rose-400" />,
          tag: 'INCOMPATIBLE / RAME',
        }
    }
  }

  const status = getStatusBadge()

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className={`border rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all ${status.bg}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-800/80 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black/40 rounded-2xl border border-white/10">
              {status.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                  {status.tag}
                </span>
                <span className="text-xs text-gray-400">
                  Testé pour : <strong className="text-white">{selectedGame?.name || 'Jeu'}</strong>
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                {analysis?.verdictTitle || 'Résultat'}
              </h2>
              <p className="text-xs text-gray-300 mt-1 max-w-xl">
                {analysis?.verdictDescription || ''}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto bg-black/60 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-lg">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <Gauge className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                ESTIMATION FPS RÉELLE
              </span>
              <span className="text-2xl font-black text-cyan-400 tracking-tight">
                {analysis?.fpsLabel || 'N/A'}
              </span>
              <span className="text-[11px] text-gray-400 block font-mono">
                Préréglage : {analysis?.resolutionPreset || '1080p'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Analyse Matérielle Détaillée
            </h3>

            <div className="space-y-3">
              <div className="bg-black/40 border border-gray-800 p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span className="flex items-center gap-2 text-emerald-400">
                    <Zap className="w-3.5 h-3.5" /> Carte Graphique (GPU)
                  </span>
                  <span className="font-mono text-[11px] text-gray-400">
                    Score : {analysis?.gpuScore ?? 0}/100
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {analysis?.gpuAnalysis || ''}
                </p>
              </div>

              <div className="bg-black/40 border border-gray-800 p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span className="flex items-center gap-2 text-cyan-400">
                    <Cpu className="w-3.5 h-3.5" /> Processeur (CPU)
                  </span>
                  <span className="font-mono text-[11px] text-gray-400">
                    Score : {analysis?.cpuScore ?? 0}/100
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {analysis?.cpuAnalysis || ''}
                </p>
              </div>

              <div className="bg-black/40 border border-gray-800 p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span className="flex items-center gap-2 text-purple-400">
                    <HardDrive className="w-3.5 h-3.5" /> Mémoire RAM
                  </span>
                  <span className="font-mono text-[11px] text-gray-400">
                    {userConfig?.ram || '8 GB'}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {analysis?.ramAnalysis || ''}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Recommandations & Optimisation
            </h3>

            <div className="bg-black/40 border border-gray-800 p-4 rounded-xl space-y-3">
              {analysis?.bottleneck && analysis.bottleneck !== 'NONE' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2 text-amber-300 text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    <strong>Goulot d&apos;étranglement détecté :</strong> Le composant <strong>{analysis.bottleneck}</strong> bride les performances globales.
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Astuces pour maximiser vos FPS :
                </span>
                <ul className="space-y-2">
                  {(analysis?.recommendations || []).map((rec, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2 bg-gray-900/60 p-2.5 rounded-lg border border-gray-800">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}