import Header from '@/components/layout/Header'
import HeroChecker from '@/components/checker/HeroChecker'
import ResultCard from '@/components/checker/ResultCard'
import WeeklyTop from '@/components/checker/WeeklyTop'
import HardwareList from '@/components/hardware/HardwareList'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500 selection:text-black">
      <Header />
      
      <div id="checker">
        <HeroChecker />
      </div>

      <ResultCard />

      <div id="trending">
        <WeeklyTop />
      </div>

      <div id="hardware">
        <HardwareList />
      </div>

      <Footer />
    </main>
  )
}
