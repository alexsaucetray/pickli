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
 * Returns the calorie threshold above which a penalty applies for a given product category.
 * Returns null if no calorie penalty should apply for this product type.
 */
function getCaloriePenaltyThreshold(productCategory: string): number | null {
  const cat = productCategory.toLowerCase();

  const matches = (...keywords: string[]) => keywords.some((kw) => cat.includes(kw));

  // === NO PENALTY — inherently high-calorie or used in trace amounts ===
  if (matches('sparkling water', 'mineral water', 'seltzer', 'club soda')) return null;
  if (matches('plain water') || cat === 'water') return null;
  if (matches('diet ', 'zero calorie', 'zero sugar beverage', 'unsweetened tea', 'black coffee')) return null;
  if (matches('supplement', 'protein powder', 'vitamin', 'pre-workout', 'creatine', 'amino acid')) return null;
  if (matches('cheese', 'parmesan', 'cheddar', 'mozzarella', 'brie', 'gouda')) return null;
  if (matches('nut butter', 'almond butter', 'peanut butter', 'cashew butter', 'sunflower butter', 'tahini', 'seed butter')) return null;
  if (matches('nuts', 'almonds', 'cashews', 'walnuts', 'pecans', 'pistachios', 'macadamia', 'peanuts', 'seeds')) return null;
  if (matches('olive oil', 'coconut oil', 'avocado oil', 'vegetable oil', 'canola oil', 'cooking oil', 'ghee', 'lard', 'shortening')) return null;
  // butter: be careful not to match "nut butter" above already handled; raw butter is no-penalty
  if (cat === 'butter' || cat === 'dairy butter' || matches('grass-fed butter')) return null;
  if (matches('egg', 'egg white', 'liquid egg')) return null;
  if (matches('dry pasta', 'dry rice', 'dry grain', 'raw grain', 'flour', 'dry lentil', 'dry bean')) return null;

  // === BEVERAGES — low threshold ===
  if (matches('juice', 'lemonade', 'fruit punch', 'fruit drink', 'sports drink', 'electrolyte drink', 'energy drink', 'soda', 'cola', 'soft drink', 'carbonated drink')) return 150;
  if (matches('plant milk', 'almond milk', 'oat milk', 'soy milk', 'coconut milk beverage', 'hemp milk', 'rice milk', 'cashew milk', 'pea milk')) return 150;
  if (matches('dairy milk', 'whole milk', '2% milk', 'skim milk', 'low-fat milk', 'chocolate milk', 'flavored milk')) return 200;
  if (matches('milk') && !matches('nut butter', 'almond butter')) return 200; // catch-all for milk
  if (matches('rtd coffee', 'ready-to-drink coffee', 'iced coffee', 'frappuccino', 'coffee drink', 'latte bottle', 'cold brew bottle')) return 250;
  if (matches('smoothie', 'meal replacement shake', 'meal shake', 'protein shake', 'nutritional shake', 'slim-fast', 'ensure', 'boost')) return 250;
  if (matches('kombucha', 'kefir drink')) return 150;

  // === DAIRY ===
  if (matches('yogurt', 'greek yogurt', 'skyr', 'dairy kefir')) return 200;
  if (matches('ice cream', 'gelato', 'sorbet', 'frozen yogurt', 'frozen dessert', 'popsicle', 'ice pop', 'sherbet')) return 300;

  // === CONDIMENTS — very low threshold ===
  if (matches('ketchup', 'mustard', 'hot sauce', 'sriracha', 'tabasco', 'soy sauce', 'tamari', 'vinegar', 'relish', 'salsa', 'pico de gallo', 'pickle', 'giardiniera', 'condiment')) return 100;
  if (matches('salad dressing', 'vinaigrette', 'ranch', 'caesar dressing', 'italian dressing', 'balsamic', 'dressing')) return 150;
  if (matches('pasta sauce', 'marinara', 'tomato sauce', 'alfredo', 'pesto', 'enchilada sauce', 'stir fry sauce', 'teriyaki', 'marinade', 'glaze', 'bbq sauce', 'wing sauce')) return 150;
  if (matches('hummus', 'guacamole', 'dip', 'cream cheese', 'tzatziki', 'queso', 'french onion dip', 'spinach dip', 'artichoke dip', 'spread')) return 150;

  // === SNACKS ===
  if (matches('chips', 'crisps', 'crackers', 'popcorn', 'pretzels', 'puffs', 'rice cake', 'corn nuts', 'cheese puff')) return 200;
  if (matches('candy', 'gummy', 'hard candy', 'lollipop', 'gum', 'sweets', 'licorice')) return 250;
  if (matches('chocolate bar', 'dark chocolate', 'milk chocolate', 'white chocolate', 'chocolate')) return 250;
  if (matches('cookie', 'biscuit', 'brownie', 'muffin', 'pastry', 'croissant', 'danish', 'cinnamon roll', 'baked good', 'donut', 'cake slice')) return 300;
  if (matches('granola bar', 'cereal bar', 'energy bar', 'snack bar', 'fruit bar', 'fig bar')) return 300;
  if (matches('dried fruit', 'fruit snack', 'fruit leather', 'veggie chip', 'veggie straw', 'kale chip', 'beet chip')) return 200;

  // === BREAKFAST ===
  if (matches('cereal', 'granola', 'oatmeal', 'instant oat', 'porridge', 'muesli')) return 200;
  if (matches('bread', 'whole wheat bread', 'sourdough', 'toast', 'wrap', 'flour tortilla', 'corn tortilla', 'pita', 'bagel', 'english muffin', 'roll', 'bun')) return 200;
  if (matches('breakfast bar', 'breakfast biscuit', 'pop-tart', 'toaster pastry')) return 300;

  // === MEALS / ENTREES ===
  if (matches('frozen meal', 'frozen dinner', 'frozen entree', 'tv dinner', 'microwave meal', 'ready meal', 'ready-to-eat', 'hot pocket')) return 550;
  if (matches('burrito', 'wrap meal', 'bowl', 'grain bowl', 'noodle bowl', 'rice bowl')) return 500;
  if (matches('pizza', 'frozen pizza')) return 500;
  if (matches('soup', 'stew', 'chili', 'broth', 'bone broth', 'ramen', 'noodle soup', 'canned meal')) return 300;
  if (matches('mac and cheese', 'macaroni', 'boxed dinner')) return 400;

  // === PROTEINS ===
  if (matches('protein bar')) return 350;
  if (matches('jerky', 'meat stick', 'meat snack', 'biltong')) return 200;
  if (matches('canned tuna', 'canned salmon', 'canned sardine', 'canned fish')) return 200;
  if (matches('deli meat', 'lunchmeat', 'cold cut', 'sliced turkey', 'sliced ham', 'pepperoni', 'salami', 'sausage', 'hot dog', 'bratwurst')) return 250;
  if (matches('plant-based meat', 'plant based protein', 'veggie burger', 'veggie patty', 'meatless', 'impossible', 'beyond')) return 300;
  if (matches('tofu', 'tempeh', 'seitan', 'edamame')) return 200;

  // === DEFAULT for unclassified products ===
  return 300;
}

/**
 * Deterministic health score: base 60, +/- factors.
 * Category-aware: calorie penalty adapts to product type.
 * Tiered protein and fiber bonuses. Revised ingredient risk penalties.
 */
export function computeHealthScore(analysis: PickliAnalysis): number {
  let score = 60;
  const expectations = analysis.lowNutrientExpectations ?? [];

  const protein = parseNum(analysis.protein);
  const calories = parseNum(analysis.calories);

  const findMacro = (keyword: string) =>
    analysis.macroDetails.find((m) => m.name.toLowerCase().includes(keyword));

  const addedSugarG = parseNum(findMacro('added sugar')?.amount);
  const sodiumMg    = parseNum(findMacro('sodium')?.amount);
  const satFatG     = parseNum(findMacro('saturated')?.amount);
  const fiberG      = parseNum(findMacro('fiber')?.amount);

  // === POSITIVE FACTORS ===

  // Protein (tiered)
  if (protein >= 10) score += 10;
  else if (protein >= 5) score += 5;

  // Fiber (tiered)
  if (fiberG >= 6) score += 10;
  else if (fiberG >= 3) score += 5;

  // Added sugar
  if (addedSugarG === 0) score += 10;

  // Organic certification
  if (analysis.isOrganic) score += 10;

  // Ingredient simplicity
  if (analysis.ingredientSimplicity === 'minimal') score += 5;

  // === NEGATIVE FACTORS ===

  // Saturated fat (category-aware)
  if (satFatG >= 4 && !shouldSuppressPenalty('saturated fat', expectations)) score -= 8;

  // Added sugar (always penalized — never suppressed)
  if (addedSugarG >= 10) score -= 10;
  else if (addedSugarG >= 5) score -= 5;

  // Sodium (tiered, category-aware)
  if (!shouldSuppressPenalty('sodium', expectations)) {
    if (sodiumMg > 650) score -= 10;
    else if (sodiumMg > 460) score -= 5;
  }

  // Calories (product-type specific threshold)
  const calThreshold = getCaloriePenaltyThreshold(analysis.productCategory ?? '');
  if (calThreshold !== null && calories >= calThreshold) score -= 5;

  // === INGREDIENT RISK PENALTIES ===
  for (const ing of analysis.ingredients) {
    if (ing.riskLevel === 'high') score -= 20;
    else if (ing.riskLevel === 'elevated') score -= 10;
    else if (ing.riskLevel === 'moderate') score -= 3;
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
  const sodiumMg    = parseNum(findMacro('sodium')?.amount);
  const satFatG     = parseNum(findMacro('saturated')?.amount);
  const fiberG      = parseNum(findMacro('fiber')?.amount);

  // Positive factors
  if (protein >= 10) factors.push({ label: `High protein (${analysis.protein})`, points: 10, type: 'pro' });
  else if (protein >= 5) factors.push({ label: `Good protein (${analysis.protein})`, points: 5, type: 'pro' });

  if (fiberG >= 6) factors.push({ label: `High fiber (${fiberG}g)`, points: 10, type: 'pro' });
  else if (fiberG >= 3) factors.push({ label: `Good fiber (${fiberG}g)`, points: 5, type: 'pro' });

  if (addedSugarG === 0) factors.push({ label: 'Zero added sugar', points: 10, type: 'pro' });
  if (analysis.isOrganic) factors.push({ label: 'Certified organic', points: 10, type: 'pro' });
  if (analysis.ingredientSimplicity === 'minimal') {
    factors.push({ label: `Minimal ingredients (${analysis.ingredients.length})`, points: 5, type: 'pro' });
  }

  // Negative factors
  if (satFatG >= 4 && !shouldSuppressPenalty('saturated fat', expectations)) {
    factors.push({ label: `High saturated fat (${satFatG}g)`, points: -8, type: 'con' });
  }
  if (addedSugarG >= 10) {
    factors.push({ label: `High added sugar (${addedSugarG}g)`, points: -10, type: 'con' });
  } else if (addedSugarG >= 5) {
    factors.push({ label: `Moderate added sugar (${addedSugarG}g)`, points: -5, type: 'con' });
  }

  if (!shouldSuppressPenalty('sodium', expectations)) {
    if (sodiumMg > 650) factors.push({ label: `Very high sodium (${sodiumMg}mg)`, points: -10, type: 'con' });
    else if (sodiumMg > 460) factors.push({ label: `High sodium (${sodiumMg}mg)`, points: -5, type: 'con' });
  }

  const calThreshold = getCaloriePenaltyThreshold(analysis.productCategory ?? '');
  if (calThreshold !== null && calories >= calThreshold) {
    factors.push({ label: `High calories for category (${analysis.calories})`, points: -5, type: 'con' });
  }

  for (const ing of analysis.ingredients) {
    if (ing.riskLevel === 'high') {
      factors.push({ label: `Very high-risk ingredient: ${ing.commonName}`, points: -20, type: 'con' });
    } else if (ing.riskLevel === 'elevated') {
      factors.push({ label: `Elevated-risk ingredient: ${ing.commonName}`, points: -10, type: 'con' });
    } else if (ing.riskLevel === 'moderate') {
      factors.push({ label: `Moderate-risk ingredient: ${ing.commonName}`, points: -3, type: 'con' });
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
