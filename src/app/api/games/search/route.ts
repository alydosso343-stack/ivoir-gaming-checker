import { NextResponse } from 'next/server'
import { CATALOG_50_GAMES } from '@/components/checker/WeeklyTop'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return NextResponse.json([])
  }

  const cleanQuery = query.toLowerCase().trim()

  // 1. Recherche dans le catalogue local (50+ jeux)
  const localMatches = CATALOG_50_GAMES.filter((g) =>
    g.name.toLowerCase().includes(cleanQuery)
  ).map((g) => ({
    id: g.id,
    name: g.name,
    header_image: g.image,
  }))

  try {
    // 2. Recherche en direct sur l'API de Steam
    const res = await fetch(
      `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=french&cc=US`
    )
    const data = await res.json()

    let steamMatches: any[] = []
    if (data && data.items) {
      steamMatches = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        header_image: `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
      }))
    }

    // 3. Fusion unique des résultats
    const combined = [...localMatches]
    for (const item of steamMatches) {
      if (!combined.some((g) => g.id === item.id)) {
        combined.push(item)
      }
    }

    return NextResponse.json(combined)
  } catch (error) {
    console.error('Erreur API Steam:', error)
    return NextResponse.json(localMatches)
  }
}