import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du peuplement de la BDD...')

  // 1. Jeu : GTA V
  const gtav = await prisma.game.upsert({
    where: { slug: 'gta-v' },
    update: {},
    create: {
      title: 'GTA V',
      slug: 'gta-v',
      coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nt4.jpg',
      minCpu: 'Intel Core 2 Quad Q6600',
      minGpu: 'NVIDIA 9800 GT',
      minRam: 4,
    },
  })

  // 2. Jeu : eFootball 2024
  const efootball = await prisma.game.upsert({
    where: { slug: 'efootball-2024' },
    update: {},
    create: {
      title: 'EFootball 2024',
      slug: 'efootball-2024',
      coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6qzk.jpg',
      minCpu: 'Intel Core i5-2300',
      minGpu: 'NVIDIA GTX 660',
      minRam: 8,
    },
  })

  // 3. Benchmarks réels pour configs courantes (HP Folio, EliteBook, etc.)
  await prisma.benchmark.createMany({
    data: [
      // GTA V Benchmarks
      {
        gameId: gtav.id,
        gpu: 'HD 520',
        cpu: 'i5-6200U',
        ram: 8,
        fpsAvg: 32,
        setting: '720p Low / Ombres OFF',
        youtubeUrl: 'https://www.youtube.com/watch?v=example1',
        notes: 'Désactiver les ombres et mettre la résolution en 1280x720 pour maintenir 30+ FPS stables.',
      },
      {
        gameId: gtav.id,
        gpu: 'UHD 620',
        cpu: 'i5-8250U',
        ram: 8,
        fpsAvg: 40,
        setting: '720p Normal',
        youtubeUrl: 'https://www.youtube.com/watch?v=example2',
        notes: 'Jeu très fluide en 720p. Jouer sur secteur recommandé.',
      },
      {
        gameId: gtav.id,
        gpu: 'GTX 1050',
        cpu: 'i5-7300HQ',
        ram: 8,
        fpsAvg: 60,
        setting: '1080p High',
        notes: 'Excellente expérience en Full HD 60 FPS.',
      },
      // eFootball Benchmarks
      {
        gameId: efootball.id,
        gpu: 'HD 520',
        cpu: 'i5-6200U',
        ram: 8,
        fpsAvg: 24,
        setting: '720p Low (Rendu 50%)',
        notes: 'Légers ralentissements lors des penaltys. Baisser l échelle de rendu à 50%.',
      },
      {
        gameId: efootball.id,
        gpu: 'UHD 620',
        cpu: 'i5-8250U',
        ram: 8,
        fpsAvg: 30,
        setting: '720p Low',
        notes: 'Jouable à 30 FPS. Fermer Chrome et les applications en arrière-plan.',
      },
    ],
  })

  console.log('✅ Base de données peuplée avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })