export interface Game {
  id?: string
  name?: string
  minGpuScore?: number
  recGpuScore?: number
  minCpuScore?: number
  recCpuScore?: number
  minRamGb?: number
  recRamGb?: number
}

export interface HardwareConfig {
  gpu?: { id?: string; name?: string; score?: number } | null
  cpu?: { id?: string; name?: string; score?: number } | null
  ram?: string
}

export interface DetailedAnalysis {
  fpsMin: number
  fpsMax: number
  fpsLabel: string
  verdictStatus: 'EXCELLENT' | 'GOOD' | 'PLAYABLE' | 'INCOMPATIBLE'
  verdictTitle: string
  verdictDescription: string
  resolutionPreset: string
  gpuScore: number
  cpuScore: number
  gpuAnalysis: string
  cpuAnalysis: string
  ramAnalysis: string
  bottleneck: 'GPU' | 'CPU' | 'RAM' | 'NONE'
  recommendations: string[]
}

export function analyzeCompatibility(
  game?: Game | null,
  config?: HardwareConfig | null
): DetailedAnalysis {
  const defaultResult: DetailedAnalysis = {
    fpsMin: 0,
    fpsMax: 0,
    fpsLabel: 'N/A',
    verdictStatus: 'INCOMPATIBLE',
    verdictTitle: 'Configuration incomplète',
    verdictDescription: 'Veuillez sélectionner un jeu, un processeur et une carte graphique.',
    resolutionPreset: '1080p',
    gpuScore: 0,
    cpuScore: 0,
    gpuAnalysis: 'Aucune carte graphique détectée.',
    cpuAnalysis: 'Aucun processeur détecté.',
    ramAnalysis: 'Mémoire RAM non spécifiée.',
    bottleneck: 'NONE',
    recommendations: [
      'Sélectionnez votre GPU et CPU dans le configurateur pour lancer l’analyse.',
    ],
  }

  // Vérification de sécurité absolue contre les valeurs undefined
  if (!game || !config || !config?.gpu || !config?.cpu) {
    return defaultResult
  }

  const gpuScore = config.gpu.score ?? 50
  const cpuScore = config.cpu.score ?? 50
  const ramGb = parseInt(config.ram || '8', 10) || 8

  const reqMinGpu = game.minGpuScore ?? 40
  const reqRecGpu = game.recGpuScore ?? 70
  const reqMinCpu = game.minCpuScore ?? 40
  const reqRecCpu = game.recCpuScore ?? 70
  const reqMinRam = game.minRamGb ?? 8

  let verdictStatus: 'EXCELLENT' | 'GOOD' | 'PLAYABLE' | 'INCOMPATIBLE' = 'INCOMPATIBLE'
  let verdictTitle = ''
  let verdictDescription = ''
  let fpsLabel = '30 - 45 FPS'
  let resolutionPreset = '1080p Medium'

  const gpuRatio = reqRecGpu > 0 ? gpuScore / reqRecGpu : 1
  const cpuRatio = reqRecCpu > 0 ? cpuScore / reqRecCpu : 1

  if (gpuRatio >= 1.1 && cpuRatio >= 1.1) {
    verdictStatus = 'EXCELLENT'
    verdictTitle = 'Performances Optimales (60+ FPS)'
    verdictDescription = 'Votre PC dépasse largement la configuration recommandée.'
    fpsLabel = '75+ FPS'
    resolutionPreset = '1080p Ultra / 1440p High'
  } else if (gpuRatio >= 0.85 && cpuRatio >= 0.85) {
    verdictStatus = 'GOOD'
    verdictTitle = 'Excellente Fluidité (50-60 FPS)'
    verdictDescription = 'Votre PC répond très bien aux exigences du jeu en 1080p.'
    fpsLabel = '50 - 60 FPS'
    resolutionPreset = '1080p High'
  } else if (gpuScore >= reqMinGpu && cpuScore >= reqMinCpu) {
    verdictStatus = 'PLAYABLE'
    verdictTitle = 'Jouable avec ajustements'
    verdictDescription = 'Le jeu tournera correctement en ajustant la qualité graphique.'
    fpsLabel = '30 - 45 FPS'
    resolutionPreset = '1080p Low / 720p Medium'
  } else {
    verdictStatus = 'INCOMPATIBLE'
    verdictTitle = 'Configuration insuffisante'
    verdictDescription = 'Certains de vos composants sont en dessous du minimum requis.'
    fpsLabel = '< 30 FPS'
    resolutionPreset = '720p Low'
  }

  // Détection du goulot d'étranglement (Bottleneck)
  let bottleneck: 'GPU' | 'CPU' | 'RAM' | 'NONE' = 'NONE'
  if (gpuScore < reqMinGpu) bottleneck = 'GPU'
  else if (cpuScore < reqMinCpu) bottleneck = 'CPU'
  else if (ramGb < reqMinRam) bottleneck = 'RAM'
  else if (cpuRatio < gpuRatio - 0.25) bottleneck = 'CPU'
  else if (gpuRatio < cpuRatio - 0.25) bottleneck = 'GPU'

  // Recommandations dynamiques
  const recommendations: string[] = []
  if (bottleneck === 'GPU') {
    recommendations.push('Mettez à jour vos pilotes graphiques (NVIDIA / AMD).')
    recommendations.push('Activez le DLSS ou FSR dans les options du jeu.')
  } else if (bottleneck === 'CPU') {
    recommendations.push('Réduisez la densité de la foule et la distance d’affichage dans le jeu.')
  } else if (bottleneck === 'RAM') {
    recommendations.push(`Augmentez votre mémoire RAM à au moins ${reqMinRam} GB.`)
  } else {
    recommendations.push('Fermez les applications gourmandes en arrière-plan.')
  }

  return {
    fpsMin: verdictStatus === 'EXCELLENT' ? 60 : 30,
    fpsMax: verdictStatus === 'EXCELLENT' ? 120 : 60,
    fpsLabel,
    verdictStatus,
    verdictTitle,
    verdictDescription,
    resolutionPreset,
    gpuScore,
    cpuScore,
    gpuAnalysis: gpuScore >= reqRecGpu ? 'Carte graphique très performante.' : 'Carte graphique un peu juste.',
    cpuAnalysis: cpuScore >= reqRecCpu ? 'Processeur largement suffisant.' : 'Processeur pouvant occasionner des légers ralentissements.',
    ramAnalysis: `${ramGb} GB de RAM détectés.`,
    bottleneck,
    recommendations,
  }
}