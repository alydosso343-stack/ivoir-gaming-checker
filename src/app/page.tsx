import HeroChecker from '@/components/checker/HeroChecker'
import ResultCard from '@/components/checker/ResultCard'
import WeeklyTop from '@/components/checker/WeeklyTop'
import AboutVision from '@/components/sections/AboutVision'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white py-8 space-y-12">
      <HeroChecker />
      <ResultCard />
      <WeeklyTop />
      <AboutVision />
    </main>
  )
}