'use client'

import Link from 'next/link'
import { Gamepad2, Zap } from 'lucide-react'
import GoogleAuthBtn from '@/components/auth/GoogleAuthBtn'

export default function Header() {
  return (
    <header className="w-full border-b border-gray-800/80 bg-black/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-xl group-hover:border-green-500/60 transition shadow-lg shadow-green-500/5">
            <Gamepad2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-wide">
              IVOIR<span className="text-green-500">GAMING</span>
            </span>
            <span className="ml-2 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-md">
              CI 🇨🇮
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-900/80 px-3 py-1.5 rounded-full border border-gray-800">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Groq IA
          </div>
          <GoogleAuthBtn />
        </div>
      </div>
    </header>
  )
}