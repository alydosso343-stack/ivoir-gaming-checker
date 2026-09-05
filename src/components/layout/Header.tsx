'use client'

import Link from 'next/link'
import { Gamepad2, Sparkles, User } from 'lucide-react'
import GoogleAuthBtn from '../auth/GoogleAuthBtn'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <Gamepad2 className="w-6 h-6 text-black font-extrabold" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-wider text-white flex items-center gap-1.5">
              IVOIR<span className="text-cyan-400">GAMING</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-gray-400 -mt-1">
              Checker 🇨🇮
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-400">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Benchmark IA
          </Link>

          <a href="#trending" className="hover:text-white transition-colors">
            Top Jeux CI
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            Vision
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <GoogleAuthBtn />
        </div>
      </div>
    </header>
  )
}