import { History } from 'lucide-react';
import PickleLogo from './PickleLogo';

interface Props {
  onHistoryClick: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ onHistoryClick, showBack, onBack }: Props) {
  return (
    <header className="bg-cream-50 px-5 pt-12 pb-3 flex-shrink-0 border-b border-cream-200/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="text-pickle-500 text-sm font-semibold mr-1 active:opacity-60"
            >
              &larr; Back
            </button>
          ) : null}
          <div className="bg-pickle-400 p-2 rounded-2xl shadow-sm">
            <PickleLogo className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-pickle-800 leading-none tracking-tight">
              Pickli
            </h1>
            <p className="text-[9px] font-semibold text-pickle-400 uppercase tracking-[0.15em] mt-0.5">
              Nutrition Intelligence
            </p>
          </div>
        </div>
        <button
          onClick={onHistoryClick}
          className="p-2.5 rounded-xl bg-cream-100 text-pickle-600 hover:bg-cream-200 active:scale-95 transition-all"
          aria-label="Scan history"
        >
          <History className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
