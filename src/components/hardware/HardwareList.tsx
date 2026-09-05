'use client'

import { Cpu, HardDrive, Zap } from 'lucide-react'

const CPU_HARDWARE = [
  { name: 'Intel Core i3-6006U / i5-4200U', tier: 'Entrée de gamme', fpsTarget: '720p / 30 FPS' },
  { name: 'Intel Core i5-8250U / i5-10210U', tier: 'Bureautique + Gaming Léger', fpsTarget: '1080p / 30-45 FPS' },
  { name: 'AMD Ryzen 3 3200G / Ryzen 5 5500U', tier: 'iGPU Performant', fpsTarget: '1080p / 45-60 FPS' },
  { name: 'Intel Core i7-10700K / Ryzen 5 5600X', tier: 'Gaming Avancé', fpsTarget: '1080p High / 60+ FPS' },
]

const GPU_HARDWARE = [
  { name: 'Intel HD 520 / UHD 620', type: 'Intégré (iGPU)', capability: 'E-Sports basiques (CS2, League of Legends)' },
  { name: 'NVIDIA GT 730 / GT 1030', type: 'Dédié Entrée', capability: 'GTA V (720p), Valorant, Rocket League' },
  { name: 'NVIDIA GTX 750 Ti / GTX 1050 Ti', type: 'Dédié Budget', capability: 'FIFA 23, GTA V 1080p, Rainbow Six' },
  { name: 'NVIDIA GTX 1650 / RX 580 8GB', type: 'Dédié Intermédiaire', capability: 'Apex Legends, Warzone, Cyberpunk Low' },
  { name: 'NVIDIA RTX 2060 / RTX 3050', type: 'Dédié Performance', capability: 'Tous jeux AAA en 1080p High/Ultra' },
]

export default function HardwareList() {
  return (
    <section id="hardware" className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-gray-800 pb-6 flex items-center gap-3">
        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide uppercase">
            Matériel GPU / CPU & Échelle de Performances
          </h2>
          <p className="text-xs text-gray-400">
            Guide des composants fréquemment rencontrés en Côte d'Ivoire
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold uppercase text-emerald-400 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Cartes Graphiques (GPU)
          </h3>
          <div className="space-y-3">
            {GPU_HARDWARE.map((gpu, idx) => (
              <div key={idx} className="bg-black/40 border border-gray-800/80 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{gpu.name}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {gpu.type}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{gpu.capability}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold uppercase text-cyan-400 flex items-center gap-2">
            <HardDrive className="w-4 h-4" /> Processeurs (CPU)
          </h3>
          <div className="space-y-3">
            {CPU_HARDWARE.map((cpu, idx) => (
              <div key={idx} className="bg-black/40 border border-gray-800/80 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{cpu.name}</span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {cpu.fpsTarget}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{cpu.tier}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
