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
      <div className={`bg-gradient-to-br from-gray-900 via-gray-950 to-cyan-950/60 flex flex-col items-center justify-center p-4 text-center border border-gray-800 ${className}`}>
        <Gamepad2 className="w-8 h-8 text-cyan-400/60 mb-2 animate-pulse" />
        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider line-clamp-2">
          {alt}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  )
}