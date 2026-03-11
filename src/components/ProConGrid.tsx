import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  pros: string[];
  cons: string[];
}

export default function ProConGrid({ pros, cons }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Pros column */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 mb-3">
          <ThumbsUp className="w-4 h-4 text-mint-600" />
          <span className="text-[10px] font-bold text-mint-600 uppercase tracking-widest">Pros</span>
        </div>
        {pros.map((p, i) => (
          <div
            key={i}
            className="bg-mint-100/50 border border-mint-200/60 rounded-xl p-3 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <p className="text-xs font-medium text-pickle-700 leading-relaxed">{p}</p>
          </div>
        ))}
      </div>

      {/* Cons column */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 mb-3">
          <ThumbsDown className="w-4 h-4 text-coral-400" />
          <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest">Cons</span>
        </div>
        {cons.map((c, i) => (
          <div
            key={i}
            className="bg-coral-50 border border-coral-200/60 rounded-xl p-3 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <p className="text-xs font-medium text-pickle-700 leading-relaxed">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
