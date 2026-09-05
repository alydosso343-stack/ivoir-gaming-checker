'use client'

import { Cpu, HardDrive, Layers } from 'lucide-react'
import { useCheckerStore } from '@/store/useCheckerStore'

const CPUS = [
  'Intel Core i3 6th Gen (i3-6006U)',
  'Intel Core i5 4th Gen (i5-4200U)',
  'Intel Core i5 8th Gen (i5-8250U)',
  'Intel Core i5 10th Gen',
  'Intel Core i7 4th Gen',
  'Intel Celeron / Pentium',
  'AMD Ryzen 3 3200G',
  'AMD Ryzen 5 4500U / 5500U',
]

const GPUS = [
  'Intel HD Graphics 520 / 4000 (Intégré)',
  'Intel UHD Graphics 620',
  'AMD Radeon Vega 3 / Vega 8',
  'NVIDIA GeForce GT 730 / GT 1030',
  'NVIDIA GeForce GTX 750 Ti',
  'NVIDIA GeForce GTX 1050 / 1050 Ti',
  'NVIDIA GeForce GTX 1650',
  'NVIDIA GeForce RTX 2060 / 3050',
  'AMD Radeon RX 580 (8GB)',
]

const RAM_OPTIONS = ['4 Go', '8 Go', '12 Go', '16 Go', '32 Go']

export default function HardwareSelector() {
  const { cpu, gpu, ram, setCpu, setGpu, setRam } = useCheckerStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Selector CPU */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Processeur (CPU)
        </label>
        <select
          value={cpu}
          onChange={(e) => setCpu(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="">-- Sélectionner CPU --</option>
          {CPUS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Selector GPU */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-cyan-400" /> Carte Graphique (GPU)
        </label>
        <select
          value={gpu}
          onChange={(e) => setGpu(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="">-- Sélectionner GPU --</option>
          {GPUS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Selector RAM */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Mémoire RAM
        </label>
        <select
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          {RAM_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}