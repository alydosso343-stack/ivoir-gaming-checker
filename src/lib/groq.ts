import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

export interface ParsedPC {
  cpu: string | null
  gpu: string | null
  ram: number | null
}

export async function parseUserPC(input: string): Promise<ParsedPC> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Tu es un expert hardware PC gaming. Analyse la saisie d'un utilisateur et extrait les composants au format JSON strict.
Format attendu:
{
  "cpu": "nom précis du CPU (ex: i5-6200U)",
  "gpu": "nom précis du GPU ou chipset vidéo (ex: HD 520)",
  "ram": nombre de RAM en Go (entier, ex: 8)
}
Si un composant n'est pas mentionné, mets null. Réponds uniquement par du JSON strict.`,
      },
      {
        role: 'user',
        content: input,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.1,
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0]?.message?.content ?? '{}'
  return JSON.parse(content) as ParsedPC
}