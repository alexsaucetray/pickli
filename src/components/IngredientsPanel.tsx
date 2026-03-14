import { useState } from "react";
import { FlaskConical, AlertOctagon, ChevronRight } from "lucide-react";
import type { IngredientEntry } from "../types";
import IngredientSheet from "./IngredientSheet";

function riskDot(level: IngredientEntry["riskLevel"]) {
  if (level === "avoid") return "bg-coral-500 animate-pulse";
  if (level === "concern") return "bg-coral-400";
  if (level === "caution") return "bg-warn-400";
  if (level === "watch") return "bg-brine-500";
  return "bg-mint-400";
}

interface Props {
  ingredients: IngredientEntry[];
}

export default function IngredientsPanel({ ingredients }: Props) {
  const [selected, setSelected] = useState<IngredientEntry | null>(null);

  const topLevel = ingredients.filter((i) => !i.parentIngredient);
  const topLevelNames = new Set(topLevel.map((i) => i.rawName));
  const orphaned = ingredients.filter(
    (i) => i.parentIngredient && !topLevelNames.has(i.parentIngredient),
  );
  const roots = [...topLevel, ...orphaned];
  const flaggedCount = ingredients.filter(
    (i) => i.riskLevel === "avoid" || i.riskLevel === "concern",
  ).length;
  const syntheticCount = ingredients.filter((i) => i.isSynthetic).length;

  return (
    <div className="animate-fade-in space-y-3">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-pickle-500 shadow-sm">
          {roots.length} primary ingredients
        </span>
        {flaggedCount > 0 && (
          <span className="rounded-full bg-coral-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-coral-600 shadow-sm">
            {flaggedCount} flagged
          </span>
        )}
        {syntheticCount > 0 && (
          <span className="rounded-full bg-brine-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-pickle-600 shadow-sm">
            {syntheticCount} synthetic
          </span>
        )}
      </div>

      <div className="pickle-card-soft overflow-hidden rounded-[26px] divide-y divide-cream-100">
        {roots.map((parent, idx) => {
          const children = ingredients.filter(
            (i) => i.parentIngredient && i.parentIngredient === parent.rawName,
          );

          return (
            <div
              key={idx}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {/* Parent row */}
              <button
                onClick={() => setSelected(parent)}
                className="w-full px-4 py-3 text-left flex items-center gap-2.5 transition-colors active:bg-cream-50"
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${riskDot(parent.riskLevel)}`}
                />
                <span className="text-sm font-medium text-pickle-800 truncate flex-1">
                  {parent.commonName}
                </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {parent.isSynthetic && (
                    <FlaskConical className="w-3 h-3 text-brine-500" />
                  )}
                  {(parent.riskLevel === "avoid" ||
                    parent.riskLevel === "concern") && (
                    <AlertOctagon className="w-3.5 h-3.5 text-coral-400" />
                  )}
                  {children.length > 0 && (
                    <span className="text-[8px] font-bold text-cream-400 ml-0.5">
                      +{children.length}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-cream-300" />
                </div>
              </button>

              {/* Children — compact indent */}
              {children.length > 0 && (
                <div className="border-t border-cream-100 bg-cream-50/60">
                  {children.map((child, ci) => (
                    <button
                      key={ci}
                      onClick={() => setSelected(child)}
                      className="w-full text-left pl-9 pr-4 py-2 flex items-center gap-2 transition-colors active:bg-cream-100"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${riskDot(child.riskLevel)}`}
                      />
                      <span className="text-xs font-medium text-pickle-600 truncate flex-1">
                        {child.commonName}
                      </span>
                      {child.isSynthetic && (
                        <FlaskConical className="w-2.5 h-2.5 text-brine-500" />
                      )}
                      {(child.riskLevel === "avoid" ||
                        child.riskLevel === "concern") && (
                        <AlertOctagon className="w-3 h-3 text-coral-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-pickle-500 text-center">
        Tap any ingredient for details
      </p>

      {/* Bottom sheet */}
      {selected && (
        <IngredientSheet
          ingredient={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
