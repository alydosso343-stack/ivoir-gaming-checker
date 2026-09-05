'use client'

import { useState } from 'react'
import { Gamepad2 } from 'lucide-react'

interface GameImageProps {
  src?: string
  alt: string
  className?: string
}

export default function GameImage({ src, alt, className = '' }: GameImageProps) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-gray-900 via-cyan-950/40 to-gray-950 flex flex-col items-center justify-center p-4 text-center border border-gray-800 ${className}`}>
        <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-2">
          <Gamepad2 className="w-6 h-6 text-cyan-400" />
        </div>
        <span className="text-[11px] font-extrabold text-white uppercase tracking-wider line-clamp-2 px-2">
          {alt}
        </span>
        <span className="text-[9px] text-cyan-400 font-mono mt-1">GAMING HD</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
    />
  )
}