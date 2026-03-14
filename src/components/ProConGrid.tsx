import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Props {
  pros: string[];
  cons: string[];
}

export default function ProConGrid({ pros, cons }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="pickle-card-soft rounded-[26px] p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4 text-mint-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint-600">
            Pros
          </span>
        </div>
        <div className="space-y-2">
          {pros.map((p, i) => (
            <div
              key={i}
              className="rounded-[18px] bg-mint-50 px-3 py-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-xs font-medium leading-relaxed text-pickle-700">
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pickle-card-soft rounded-[26px] p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <ThumbsDown className="w-4 h-4 text-coral-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral-400">
            Cons
          </span>
        </div>
        <div className="space-y-2">
          {cons.map((c, i) => (
            <div
              key={i}
              className="rounded-[18px] bg-coral-50/90 px-3 py-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-xs font-medium leading-relaxed text-pickle-700">
                {c}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
