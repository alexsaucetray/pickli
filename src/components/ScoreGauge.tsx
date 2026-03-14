import { useEffect, useState } from "react";
import { getScoreColor } from "../lib/health-score";

interface Props {
  score: number;
  label: string;
  size?: number;
}

export default function ScoreGauge({ score, label, size = 180 }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const colors = getScoreColor(score);
  const eyebrowSize = Math.max(9, Math.round(size * 0.06));
  const scoreSize = Math.round(size * 0.3);
  const pillSize = Math.max(9, Math.round(size * 0.06));

  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const dashOffset = circumference - progress;

  useEffect(() => {
    let frame: number;
    const duration = 1600;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedScore(Math.round(eased * score));
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-[13%] rounded-full bg-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(61,104,22,0.08)]" />
      <div
        className="absolute inset-[7.5%] rounded-full"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.68), 0 0 0 10px ${colors.stroke}16`,
        }}
      />
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-cream-200"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="gauge-circle"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-bold uppercase tracking-[0.25em] text-pickle-500"
          style={{ fontSize: `${eyebrowSize}px` }}
        >
          Health Score
        </span>
        <span
          className="mt-1 font-display font-bold tracking-tight"
          style={{ color: colors.stroke, fontSize: `${scoreSize}px` }}
        >
          {animatedScore}
        </span>
        <span
          className={`mt-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.22em] ${colors.text}`}
          style={{
            backgroundColor: `${colors.stroke}14`,
            fontSize: `${pillSize}px`,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
