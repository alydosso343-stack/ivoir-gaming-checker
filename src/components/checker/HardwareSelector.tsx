'use client'

import { useCheckerStore } from '@/store/useCheckerStore'

const CPU_LIST = [
  { id: 'i5-12400', name: 'Intel Core i5-12400F', score: 65 },
  { id: 'i7-13700k', name: 'Intel Core i7-13700K', score: 88 },
  { id: 'ryzen5-5600', name: 'AMD Ryzen 5 5600', score: 62 },
  { id: 'ryzen7-7800x3d', name: 'AMD Ryzen 7 7800X3D', score: 98 },
]

const GPU_LIST = [
  { id: 'gtx1060', name: 'NVIDIA GeForce GTX 1060 (6GB)', score: 35 },
  { id: 'rtx3060', name: 'NVIDIA GeForce RTX 3060 (12GB)', score: 60 },
  { id: 'rtx4070', name: 'NVIDIA GeForce RTX 4070 (12GB)', score: 85 },
  { id: 'rx6600', name: 'AMD Radeon RX 6600', score: 55 },
]

const RAM_OPTIONS = ['8 GB', '16 GB', '32 GB', '64 GB']

export default function HardwareSelector() {
  const { userConfig, setUserConfig } = useCheckerStore()

  const handleCpuChange = (cpuId: string) => {
    const selectedCpu = CPU_LIST.find((item) => item.id === cpuId) || null
    setUserConfig({
      ...userConfig,
      cpu: selectedCpu,
    })
  }

  const handleGpuChange = (gpuId: string) => {
    const selectedGpu = GPU_LIST.find((item) => item.id === gpuId) || null
    setUserConfig({
      ...userConfig,
      gpu: selectedGpu,
    })
  }

  const handleRamChange = (ramValue: string) => {
    setUserConfig({
      ...userConfig,
      ram: ramValue,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1">
          PROCESSEUR (CPU)
        </label>
        <select
          value={userConfig?.cpu?.id || ''}
          onChange={(e) => handleCpuChange(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-cyan-500"
        >
          <option value="">-- Sélectionner CPU --</option>
          {CPU_LIST.map((cpu) => (
            <option key={cpu.id} value={cpu.id}>
              {cpu.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1">
          CARTE GRAPHIQUE (GPU)
        </label>
        <select
          value={userConfig?.gpu?.id || ''}
          onChange={(e) => handleGpuChange(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-cyan-500"
        >
          <option value="">-- Sélectionner GPU --</option>
          {GPU_LIST.map((gpu) => (
            <option key={gpu.id} value={gpu.id}>
              {gpu.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1">
          MÉMOIRE RAM
        </label>
        <select
          value={userConfig?.ram || '8 GB'}
          onChange={(e) => handleRamChange(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-cyan-500"
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