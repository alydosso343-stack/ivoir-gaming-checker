'use client'

import { useState } from 'react'
import { Gamepad2, Menu, X, Flame, Cpu, HelpCircle, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group"
        >
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5 text-black font-black" />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-wider block leading-none">
              IVOIR<span className="text-cyan-400">GAMING</span>
            </span>
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
              Checker & Hardware CI
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/60 p-1.5 rounded-2xl border border-gray-800">
          <button
            onClick={() => scrollToSection('checker')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" /> Testeur FPS
          </button>
          <button
            onClick={() => scrollToSection('trending')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all flex items-center gap-2"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Catalogue +50 Jeux
          </button>
          <button
            onClick={() => scrollToSection('hardware')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all flex items-center gap-2"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Matériel GPU/CPU
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Volet déroulant Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950/95 border-b border-gray-800 px-4 py-4 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => scrollToSection('checker')}
            className="w-full text-left px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs font-bold text-gray-200 flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-cyan-400" /> Tester la compatibilité
          </button>
          <button
            onClick={() => scrollToSection('trending')}
            className="w-full text-left px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs font-bold text-gray-200 flex items-center gap-3"
          >
            <Flame className="w-4 h-4 text-amber-400" /> Catalogue (+50 jeux)
          </button>
          <button
            onClick={() => scrollToSection('hardware')}
            className="w-full text-left px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs font-bold text-gray-200 flex items-center gap-3"
          >
            <Cpu className="w-4 h-4 text-emerald-400" /> Liste du matériel PC
          </button>
        </div>
      )}
    </header>
  )
}