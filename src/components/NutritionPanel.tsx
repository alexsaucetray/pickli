import type { MacroDetail } from "../types";

function sentimentDot(sentiment: MacroDetail["sentiment"]) {
  if (sentiment === "positive") return "bg-mint-400";
  if (sentiment === "negative") return "bg-coral-400";
  return "bg-warn-400";
}

function levelPips(
  level: MacroDetail["level"],
  sentiment: MacroDetail["sentiment"],
) {
  const on = sentimentDot(sentiment);
  const off = "bg-cream-200";
  return (
    <div className="flex gap-0.5">
      <div className={`h-1.5 w-3 rounded-full ${on}`} />
      <div
        className={`h-1.5 w-3 rounded-full ${level === "moderate" || level === "high" ? on : off}`}
      />
      <div
        className={`h-1.5 w-3 rounded-full ${level === "high" ? on : off}`}
      />
    </div>
  );
}

function sentimentLabel(sentiment: MacroDetail["sentiment"]) {
  if (sentiment === "positive") return { text: "Good", cls: "text-mint-600" };
  if (sentiment === "negative") return { text: "Watch", cls: "text-coral-500" };
  return { text: "OK", cls: "text-warn-500" };
}

interface Props {
  macros: MacroDetail[];
  productCategory: string;
}

export default function NutritionPanel({ macros, productCategory }: Props) {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="text-center">
        <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-pickle-500 shadow-sm">
          For a {productCategory.toLowerCase()}
        </span>
      </div>

      <div className="pickle-card-soft overflow-hidden rounded-[26px] divide-y divide-cream-100">
        {macros.map((m, i) => {
          const sl = sentimentLabel(m.sentiment);
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Name + pips */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-pickle-800 truncate">
                  {m.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {levelPips(m.level, m.sentiment)}
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${sl.cls}`}
                  >
                    {sl.text}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <p className="font-display text-lg font-bold text-pickle-900 tabular-nums flex-shrink-0">
                {m.amount}
              </p>
            </div>
          );
        })}
      </div>

      {/* Context notes — only show non-empty ones */}
      {macros.some((m) => m.contextNote) && (
        <div className="pickle-card-soft rounded-[24px] p-4 space-y-2">
          {macros
            .filter((m) => m.contextNote && m.sentiment !== "positive")
            .slice(0, 3)
            .map((m, i) => (
              <p
                key={i}
                className="border-l-2 border-brine-300 pl-3 text-[11px] leading-snug text-pickle-500"
              >
                <span className="font-semibold text-pickle-700">{m.name}:</span>{" "}
                {m.contextNote}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
