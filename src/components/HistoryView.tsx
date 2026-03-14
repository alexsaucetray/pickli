import { Trash2, ChevronRight, Clock } from "lucide-react";
import type { ScanHistoryItem, PickliAnalysis } from "../types";
import { getScoreColor } from "../lib/health-score";
import { clearHistory } from "../lib/storage";
import PickleMascot from "./PickleMascot";

interface Props {
  items: ScanHistoryItem[];
  onSelect: (analysis: PickliAnalysis) => void;
  onClear: () => void;
  onBack: () => void;
}

function formatDate(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function HistoryView({
  items,
  onSelect,
  onClear,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="px-5 pt-5 pb-3">
        <div className="pickle-card rounded-[30px] p-5">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="max-w-[15rem]">
              <span className="pickle-chip">Past Scans</span>
              <h2 className="mt-3 font-display text-[1.85rem] font-semibold leading-[0.98] tracking-[-0.05em] text-pickle-900">
                Scan History
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-pickle-600">
                {items.length} product{items.length !== 1 ? "s" : ""} saved for
                quick revisits and comparisons.
              </p>
            </div>

            <div className="flex items-start gap-2">
              {items.length > 0 && (
                <button
                  onClick={() => {
                    clearHistory();
                    onClear();
                  }}
                  className="rounded-2xl bg-coral-50 p-2.5 text-coral-400 transition-all hover:bg-coral-100 active:scale-95"
                  aria-label="Clear history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute right-2 bottom-0 opacity-95">
            <PickleMascot
              mood={items.length > 0 ? "happy" : "neutral"}
              size={82}
              className="opacity-90"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 pt-2 overflow-y-auto hide-scrollbar">
        {items.length === 0 ? (
          <div className="pickle-card-soft flex h-full flex-col items-center justify-center rounded-[28px] px-8 pb-20 text-center">
            <PickleMascot
              mood="neutral"
              size={88}
              className="mb-5 opacity-75"
            />
            <p className="text-base font-semibold text-pickle-700">
              No scans yet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-pickle-500">
              Analyze a product to start building your personal pantry history.
            </p>
            <button
              onClick={onBack}
              className="mt-6 rounded-[20px] bg-pickle-400 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(74,124,26,0.24)] transition-all hover:bg-pickle-500 active:scale-95"
            >
              Scan a Product
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, i) => {
              const colors = getScoreColor(item.analysis.healthScore);
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.analysis)}
                  className="pickle-card-soft flex w-full items-center gap-4 rounded-[24px] p-4 text-left transition-all animate-fade-in-up hover:bg-pickle-50/40 active:scale-[0.98]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.stroke}18` }}
                  >
                    <span
                      className="font-display text-lg font-bold"
                      style={{ color: colors.stroke }}
                    >
                      {item.analysis.healthScore}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-pickle-800 truncate">
                      {item.analysis.productName}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-pickle-400" />
                      <span className="text-[10px] font-medium text-pickle-500">
                        {formatDate(item.scannedAt)}
                      </span>
                      <span className="text-pickle-300 text-[10px]">
                        &middot;
                      </span>
                      <span className="rounded-full bg-white/85 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-pickle-500 shadow-sm">
                        {item.analysis.productCategory}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-pickle-300 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
