import { NextResponse } from 'next/server'
import { CATALOG_50_GAMES } from '@/data/games'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return NextResponse.json([])
  }

  const cleanQuery = query.replace(/[^\w\s\-\:]/gi, '').toLowerCase().trim()

  if (!cleanQuery) {
    return NextResponse.json([])
  }

  const localMatches = CATALOG_50_GAMES.filter((g) =>
    g.name.toLowerCase().includes(cleanQuery)
  ).map((g) => ({
    id: g.id,
    name: g.name,
    header_image: g.image,
  }))

  try {
    const res = await fetch(
      `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(cleanQuery)}&l=french&cc=US`,
      {
        headers: {
          'User-Agent': 'IvoirGamingChecker/1.0',
        },
      }
    )

    if (!res.ok) {
      return NextResponse.json(localMatches)
    }

    const data = await res.json()

    let steamMatches: any[] = []
    if (data && Array.isArray(data.items)) {
      steamMatches = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        header_image: `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
      }))
    }

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
