import HeroChecker from '@/components/checker/HeroChecker'
import ResultCard from '@/components/checker/ResultCard'
import SteamCatalog from '@/components/checker/SteamCatalog'
import AboutVision from '@/components/sections/AboutVision'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white space-y-8 pb-16">
      <HeroChecker />
      <ResultCard />
      <SteamCatalog />
      <AboutVision />
    </main>
  )
}