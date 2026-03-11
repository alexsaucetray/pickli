import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '20mb' })); // Large limit for base64 images

// --- Gemini client ---
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('\n❌  GEMINI_API_KEY is not set in .env\n');
  console.error('   1. Go to https://aistudio.google.com/apikey');
  console.error('   2. Create a free API key');
  console.error('   3. Add it to .env:  GEMINI_API_KEY=your_key_here\n');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL = 'gemini-2.5-flash';

// --- Import prompts (shared with frontend build) ---
// We inline the schema & prompt here to keep the server self-contained.
// In production you could share these via a common package.

import { readFileSync } from 'fs';

// Load the prompt and schema from the frontend source so they stay in sync
let ANALYSIS_PROMPT, ANALYSIS_SCHEMA, buildChatPrompt;

// We dynamically load these from the built prompt module
// For the server, we duplicate the essentials to avoid needing a TS build step

// ---- Analysis endpoint ----
app.post('/api/analyze', async (req, res) => {
  try {
    const { images, prompt, schema } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const model = genAI.getGenerativeModel({
      model: MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const parts = [{ text: prompt }];
    for (const img of images) {
      parts.push({
        inlineData: { mimeType: img.mediaType, data: img.data },
      });
    }

    const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
    const text = result.response.text();
    const analysis = JSON.parse(text);

    res.json(analysis);
  } catch (err) {
    console.error('Analysis error:', err.message);
    let status = 500;
    let error = 'Analysis failed. Please try again.';
    if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
      status = 429;
      error = 'Rate limit reached. Please wait a moment and try again.';
    } else if (err.status === 401 || err.status === 403) {
      status = 401;
      error = 'Invalid API key. Check your GEMINI_API_KEY in .env';
    }
    res.status(status).json({
      error,
      detail: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// ---- Chat endpoint ----
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    const model = genAI.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Chat failed. Please try again.' });
  }
});

// ---- Health check ----
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: MODEL });
});

// ---- Serve static frontend in production ----
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🥒 Pickli server running on http://localhost:${PORT}`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   API key: ${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}\n`);
});
