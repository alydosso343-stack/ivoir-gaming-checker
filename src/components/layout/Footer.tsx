'use client'

import { Heart, Gamepad2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950/80 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-3">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-cyan-400" />
          <span className="font-extrabold text-white text-sm tracking-wider">
            IVOIR<span className="text-cyan-400">GAMING</span> CHECKER
          </span>
        </div>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          Fait avec <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> pour les gamers de Côte d'Ivoire 🇨🇮
        </p>
        <p className="text-[10px] text-gray-600 font-mono">
          © 2026 IVOIRGAMING CI - Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
