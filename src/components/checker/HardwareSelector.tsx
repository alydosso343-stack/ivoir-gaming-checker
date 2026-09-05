'use client'

import { useCheckerStore } from '@/store/useCheckerStore'

export default function HardwareSelector() {
  const { userConfig, setUserConfig, setCpu, setGpu, setRam } = useCheckerStore()

  const handleCpuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCpu(value)
    setUserConfig({ ...userConfig, cpu: value })
  }

  const handleGpuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setGpu(value)
    setUserConfig({ ...userConfig, gpu: value })
  }

  const handleRamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setRam(value)
    setUserConfig({ ...userConfig, ram: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">
          Processeur (CPU)
        </label>
        <select
          value={userConfig.cpu}
          onChange={handleCpuChange}
          className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Sélectionner un CPU</option>
          <option value="Intel Core i5-10400F">Intel Core i5-10400F</option>
          <option value="Intel Core i7-12700K">Intel Core i7-12700K</option>
          <option value="AMD Ryzen 5 3600">AMD Ryzen 5 3600</option>
          <option value="AMD Ryzen 7 5700X">AMD Ryzen 7 5700X</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">
          Carte Graphique (GPU)
        </label>
        <select
          value={userConfig.gpu}
          onChange={handleGpuChange}
          className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Sélectionner une GPU</option>
          <option value="NVIDIA GTX 1650">NVIDIA GTX 1650</option>
          <option value="NVIDIA RTX 3060">NVIDIA RTX 3060</option>
          <option value="NVIDIA RTX 4070">NVIDIA RTX 4070</option>
          <option value="AMD Radeon RX 6600">AMD Radeon RX 6600</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">
          Mémoire RAM
        </label>
        <select
          value={userConfig.ram}
          onChange={handleRamChange}
          className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="8GB">8 GB</option>
          <option value="16GB">16 GB</option>
          <option value="32GB">32 GB</option>
        </select>
      </div>
    </div>
  )
}