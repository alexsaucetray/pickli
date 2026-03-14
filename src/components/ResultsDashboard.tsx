import { useState } from "react";
import { Camera, Sparkles, AlertOctagon } from "lucide-react";
import type { PickliAnalysis } from "../types";
import PickleMascot from "./PickleMascot";
import ScoreGauge from "./ScoreGauge";
import ScoreBreakdown from "./ScoreBreakdown";
import ProConGrid from "./ProConGrid";
import NutritionPanel from "./NutritionPanel";
import IngredientsPanel from "./IngredientsPanel";
import ChatPanel from "./ChatPanel";

type Tab = "overview" | "nutrition" | "ingredients" | "chat";

function getMood(score: number) {
  if (score >= 76) return "happy" as const;
  if (score >= 46) return "neutral" as const;
  if (score >= 26) return "worried" as const;
  return "sad" as const;
}

interface Props {
  analysis: PickliAnalysis;
  onNewScan: () => void;
}

export default function ResultsDashboard({ analysis, onNewScan }: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const mood = getMood(analysis.healthScore);
  const verdictText =
    analysis.healthScore >= 76
      ? "A strong everyday pick."
      : analysis.healthScore >= 46
        ? "A mixed bag with some tradeoffs."
        : analysis.healthScore >= 26
          ? "Worth a closer look before buying."
          : "This one has meaningful concerns.";

  const highRiskIngredients = analysis.ingredients
    .filter((i) => i.riskLevel === "avoid" || i.riskLevel === "concern")
    .map((i) => i.commonName);

  const TABS: { id: Tab; label: string; special?: boolean }[] = [
    { id: "overview", label: "Overview" },
    { id: "nutrition", label: "Nutrition" },
    { id: "ingredients", label: "Ingredients" },
    { id: "chat", label: "AI", special: true },
  ];

  return (
    <div className="flex h-full flex-col animate-fade-in-up pb-[5.5rem]">
      <div className="px-5 pt-4 pb-2">
        <div className="pickle-card bg-pickle-texture rounded-[28px] p-4">
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="pickle-chip">Pickli Verdict</span>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/85 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-pickle-600 shadow-sm">
                    {analysis.productCategory}
                  </span>
                  <span className="rounded-full bg-brine-50/95 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-pickle-600 shadow-sm">
                    Per {analysis.servingSize}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-[1.55rem] font-semibold leading-[0.98] tracking-[-0.05em] text-pickle-900">
                  {analysis.productName}
                </h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-pickle-600">
                  {verdictText}
                </p>
              </div>

              <div className="relative shrink-0">
                <div className="absolute inset-2 rounded-full bg-brine-100/80 blur-xl" />
                <div className="absolute -right-3 -bottom-2 z-10 rounded-full bg-white/78 p-1 shadow-[0_10px_20px_rgba(61,104,22,0.12)]">
                  <PickleMascot
                    mood={mood}
                    size={54}
                    className="animate-bob-slow"
                  />
                </div>
                <div className="rounded-[26px] bg-white/82 p-2.5 shadow-[0_14px_28px_rgba(61,104,22,0.1)]">
                  <ScoreGauge
                    score={analysis.healthScore}
                    label={analysis.healthLabel}
                    size={126}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { label: "Calories", value: analysis.calories },
                { label: "Protein", value: analysis.protein },
                { label: "Carbs", value: analysis.carbs },
                { label: "Fat", value: analysis.fat },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-[18px] border border-white/75 bg-white/82 px-2 py-2.5 text-center shadow-sm"
                >
                  <p className="font-display text-lg font-semibold tracking-[-0.04em] text-pickle-900">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-pickle-500">
                    {m.label === "Calories" ? "Cal" : m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 px-5 py-3 backdrop-blur-xl">
        <div className="pickle-glass rounded-[24px] p-1.5 shadow-[0_12px_28px_rgba(61,104,22,0.08)]">
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1 rounded-[18px] px-2 py-3 text-[11px] font-bold transition-all duration-200 whitespace-nowrap
                ${
                  tab === t.id
                    ? t.special
                      ? "bg-pickle-400 text-white shadow-sm"
                      : "bg-white text-pickle-800 shadow-sm"
                    : t.special
                      ? "bg-pickle-50 text-pickle-500"
                      : "text-pickle-500"
                }`}
              >
                {t.special && <Sparkles className="w-3.5 h-3.5" />}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-4 flex-1">
        {tab === "overview" && (
          <div className="space-y-5 animate-fade-in">
            <div className="pickle-card-soft rounded-[26px] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pickle-500">
                Quick Summary
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-pickle-700">
                {analysis.aiSummary}
              </p>
            </div>

            {highRiskIngredients.length > 0 && (
              <div className="rounded-[26px] border border-coral-200 bg-coral-50/95 p-4 shadow-[0_12px_26px_rgba(232,93,74,0.08)]">
                <div className="flex items-start gap-3">
                  <AlertOctagon className="w-5 h-5 text-coral-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-coral-600">
                      High-Risk Ingredients
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-pickle-700">
                      Contains{" "}
                      <span className="font-bold text-coral-600">
                        {highRiskIngredients.join(", ")}
                      </span>
                      . Tap the Ingredients tab for evidence details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <ScoreBreakdown factors={analysis.scoreFactors} />
            <ProConGrid pros={analysis.pros} cons={analysis.cons} />
          </div>
        )}

        {tab === "nutrition" && (
          <NutritionPanel
            macros={analysis.macroDetails}
            productCategory={analysis.productCategory}
          />
        )}

        {tab === "ingredients" && (
          <IngredientsPanel ingredients={analysis.ingredients} />
        )}

        {tab === "chat" && <ChatPanel analysis={analysis} />}
      </div>

      <div className="absolute bottom-6 right-5 z-20">
        <button
          onClick={onNewScan}
          className="flex items-center gap-2 rounded-full bg-pickle-400 px-4 py-3.5 text-white shadow-[0_18px_34px_rgba(74,124,26,0.28)] transition-all hover:bg-pickle-500 active:scale-95"
          aria-label="New scan"
        >
          <Camera className="w-6 h-6" />
          <span className="pr-1 text-sm font-bold">Scan Again</span>
        </button>
      </div>
    </div>
  );
}
