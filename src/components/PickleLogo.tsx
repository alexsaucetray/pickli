import { useId } from "react";

const OUTLINE = "#29411C";
const FACE = "#162610";

export default function PickleLogo({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const bodyId = `${id}-body`;
  const bellyId = `${id}-belly`;
  const hatId = `${id}-hat`;

  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={bodyId}
          x1="22"
          y1="18"
          x2="50"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AADA4C" />
          <stop offset="0.58" stopColor="#7CBD34" />
          <stop offset="1" stopColor="#5A9026" />
        </linearGradient>
        <linearGradient
          id={bellyId}
          x1="29"
          y1="24"
          x2="42"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D5F08E" />
          <stop offset="1" stopColor="#A8D65B" />
        </linearGradient>
        <linearGradient
          id={hatId}
          x1="22"
          y1="4"
          x2="49"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EAEFE8" />
        </linearGradient>
      </defs>

      <g>
        <circle
          cx="28"
          cy="14"
          r="7"
          fill={`url(#${hatId})`}
          stroke={OUTLINE}
          strokeWidth="2.2"
        />
        <circle
          cx="44"
          cy="14"
          r="7"
          fill={`url(#${hatId})`}
          stroke={OUTLINE}
          strokeWidth="2.2"
        />
        <circle
          cx="36"
          cy="10"
          r="9"
          fill={`url(#${hatId})`}
          stroke={OUTLINE}
          strokeWidth="2.2"
        />
        <rect
          x="27"
          y="14"
          width="18"
          height="9.5"
          rx="3"
          fill={`url(#${hatId})`}
          stroke={OUTLINE}
          strokeWidth="2.2"
        />
        <rect x="28.2" y="12.9" width="15.6" height="4.6" fill="white" />

        <path
          d="M25 22C19.8 24.5 17 31.4 17 39.8C17 52.1 24.6 61 36 61C47.5 61 55 51.7 55 39C55 30.3 52.2 23.8 47 21.8C42.5 20 29.8 19.7 25 22Z"
          fill={`url(#${bodyId})`}
          stroke={OUTLINE}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path
          d="M27.8 25.8C24 28.1 21.9 33.5 21.9 40.4C21.9 49.9 27.2 56.6 35.8 56.6C44.2 56.6 49.7 49.7 49.7 39.4C49.7 32.6 47.5 27.5 43.8 25.3C40.6 23.4 31.5 23.5 27.8 25.8Z"
          fill={`url(#${bellyId})`}
          opacity="0.95"
        />
        <ellipse
          cx="28"
          cy="30"
          rx="2.2"
          ry="3"
          fill="#6AA53A"
          opacity="0.55"
        />
        <ellipse
          cx="44"
          cy="29"
          rx="2.1"
          ry="2.8"
          fill="#6AA53A"
          opacity="0.5"
        />
        <ellipse
          cx="27"
          cy="42"
          rx="2.5"
          ry="3.4"
          fill="#6AA53A"
          opacity="0.52"
        />
        <ellipse
          cx="45"
          cy="43"
          rx="2.4"
          ry="3.1"
          fill="#6AA53A"
          opacity="0.5"
        />
        <ellipse
          cx="36"
          cy="51"
          rx="2.3"
          ry="2.8"
          fill="#6AA53A"
          opacity="0.44"
        />

        <ellipse cx="31.1" cy="35.5" rx="4.4" ry="5.2" fill="white" />
        <ellipse cx="41.2" cy="35" rx="4.4" ry="5.2" fill="white" />
        <ellipse cx="32" cy="36.1" rx="2.7" ry="3.4" fill={FACE} />
        <ellipse cx="42" cy="35.6" rx="2.7" ry="3.4" fill={FACE} />
        <circle cx="33" cy="34.4" r="0.9" fill="white" />
        <circle cx="43" cy="33.9" r="0.9" fill="white" />
        <path
          d="M31.5 45C33.7 48.4 38.4 48.8 41.2 44.8"
          fill="none"
          stroke={FACE}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <ellipse
          cx="27.7"
          cy="40.7"
          rx="2.6"
          ry="1.5"
          fill="#F39A85"
          opacity="0.38"
        />
        <ellipse
          cx="44.9"
          cy="39.8"
          rx="2.6"
          ry="1.5"
          fill="#F39A85"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
