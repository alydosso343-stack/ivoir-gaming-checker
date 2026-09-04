'use client'

import { Gamepad2, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black py-8 text-gray-400 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-green-500" />
          <span className="font-bold text-white tracking-wide">
            IVOIR GAMING CHECKER
          </span>
        </div>

        <p className="flex items-center gap-1 text-xs text-gray-500">
          Fait avec <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> pour les gamers de Côte d&apos;Ivoire 🇨🇮
        </p>

        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} - Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}