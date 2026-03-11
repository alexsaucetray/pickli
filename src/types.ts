export interface UploadedImage {
  file: File;
  preview: string;
  slot: 'front' | 'nutrition' | 'ingredients';
}

export interface Concern {
  text: string;
  evidenceLevel: 'strong' | 'moderate' | 'limited' | 'theoretical';
}

export interface RegulatoryStatus {
  fda: string;
  efsa: string;
}

/**
 * Ingredient risk tiers — see prompts.ts for full definitions.
 * safe:    No known concern at realistic doses.
 * watch:   Refined/processed; worth noting but not alarming. (-1)
 * caution: Dose-dependent concerns with moderate evidence. (-3)
 * concern: Consistent evidence of harm or active regulatory restriction. (-20)
 * avoid:   Strong multi-jurisdictional evidence, bans, or mandatory warning labels. (-25)
 */
export type IngredientRiskLevel = 'safe' | 'watch' | 'caution' | 'concern' | 'avoid';

/**
 * Why this ingredient is flagged — human-readable warning categories
 * shown directly to the user in the app UI.
 */
export type IngredientWarningType =
  | 'gmo_likely'           // Commonly derived from GMO crops; cannot confirm without certification
  | 'artificial_dye'       // Synthetic color additive with documented safety concerns
  | 'preservative_concern' // Chemical preservative with toxicity concerns at typical doses
  | 'carcinogen_classified'// Classified as possible/probable/known carcinogen by IARC, EFSA, or NTP
  | 'banned_or_restricted' // Banned or requires warning labels in at least one major jurisdiction
  | 'trans_fat'            // Artificial trans fatty acid
  | 'nitrosamine_precursor'// Forms carcinogenic nitrosamines during processing or digestion
  | 'gut_disruptor'        // May negatively affect gut microbiome or intestinal lining
  | 'endocrine_concern'    // Evidence of potential hormonal system interference
  | 'hyperactivity_link'   // Associated with hyperactivity/behavioral issues in children
  | 'highly_processed'     // Result of intensive chemical processing; low nutritional value
  | 'allergen_adjacent'    // Not a top-14 allergen but triggers reactions in a meaningful subset
  | 'controversial';       // Mixed/contested evidence — ongoing scientific debate

/** How confident Gemini is in its risk classification for this ingredient */
export type IngredientCertainty = 'confirmed' | 'likely' | 'possible';

/** Likelihood that an ingredient is sourced from GMO crops */
export type GmoRisk = 'likely' | 'possible' | 'certified_non_gmo' | 'not_applicable';

export interface IngredientEntry {
  position: number;
  rawName: string;
  commonName: string;
  primaryFunction: string;
  riskLevel: IngredientRiskLevel;
  concerns: Concern[];
  regulatoryStatus: RegulatoryStatus;
  doseContext?: string;
  isAllergen: boolean;
  isSynthetic: boolean;
  isAdditive: boolean;
  parentIngredient?: string;
  /** Warning categories explaining WHY this ingredient is flagged */
  warningTypes?: IngredientWarningType[];
  /** GMO sourcing likelihood — soft flag, does not affect score */
  gmoRisk?: GmoRisk;
  /** How confident the risk classification is given available label information */
  certainty?: IngredientCertainty;
}

export interface MacroDetail {
  name: string;
  amount: string;
  level: 'low' | 'moderate' | 'high';
  sentiment: 'positive' | 'neutral' | 'negative';
  context: string;
  contextNote: string;
}

export interface ScoreFactor {
  label: string;
  points: number;
  type: 'pro' | 'con';
}

export interface PickliAnalysis {
  productName: string;
  productCategory: string;
  healthScore: number;
  healthLabel: string;
  aiSummary: string;
  servingSize: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  macroDetails: MacroDetail[];
  pros: string[];
  cons: string[];
  ingredients: IngredientEntry[];
  scoreFactors: ScoreFactor[];
  /** Whether the product carries an organic certification */
  isOrganic: boolean;
  /** How simple the ingredient list is: minimal (1-5), moderate (6-12), complex (13+) */
  ingredientSimplicity: 'minimal' | 'moderate' | 'complex';
  /** Nutrients this product category is NOT expected to excel at — penalties are suppressed for these */
  lowNutrientExpectations: string[];
}

export interface ScanHistoryItem {
  id: string;
  analysis: PickliAnalysis;
  scannedAt: number;
}

export type AppView = 'upload' | 'scanning' | 'results' | 'history';

export interface AppState {
  view: AppView;
  images: UploadedImage[];
  analysis: PickliAnalysis | null;
  history: ScanHistoryItem[];
  loading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'ADD_IMAGE'; image: UploadedImage }
  | { type: 'REMOVE_IMAGE'; slot: UploadedImage['slot'] }
  | { type: 'START_SCAN' }
  | { type: 'SCAN_SUCCESS'; analysis: PickliAnalysis }
  | { type: 'SCAN_ERROR'; error: string }
  | { type: 'VIEW_RESULT'; analysis: PickliAnalysis }
  | { type: 'SHOW_HISTORY' }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'NEW_SCAN' }
  | { type: 'GO_BACK' };
