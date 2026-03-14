import { ArrowLeft, History } from "lucide-react";
import PickleLogo from "./PickleLogo";

interface Props {
  onHistoryClick: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ onHistoryClick, showBack, onBack }: Props) {
  return (
    <header className="relative z-10 flex-shrink-0 px-5 pt-7 pb-4 sm:pt-9">
      <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-pickle-100 to-transparent" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="pickle-glass flex h-11 w-11 items-center justify-center rounded-2xl text-pickle-600 shadow-[0_10px_26px_rgba(61,104,22,0.08)] active:scale-95 transition-all"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
          ) : null}

          <div className="flex min-w-0 items-center gap-3">
            <div className="pickle-glass pickle-shimmer relative flex h-14 w-14 items-center justify-center rounded-[22px] shadow-[0_16px_40px_rgba(61,104,22,0.12)]">
              <div className="absolute inset-[1px] rounded-[20px] bg-[linear-gradient(145deg,#ffffff,#f9f2e4)]" />
              <PickleLogo className="relative h-10 w-10" />
            </div>

            <div className="min-w-0">
              <span className="pickle-chip mb-1.5">Briny Nutrition Guide</span>
              <h1 className="font-display text-[1.65rem] font-bold leading-none tracking-[-0.04em] text-pickle-900">
                Pickli
              </h1>
              <p className="mt-1 text-[11px] font-medium text-pickle-500">
                Food label decoder for everyday shoppers
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onHistoryClick}
          className="pickle-glass flex h-11 w-11 items-center justify-center rounded-2xl text-pickle-700 shadow-[0_10px_26px_rgba(61,104,22,0.08)] active:scale-95 transition-all"
          aria-label="Scan history"
        >
          <History className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
