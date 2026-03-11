import type { Concern } from '../types';

const LEVEL_STYLES: Record<Concern['evidenceLevel'], { bg: string; text: string; label: string }> = {
  strong: { bg: 'bg-coral-100', text: 'text-coral-600', label: 'Strong' },
  moderate: { bg: 'bg-warn-100', text: 'text-warn-600', label: 'Moderate' },
  limited: { bg: 'bg-cream-200', text: 'text-pickle-700', label: 'Limited' },
  theoretical: { bg: 'bg-cream-100', text: 'text-cream-400', label: 'Theoretical' },
};

export default function EvidencePill({ level }: { level: Concern['evidenceLevel'] }) {
  const style = LEVEL_STYLES[level];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
