import PickleMascot from './PickleMascot';

const STEPS = [
  'Extracting text via OCR...',
  'Analyzing macronutrient profile...',
  'Evaluating ingredient safety...',
  'Cross-referencing regulatory data...',
  'Computing health score...',
];

export default function ScanningView() {
  return (
    <div className="absolute inset-0 bg-cream-50/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="animate-float">
          <PickleMascot mood="neutral" size={100} />
        </div>
        {/* Scanning ring */}
        <div className="absolute -inset-4">
          <svg className="w-full h-full" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="64"
              fill="none"
              stroke="#d4f0d4"
              strokeWidth="3"
            />
            <circle
              cx="70"
              cy="70"
              r="64"
              fill="none"
              stroke="#4A7C1A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100 302"
              className="origin-center"
              style={{ animation: 'spin-slow 2s linear infinite' }}
            />
          </svg>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-pickle-800 mb-3">
        Analyzing Label
      </h2>

      <div className="h-5 overflow-hidden">
        <div
          className="flex flex-col items-center"
          style={{
            animation: `scanning-slide ${STEPS.length * 2}s ease-in-out infinite`,
          }}
        >
          {STEPS.map((step, i) => (
            <span key={i} className="text-sm font-medium text-pickle-500 h-5 leading-5">
              {step}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scanning-slide {
          ${STEPS.map((_, i) => {
            const pct = (i / STEPS.length) * 100;
            const hold = pct + 100 / STEPS.length * 0.7;
            return `${pct}%, ${hold}% { transform: translateY(-${i * 20}px); }`;
          }).join('\n')}
        }
      `}</style>
    </div>
  );
}
