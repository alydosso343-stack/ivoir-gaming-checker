import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { rawInput, gameSlug } = body

    if (!rawInput || !gameSlug) {
      return NextResponse.json(
        { error: 'Données manquantes (rawInput ou gameSlug)' },
        { status: 400 }
      )
    }

    // Sécurisation des valeurs optionnelles pour éviter les erreurs TypeScript
    const cpuInput = (rawInput ?? '').toString().trim()
    const gameInput = (gameSlug ?? '').toString().trim()

    const prompt = `
    Tu es un expert en matériel informatique et jeux vidéo, spécialisé dans les configurations PC du marché ivoirien (processeurs bureautiques reconditionnés, puces Intel HD/UHD, cartes graphiques d'entrée de gamme).

    Analyse si le jeu vidéo "${gameInput}" peut tourner sur la configuration suivante : "${cpuInput}".

    Réponds EXCLUSIVEMENT au format JSON strict avec la structure suivante :
    {
      "canRun": true,
      "fpsEstimate": "30-40 FPS (720p Low)",
      "verdict": "Jouable avec concessions",
      "explanation": "Explication claire et adaptée au matériel.",
      "recommendations": ["Réduire la résolution en 720p", "Fermer les applications en arrière-plan"]
    }
    `

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.2,
      response_format: { type: 'json_object' },
    })

    const aiResponse = JSON.parse(
      completion.choices[0]?.message?.content || '{}'
    )

    return NextResponse.json(aiResponse)
  } catch (error) {
    console.error('Erreur API Check:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l’analyse de compatibilité' },
      { status: 500 }
    )
  }
}