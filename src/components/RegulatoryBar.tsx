import type { RegulatoryStatus } from '../types';

export default function RegulatoryBar({ status }: { status: RegulatoryStatus }) {
  return (
    <div className="flex gap-2">
      <div className="flex-1 bg-cream-50 border border-cream-300 rounded-xl p-3">
        <p className="text-[9px] font-bold text-cream-400 uppercase tracking-widest mb-1">FDA</p>
        <p className="text-xs font-semibold text-pickle-700">{status.fda}</p>
      </div>
      <div className="flex-1 bg-cream-50 border border-cream-300 rounded-xl p-3">
        <p className="text-[9px] font-bold text-cream-400 uppercase tracking-widest mb-1">EFSA</p>
        <p className="text-xs font-semibold text-pickle-700">{status.efsa}</p>
      </div>
    </div>
  );
}
