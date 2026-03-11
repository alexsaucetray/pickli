import { useState } from 'react';
import { Camera, Sparkles, AlertOctagon } from 'lucide-react';
import type { PickliAnalysis } from '../types';
import PickleMascot from './PickleMascot';
import ScoreGauge from './ScoreGauge';
import ScoreBreakdown from './ScoreBreakdown';
import ProConGrid from './ProConGrid';
import NutritionPanel from './NutritionPanel';
import IngredientsPanel from './IngredientsPanel';
import ChatPanel from './ChatPanel';

type Tab = 'overview' | 'nutrition' | 'ingredients' | 'chat';

function getMood(score: number) {
  if (score >= 76) return 'happy' as const;
  if (score >= 46) return 'neutral' as const;
  if (score >= 26) return 'worried' as const;
  return 'sad' as const;
}

interface Props {
  analysis: PickliAnalysis;
  onNewScan: () => void;
}

export default function ResultsDashboard({ analysis, onNewScan }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const mood = getMood(analysis.healthScore);

  const highRiskIngredients = analysis.ingredients
    .filter((i) => i.riskLevel === 'high')
    .map((i) => i.commonName);

  const TABS: { id: Tab; label: string; special?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'chat', label: 'AI', special: true },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in-up pb-20">
      {/* Score Hero */}
      <div className="px-5 pt-5 pb-3">
        <div className="bg-white rounded-3xl p-5 border border-cream-200 shadow-sm bg-pickle-texture relative overflow-hidden">
          {/* Product info */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-bold text-pickle-500 uppercase tracking-[0.15em] bg-pickle-50 px-2.5 py-1 rounded-full">
              {analysis.productCategory}
            </span>
          </div>
          <h2 className="font-display text-lg font-bold text-pickle-900 mb-4">
            {analysis.productName}
          </h2>

          {/* Score + Mascot row */}
          <div className="flex items-center justify-between">
            <ScoreGauge score={analysis.healthScore} label={analysis.healthLabel} size={150} />
            <div className="animate-pop">
              <PickleMascot mood={mood} size={90} />
            </div>
          </div>

          {/* Macro strip */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-cream-200">
            {[
              { label: 'Cal', value: analysis.calories },
              { label: 'Protein', value: analysis.protein },
              { label: 'Carbs', value: analysis.carbs },
              { label: 'Fat', value: analysis.fat },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-display text-lg font-semibold text-pickle-800">{m.value}</p>
                <p className="text-[9px] font-bold text-cream-400 uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-cream-400 mt-3 text-center">
            Per {analysis.servingSize}
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="px-5 py-2 sticky top-0 z-20 bg-cream-50/90 backdrop-blur-xl border-b border-cream-200/50">
        <div className="flex p-1 bg-cream-200/50 rounded-xl gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[11px] font-bold rounded-lg transition-all duration-200 whitespace-nowrap
                ${tab === t.id
                  ? t.special
                    ? 'bg-pickle-400 text-white shadow-sm'
                    : 'bg-white text-pickle-800 shadow-sm'
                  : t.special
                    ? 'bg-pickle-50 text-pickle-500'
                    : 'text-pickle-500'
                }`}
            >
              {t.special && <Sparkles className="w-3.5 h-3.5" />}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-5 pt-4 flex-1">
        {tab === 'overview' && (
          <div className="space-y-5 animate-fade-in">
            {/* AI Summary */}
            <div className="bg-white border border-cream-200 rounded-2xl p-4">
              <p className="text-sm font-medium text-pickle-700 leading-relaxed">
                {analysis.aiSummary}
              </p>
            </div>

            {/* High risk alert */}
            {highRiskIngredients.length > 0 && (
              <div className="bg-coral-50 border border-coral-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertOctagon className="w-5 h-5 text-coral-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-coral-600 uppercase tracking-widest mb-1">
                    High-Risk Ingredients
                  </p>
                  <p className="text-sm font-medium text-pickle-700">
                    Contains{' '}
                    <span className="font-bold text-coral-600">{highRiskIngredients.join(', ')}</span>
                    . Tap the Ingredients tab for evidence details.
                  </p>
                </div>
              </div>
            )}

            {/* Score breakdown */}
            <ScoreBreakdown factors={analysis.scoreFactors} />

            {/* Pro/Con */}
            <ProConGrid pros={analysis.pros} cons={analysis.cons} />
          </div>
        )}

        {tab === 'nutrition' && (
          <NutritionPanel macros={analysis.macroDetails} productCategory={analysis.productCategory} />
        )}

        {tab === 'ingredients' && (
          <IngredientsPanel ingredients={analysis.ingredients} />
        )}

        {tab === 'chat' && <ChatPanel analysis={analysis} />}
      </div>

      {/* FAB */}
      <div className="absolute bottom-6 right-5 z-20">
        <button
          onClick={onNewScan}
          className="bg-pickle-400 text-white p-4 rounded-full shadow-lg hover:bg-pickle-500 active:scale-95 transition-all"
          aria-label="New scan"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
