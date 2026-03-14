import { createPortal } from "react-dom";
import {
  X,
  FlaskConical,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Beaker,
} from "lucide-react";
import type { IngredientEntry } from "../types";
import EvidencePill from "./EvidencePill";

interface Props {
  ingredient: IngredientEntry;
  onClose: () => void;
}

function riskConfig(level: IngredientEntry["riskLevel"]) {
  if (level === "avoid")
    return {
      icon: AlertOctagon,
      color: "text-coral-600",
      bg: "bg-coral-50",
      label: "Avoid",
    };
  if (level === "concern")
    return {
      icon: AlertOctagon,
      color: "text-coral-600",
      bg: "bg-coral-50",
      label: "Concern",
    };
  if (level === "caution")
    return {
      icon: AlertTriangle,
      color: "text-warn-600",
      bg: "bg-warn-50",
      label: "Caution",
    };
  if (level === "watch")
    return {
      icon: AlertTriangle,
      color: "text-brine-500",
      bg: "bg-brine-50",
      label: "Watch",
    };
  return {
    icon: CheckCircle2,
    color: "text-mint-600",
    bg: "bg-mint-50",
    label: "Low Risk",
  };
}

export default function IngredientSheet({ ingredient, onClose }: Props) {
  const risk = riskConfig(ingredient.riskLevel);
  const Icon = risk.icon;

  // Portal to document.body so the fixed overlay isn't broken by
  // ancestor transforms (animate-fade-in-up on ResultsDashboard)
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative flex max-h-[75vh] w-full max-w-md flex-col rounded-t-[32px] border border-white/70 bg-[linear-gradient(180deg,#fffdf7,#fbf5e9)] shadow-2xl animate-slide-up">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-cream-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pb-3 flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="font-display text-xl font-bold text-pickle-900 leading-tight">
              {ingredient.commonName}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${risk.color} ${risk.bg} px-2 py-0.5 rounded-md`}
              >
                <Icon className="w-3 h-3" />
                {risk.label}
              </span>
              {ingredient.isSynthetic && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-brine-500 bg-brine-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  <FlaskConical className="w-3 h-3" />
                  Synthetic
                </span>
              )}
              {ingredient.isAllergen && (
                <span className="text-[10px] font-bold text-warn-600 bg-warn-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Allergen
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-pickle-400 rounded-full hover:bg-cream-200 transition-colors flex-shrink-0 mt-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="px-5 pb-6 space-y-4 overflow-y-auto flex-1 hide-scrollbar">
          {/* Function */}
          <div className="pickle-card-soft rounded-xl px-4 py-3">
            <p className="text-[10px] font-bold text-cream-400 uppercase tracking-widest mb-1">
              What it does
            </p>
            <p className="text-sm font-medium text-pickle-700 leading-relaxed">
              {ingredient.primaryFunction}
            </p>
          </div>

          {/* Dose context */}
          {ingredient.doseContext && (
            <div className="rounded-xl border border-brine-200 bg-brine-50/90 px-4 py-3">
              <p className="text-[10px] font-bold text-brine-500 uppercase tracking-widest mb-1">
                <Beaker className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                Dose in this product
              </p>
              <p className="text-sm font-medium text-pickle-600 leading-relaxed">
                {ingredient.doseContext}
              </p>
            </div>
          )}

          {/* Concerns — the science section */}
          {ingredient.concerns.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-cream-400 uppercase tracking-widest mb-2">
                Health concerns
              </p>
              <div className="space-y-2">
                {ingredient.concerns.map((c, i) => (
                  <div
                    key={i}
                    className="pickle-card-soft rounded-xl px-4 py-3"
                  >
                    <div className="mb-1.5">
                      <EvidencePill level={c.evidenceLevel} />
                    </div>
                    <p className="text-[13px] font-medium text-pickle-700 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No concerns — reassurance */}
          {ingredient.concerns.length === 0 && (
            <div className="rounded-xl border border-mint-200 bg-mint-50 px-4 py-3 text-center">
              <CheckCircle2 className="w-5 h-5 text-mint-500 mx-auto mb-1" />
              <p className="text-sm font-medium text-pickle-600">
                No known health concerns at typical dietary levels.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
