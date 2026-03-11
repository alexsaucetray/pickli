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

export interface IngredientEntry {
  position: number;
  rawName: string;
  commonName: string;
  primaryFunction: string;
  riskLevel: 'low' | 'moderate' | 'elevated' | 'high';
  concerns: Concern[];
  regulatoryStatus: RegulatoryStatus;
  doseContext?: string;
  isAllergen: boolean;
  isSynthetic: boolean;
  isAdditive: boolean;
  parentIngredient?: string;
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
