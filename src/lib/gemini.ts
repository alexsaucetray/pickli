import type { PickliAnalysis } from '../types';
import { ANALYSIS_PROMPT, ANALYSIS_SCHEMA, buildChatPrompt } from './prompts';
import { computeHealthScore, buildScoreFactors, getHealthLabel } from './health-score';

// In dev, Vite proxies /api to the backend. In production, same origin serves both.
const API_BASE = import.meta.env.VITE_API_URL || '';

/** Override AI-generated score with deterministic client-side computation */
export function applyDeterministicScore(analysis: PickliAnalysis): PickliAnalysis {
  const healthScore = computeHealthScore(analysis);
  const healthLabel = getHealthLabel(healthScore);
  const scoreFactors = buildScoreFactors(analysis);
  return { ...analysis, healthScore, healthLabel, scoreFactors };
}

export async function analyzeImages(
  images: { data: string; mediaType: string }[]
): Promise<PickliAnalysis> {
  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      images,
      prompt: ANALYSIS_PROMPT,
      schema: ANALYSIS_SCHEMA,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Analysis failed (${response.status})`);
  }

  const raw = (await response.json()) as PickliAnalysis;

  // Client-side score is authoritative — override whatever the AI returned
  return applyDeterministicScore(raw);
}

export async function chatAboutProduct(
  analysis: PickliAnalysis,
  history: { role: 'user' | 'ai'; text: string }[],
  userMessage: string
): Promise<string> {
  const historyText = history
    .map((m) => `${m.role === 'user' ? 'User' : 'Pickli'}: ${m.text}`)
    .join('\n');

  const prompt = buildChatPrompt(JSON.stringify(analysis), historyText, userMessage);

  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Chat request failed');
  }

  const data = await response.json();
  return data.reply;
}
