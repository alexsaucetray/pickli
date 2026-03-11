import type { Connect } from 'vite'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-2.5-flash'

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

export function createGeminiMiddleware(app: Connect.Server) {
  if (!API_KEY) {
    console.error('\n❌  GEMINI_API_KEY is not set in .env')
    console.error('   Go to https://aistudio.google.com/apikey to get a free key\n')
    return
  }

  const genAI = new GoogleGenerativeAI(API_KEY)
  console.log(`\n🥒 Gemini API middleware active (model: ${MODEL})\n`)

  // --- /api/health ---
  app.use((req, res, next) => {
    if (req.url !== '/api/health' || req.method !== 'GET') return next()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'ok', model: MODEL }))
  })

  // --- /api/analyze ---
  app.use(async (req, res, next) => {
    if (req.url !== '/api/analyze' || req.method !== 'POST') return next()
    res.setHeader('Content-Type', 'application/json')

    try {
      const raw = await readBody(req)
      const { images, prompt, schema } = JSON.parse(raw)

      if (!images || !Array.isArray(images) || images.length === 0) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'No images provided' }))
        return
      }

      const model = genAI.getGenerativeModel({
        model: MODEL,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      })

      const parts: any[] = [{ text: prompt }]
      for (const img of images) {
        parts.push({
          inlineData: { mimeType: img.mediaType, data: img.data },
        })
      }

      const result = await model.generateContent({ contents: [{ role: 'user', parts }] })
      const text = result.response.text()
      const analysis = JSON.parse(text)

      res.end(JSON.stringify(analysis))
    } catch (err: any) {
      console.error('Analysis error:', err.message)
      let status = 500
      let error = 'Analysis failed. Please try again.'
      if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
        status = 429
        error = 'Rate limit reached. Please wait a moment and try again.'
      } else if (err.status === 401 || err.status === 403) {
        status = 401
        error = 'Invalid API key. Check your GEMINI_API_KEY in .env'
      }
      res.statusCode = status
      res.end(JSON.stringify({ error }))
    }
  })

  // --- /api/chat ---
  app.use(async (req, res, next) => {
    if (req.url !== '/api/chat' || req.method !== 'POST') return next()
    res.setHeader('Content-Type', 'application/json')

    try {
      const raw = await readBody(req)
      const { prompt } = JSON.parse(raw)

      if (!prompt) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'No prompt provided' }))
        return
      }

      const model = genAI.getGenerativeModel({ model: MODEL })
      const result = await model.generateContent(prompt)
      const text = result.response.text()

      res.end(JSON.stringify({ reply: text }))
    } catch (err: any) {
      console.error('Chat error:', err.message)
      res.statusCode = 500
      res.end(JSON.stringify({ error: 'Chat failed. Please try again.' }))
    }
  })
}
