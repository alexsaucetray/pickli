import PickleMascot from "./PickleMascot";

const STEPS = [
  "Extracting text via OCR...",
  "Analyzing macronutrient profile...",
  "Evaluating ingredient safety...",
  "Cross-referencing regulatory data...",
  "Computing health score...",
];

export default function ScanningView() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-cream-50/88 p-6 text-center backdrop-blur-md animate-fade-in">
      <div className="pickle-card w-full max-w-[320px] rounded-[32px] p-6">
        <div className="relative z-10">
          <span className="pickle-chip">Scanning The Brine</span>

          <div className="relative mx-auto mb-7 mt-6 w-fit">
            <div className="animate-float">
              <PickleMascot mood="neutral" size={110} />
            </div>
            <div className="absolute -inset-4">
              <svg className="h-full w-full" viewBox="0 0 148 148">
                <circle
                  cx="74"
                  cy="74"
                  r="66"
                  fill="none"
                  stroke="#d4f0d4"
                  strokeWidth="3"
                />
                <circle
                  cx="74"
                  cy="74"
                  r="66"
                  fill="none"
                  stroke="#4A7C1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="104 310"
                  className="origin-center"
                  style={{ animation: "spin-slow 2s linear infinite" }}
                />
              </svg>
            </div>
          </div>

          <h2 className="font-display text-[2rem] font-semibold tracking-[-0.05em] text-pickle-900">
            Checking your label
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-pickle-600">
            Pulling out the parts that matter most: nutrition, ingredient
            quality, and overall score.
          </p>

          <div className="mt-5 rounded-[22px] bg-white/82 px-4 py-3 shadow-sm">
            <div className="h-6 overflow-hidden">
              <div
                className="flex flex-col items-center"
                style={{
                  animation: `scanning-slide ${STEPS.length * 2}s ease-in-out infinite`,
                }}
              >
                {STEPS.map((step, i) => (
                  <span
                    key={i}
                    className="h-6 text-sm font-medium leading-6 text-pickle-500"
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-pickle-300"
                style={{
                  animation: `scanning-dot 1.4s ease-in-out ${dot * 180}ms infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanning-slide {
          ${STEPS.map((_, i) => {
            const pct = (i / STEPS.length) * 100;
            const hold = pct + (100 / STEPS.length) * 0.7;
            return `${pct}%, ${hold}% { transform: translateY(-${i * 24}px); }`;
          }).join("\n")}
        }
      `}</style>
    </div>
  );
}
