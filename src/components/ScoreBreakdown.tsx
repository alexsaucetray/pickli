import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import type { ScoreFactor } from "../types";

export default function ScoreBreakdown({
  factors,
}: {
  factors: ScoreFactor[];
}) {
  const [open, setOpen] = useState(false);

  const pros = factors.filter((f) => f.type === "pro");
  const cons = factors.filter((f) => f.type === "con");

  return (
    <div className="pickle-card-soft overflow-hidden rounded-[26px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors active:bg-cream-50/70"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-pickle-700">
          How We Scored This
        </span>
        <ChevronDown
          className={`w-4 h-4 text-pickle-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 animate-fade-in-up space-y-3">
          <p className="text-[11px] font-medium text-pickle-500">
            Base score: 50. Each factor adds or subtracts points.
          </p>

          {pros.length > 0 && (
            <div className="space-y-1.5">
              {pros.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-[16px] bg-mint-50 px-3 py-2.5"
                >
                  <Plus className="w-3.5 h-3.5 text-mint-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-pickle-700 flex-1">
                    {f.label}
                  </span>
                  <span className="text-xs font-bold text-mint-600">
                    +{f.points}
                  </span>
                </div>
              ))}
            </div>
          )}

          {cons.length > 0 && (
            <div className="space-y-1.5">
              {cons.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-[16px] bg-coral-50/90 px-3 py-2.5"
                >
                  <Minus className="w-3.5 h-3.5 text-coral-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-pickle-700 flex-1">
                    {f.label}
                  </span>
                  <span className="text-xs font-bold text-coral-400">
                    {f.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
