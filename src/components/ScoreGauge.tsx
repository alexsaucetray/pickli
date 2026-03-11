import { useEffect, useState } from 'react';
import { getScoreColor } from '../lib/health-score';

interface Props {
  score: number;
  label: string;
  size?: number;
}

export default function ScoreGauge({ score, label, size = 180 }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const colors = getScoreColor(score);

  const strokeWidth = 10;
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
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-cream-200"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
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
        <span className="font-display text-5xl font-bold tracking-tight" style={{ color: colors.stroke }}>
          {animatedScore}
        </span>
        <span className={`text-xs font-semibold mt-1 uppercase tracking-widest ${colors.text}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
