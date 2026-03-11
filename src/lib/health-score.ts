import type { PickliAnalysis } from '../types';

function parseNum(val: string | undefined): number {
  if (!val) return 0;
  const n = parseFloat(val.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

/** Check if a nutrient penalty should be suppressed based on category expectations */
function shouldSuppressPenalty(keyword: string, expectations: string[]): boolean {
  return expectations.some((e) => e.toLowerCase().includes(keyword.toLowerCase()));
}

/**
 * Deterministic health score: base 50, +/- factors.
 * Now category-aware: won't penalize almond milk for low protein, etc.
 * Rewards organic certification and minimal ingredient lists.
 */
export function computeHealthScore(analysis: PickliAnalysis): number {
  let score = 50;
  const expectations = analysis.lowNutrientExpectations ?? [];

  const protein = parseNum(analysis.protein);
  const calories = parseNum(analysis.calories);

  const findMacro = (keyword: string) =>
    analysis.macroDetails.find((m) => m.name.toLowerCase().includes(keyword));

  const addedSugarG = parseNum(findMacro('added sugar')?.amount);
  const sodiumMg = parseNum(findMacro('sodium')?.amount);
  const satFatG = parseNum(findMacro('saturated')?.amount);
  const fiberG = parseNum(findMacro('fiber')?.amount);

  // === POSITIVE FACTORS ===
  if (protein >= 10) score += 8;                         // Good protein source
  if (fiberG >= 5) score += 8;                           // High fiber
  if (sodiumMg > 0 && sodiumMg <= 140) score += 5;      // Low sodium
  if (addedSugarG === 0) score += 10;                    // No added sugar

  // Organic bonus
  if (analysis.isOrganic) score += 6;

  // Ingredient simplicity bonus
  if (analysis.ingredientSimplicity === 'minimal') score += 8;
  else if (analysis.ingredientSimplicity === 'moderate') score += 0;
  else if (analysis.ingredientSimplicity === 'complex') score -= 2;

  // === NEGATIVE FACTORS (category-aware) ===
  if (satFatG >= 4 && !shouldSuppressPenalty('saturated fat', expectations)) score -= 8;
  if (addedSugarG >= 10) score -= 10;                    // Always penalize high added sugar
  if (addedSugarG >= 5 && addedSugarG < 10) score -= 5;
  if (sodiumMg >= 460 && !shouldSuppressPenalty('sodium', expectations)) score -= 8;
  if (calories >= 300 && !shouldSuppressPenalty('calories', expectations)) score -= 5;
  if (fiberG < 2 && !shouldSuppressPenalty('fiber', expectations)) score -= 4;

  // Note: low protein is NOT penalized universally anymore — it was never a positive-only factor.
  // Products that DO have high protein get a bonus; products that don't simply don't get that bonus.
  // No penalty for lacking protein (the old implicit penalty was unfair to beverages, condiments, etc.)

  // === INGREDIENT RISK PENALTIES (harsh for high-risk) ===
  for (const ing of analysis.ingredients) {
    if (ing.riskLevel === 'high') score -= 10;
    else if (ing.riskLevel === 'elevated') score -= 4;
    else if (ing.riskLevel === 'moderate') score -= 2;
  }

  return Math.max(0, Math.min(100, score));
}

/** Build the scoreFactors breakdown array from an analysis. */
export function buildScoreFactors(analysis: PickliAnalysis): { label: string; points: number; type: 'pro' | 'con' }[] {
  const factors: { label: string; points: number; type: 'pro' | 'con' }[] = [];
  const expectations = analysis.lowNutrientExpectations ?? [];

  const protein = parseNum(analysis.protein);
  const calories = parseNum(analysis.calories);
  const findMacro = (keyword: string) =>
    analysis.macroDetails.find((m) => m.name.toLowerCase().includes(keyword));

  const addedSugarG = parseNum(findMacro('added sugar')?.amount);
  const sodiumMg = parseNum(findMacro('sodium')?.amount);
  const satFatG = parseNum(findMacro('saturated')?.amount);
  const fiberG = parseNum(findMacro('fiber')?.amount);

  // Positive factors
  if (protein >= 10) factors.push({ label: `High protein (${analysis.protein})`, points: 8, type: 'pro' });
  if (fiberG >= 5) factors.push({ label: `High fiber (${fiberG}g)`, points: 8, type: 'pro' });
  if (sodiumMg > 0 && sodiumMg <= 140) factors.push({ label: `Low sodium (${sodiumMg}mg)`, points: 5, type: 'pro' });
  if (addedSugarG === 0) factors.push({ label: 'Zero added sugar', points: 10, type: 'pro' });

  if (analysis.isOrganic) factors.push({ label: 'Certified organic', points: 6, type: 'pro' });

  if (analysis.ingredientSimplicity === 'minimal') {
    factors.push({ label: `Minimal ingredients (${analysis.ingredients.length})`, points: 8, type: 'pro' });
  } else if (analysis.ingredientSimplicity === 'complex') {
    factors.push({ label: `Complex ingredient list (${analysis.ingredients.length})`, points: -2, type: 'con' });
  }

  // Negative factors (category-aware)
  if (satFatG >= 4 && !shouldSuppressPenalty('saturated fat', expectations)) {
    factors.push({ label: `High saturated fat (${satFatG}g)`, points: -8, type: 'con' });
  }
  if (addedSugarG >= 10) {
    factors.push({ label: `High added sugar (${addedSugarG}g)`, points: -10, type: 'con' });
  } else if (addedSugarG >= 5) {
    factors.push({ label: `Moderate added sugar (${addedSugarG}g)`, points: -5, type: 'con' });
  }
  if (sodiumMg >= 460 && !shouldSuppressPenalty('sodium', expectations)) {
    factors.push({ label: `High sodium (${sodiumMg}mg)`, points: -8, type: 'con' });
  }
  if (calories >= 300 && !shouldSuppressPenalty('calories', expectations)) {
    factors.push({ label: `High calories (${analysis.calories})`, points: -5, type: 'con' });
  }
  if (fiberG < 2 && !shouldSuppressPenalty('fiber', expectations)) {
    factors.push({ label: 'Low fiber (<2g)', points: -4, type: 'con' });
  }

  for (const ing of analysis.ingredients) {
    if (ing.riskLevel === 'high') {
      factors.push({ label: `High-risk: ${ing.commonName}`, points: -10, type: 'con' });
    } else if (ing.riskLevel === 'elevated') {
      factors.push({ label: `Elevated-risk: ${ing.commonName}`, points: -4, type: 'con' });
    } else if (ing.riskLevel === 'moderate') {
      factors.push({ label: `Moderate-risk: ${ing.commonName}`, points: -2, type: 'con' });
    }
  }

  return factors;
}

export function getHealthLabel(score: number): string {
  if (score >= 91) return 'Excellent';
  if (score >= 76) return 'Very Good';
  if (score >= 61) return 'Good';
  if (score >= 46) return 'Fair';
  if (score >= 26) return 'Below Average';
  return 'Poor';
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  stroke: string;
  accent: string;
} {
  if (score >= 76) return { text: 'text-mint-600', bg: 'bg-mint-100', stroke: '#2d8a5e', accent: 'mint' };
  if (score >= 61) return { text: 'text-pickle-500', bg: 'bg-pickle-100', stroke: '#4A7C1A', accent: 'pickle' };
  if (score >= 46) return { text: 'text-warn-600', bg: 'bg-warn-100', stroke: '#D4A020', accent: 'warn' };
  if (score >= 26) return { text: 'text-coral-600', bg: 'bg-coral-100', stroke: '#E85D4A', accent: 'coral' };
  return { text: 'text-coral-600', bg: 'bg-coral-200', stroke: '#c44a35', accent: 'coral' };
}
