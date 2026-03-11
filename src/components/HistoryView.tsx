import { Trash2, ChevronRight, Clock } from 'lucide-react';
import type { ScanHistoryItem, PickliAnalysis } from '../types';
import { getScoreColor } from '../lib/health-score';
import { clearHistory } from '../lib/storage';
import PickleMascot from './PickleMascot';

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
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function HistoryView({ items, onSelect, onClear, onBack }: Props) {
  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      {/* Title */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-pickle-800">Scan History</h2>
          <p className="text-xs text-cream-400 mt-0.5">{items.length} product{items.length !== 1 ? 's' : ''} scanned</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => {
              clearHistory();
              onClear();
            }}
            className="p-2.5 rounded-xl bg-coral-50 text-coral-400 hover:bg-coral-100 active:scale-95 transition-all"
            aria-label="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 p-5 pt-2 overflow-y-auto hide-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center pb-20">
            <PickleMascot mood="neutral" size={80} className="mb-4 opacity-40" />
            <p className="text-sm font-semibold text-cream-400">No scans yet</p>
            <p className="text-xs text-cream-300 mt-1">Analyze a product to start building your history.</p>
            <button
              onClick={onBack}
              className="mt-6 px-5 py-2.5 bg-pickle-400 text-white text-sm font-bold rounded-xl hover:bg-pickle-500 active:scale-95 transition-all"
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
                  className="w-full text-left bg-white border border-cream-200 rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] hover:bg-pickle-50/30 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Score circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.stroke}18` }}
                  >
                    <span className="font-display text-lg font-bold" style={{ color: colors.stroke }}>
                      {item.analysis.healthScore}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-pickle-800 truncate">
                      {item.analysis.productName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3 text-cream-300" />
                      <span className="text-[10px] text-cream-400 font-medium">
                        {formatDate(item.scannedAt)}
                      </span>
                      <span className="text-cream-300 text-[10px]">&middot;</span>
                      <span className="text-[10px] text-pickle-500 font-medium">
                        {item.analysis.productCategory}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-cream-300 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
