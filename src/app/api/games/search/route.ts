import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  try {
    const res = await fetch(
      `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
        query
      )}&l=french&cc=CI`
    )
    const data = await res.json()

    const games = (data.items || []).map((item: any) => ({
      id: item.id,
      title: item.name,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      headerImage: `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
    }))

    return NextResponse.json(games)
  } catch (error) {
    console.error('Erreur API Steam:', error)
    return NextResponse.json({ error: 'Erreur recherche Steam' }, { status: 500 })
  }
}