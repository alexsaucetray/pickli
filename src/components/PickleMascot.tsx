import { useId } from "react";

type MascotMood = "happy" | "neutral" | "worried" | "sad";

interface Props {
  mood?: MascotMood;
  className?: string;
  size?: number;
}

const OUTLINE = "#29411C";
const FACE = "#162610";

function Eye({
  cx,
  cy,
  sad = false,
}: {
  cx: number;
  cy: number;
  sad?: boolean;
}) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx="6.8" ry={sad ? "7.9" : "8.4"} fill="white" />
      <ellipse
        cx={cx + 1}
        cy={cy + 0.9}
        rx="3.9"
        ry={sad ? "4.8" : "5.2"}
        fill={FACE}
      />
      <circle cx={cx + 2.2} cy={cy - 1.6} r="1.45" fill="white" />
    </>
  );
}

function Hat({ hatId }: { hatId: string }) {
  return (
    <g transform="translate(0, -4)">
      <circle
        cx="56"
        cy="28"
        r="15"
        fill={`url(#${hatId})`}
        stroke={OUTLINE}
        strokeWidth="3.2"
      />
      <circle
        cx="84"
        cy="28"
        r="15"
        fill={`url(#${hatId})`}
        stroke={OUTLINE}
        strokeWidth="3.2"
      />
      <circle
        cx="70"
        cy="18"
        r="19"
        fill={`url(#${hatId})`}
        stroke={OUTLINE}
        strokeWidth="3.2"
      />
      <rect
        x="52"
        y="28"
        width="36"
        height="18"
        rx="4.5"
        fill={`url(#${hatId})`}
        stroke={OUTLINE}
        strokeWidth="3.2"
      />
      <rect x="54.8" y="26.5" width="30.4" height="7.5" fill="white" />
    </g>
  );
}

function Face({ mood }: { mood: MascotMood }) {
  return (
    <>
      {mood === "worried" && (
        <>
          <path
            d="M58 63L67 59"
            fill="none"
            stroke={FACE}
            strokeWidth="2.7"
            strokeLinecap="round"
          />
          <path
            d="M82 63L73 59"
            fill="none"
            stroke={FACE}
            strokeWidth="2.7"
            strokeLinecap="round"
          />
        </>
      )}

      <Eye cx={61} cy={73} sad={mood === "sad"} />
      <Eye cx={79} cy={72} sad={mood === "sad"} />

      {mood === "happy" && (
        <>
          <path
            d="M60 92C64.8 99 75.4 99.7 80.6 90.5"
            fill="none"
            stroke={FACE}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <ellipse
            cx="70.7"
            cy="95.5"
            rx="4.3"
            ry="2.5"
            fill="#EF7767"
            opacity="0.72"
          />
          <ellipse
            cx="52.5"
            cy="82.5"
            rx="5.8"
            ry="3.1"
            fill="#F39A85"
            opacity="0.34"
          />
          <ellipse
            cx="87.8"
            cy="81.3"
            rx="5.8"
            ry="3.1"
            fill="#F39A85"
            opacity="0.3"
          />
        </>
      )}

      {mood === "neutral" && (
        <>
          <path
            d="M62 92C65.8 95 74.1 94.9 77.8 90.8"
            fill="none"
            stroke={FACE}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="52.8"
            cy="82"
            rx="5.6"
            ry="3"
            fill="#F39A85"
            opacity="0.28"
          />
          <ellipse
            cx="87"
            cy="80.8"
            rx="5.6"
            ry="3"
            fill="#F39A85"
            opacity="0.24"
          />
        </>
      )}

      {mood === "worried" && (
        <path
          d="M62.5 96.5C66.2 91.2 73.6 90.8 77.7 96.3"
          fill="none"
          stroke={FACE}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}

      {mood === "sad" && (
        <>
          <path
            d="M61.5 98.5C65.5 92.2 74.6 91.8 79 98.2"
            fill="none"
            stroke={FACE}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M91 82C91 82 94.5 87.5 91 91.3C87.5 87.5 91 82 91 82Z"
            fill="#8FD0F2"
            opacity="0.86"
          />
        </>
      )}
    </>
  );
}

export default function PickleMascot({
  mood = "happy",
  className = "",
  size = 120,
}: Props) {
  const id = useId().replace(/:/g, "");
  const bodyId = `${id}-body`;
  const bellyId = `${id}-belly`;
  const hatId = `${id}-hat`;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={bodyId}
          x1="42"
          y1="28"
          x2="100"
          y2="126"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AADA4C" />
          <stop offset="0.6" stopColor="#7CBD34" />
          <stop offset="1" stopColor="#5A9026" />
        </linearGradient>
        <linearGradient
          id={bellyId}
          x1="53"
          y1="42"
          x2="87"
          y2="117"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D6F290" />
          <stop offset="1" stopColor="#A6D55A" />
        </linearGradient>
        <linearGradient
          id={hatId}
          x1="46"
          y1="6"
          x2="93"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E8EEE6" />
        </linearGradient>
      </defs>

      <ellipse cx="70" cy="147" rx="29" ry="6" fill={OUTLINE} opacity="0.12" />

      <g transform="rotate(-4 70 80)">
        <path
          d="M55 34C43.2 39.8 36 54.3 36 76C36 104 48.8 125.8 69.5 128.3C90.6 130.9 103.8 109.5 103.8 80.1C103.8 57.4 96.4 41.2 84 34.7C77 31.1 62.7 30.4 55 34Z"
          fill={`url(#${bodyId})`}
          stroke={OUTLINE}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path
          d="M60.7 42C52.1 46.5 46.8 57.1 46.8 73.2C46.8 95.4 56.5 113.1 70.8 114.7C84.3 116.3 93.7 101.7 93.7 80.8C93.7 64.5 88.9 51.7 80.4 43.8C75.9 39.6 66.9 38.7 60.7 42Z"
          fill={`url(#${bellyId})`}
          opacity="0.96"
        />
        <ellipse
          cx="56"
          cy="58"
          rx="9"
          ry="24"
          fill="white"
          opacity="0.12"
          transform="rotate(-12 56 58)"
        />

        <ellipse
          cx="52.2"
          cy="55"
          rx="3.4"
          ry="4.6"
          fill="#6AA53A"
          opacity="0.48"
        />
        <ellipse
          cx="86.2"
          cy="49.5"
          rx="3.2"
          ry="4.3"
          fill="#6AA53A"
          opacity="0.46"
        />
        <ellipse
          cx="49.5"
          cy="75.4"
          rx="4"
          ry="5.3"
          fill="#6AA53A"
          opacity="0.5"
        />
        <ellipse
          cx="89.4"
          cy="74.5"
          rx="3.8"
          ry="5"
          fill="#6AA53A"
          opacity="0.48"
        />
        <ellipse
          cx="55.2"
          cy="100.5"
          rx="3.2"
          ry="4.3"
          fill="#6AA53A"
          opacity="0.44"
        />
        <ellipse
          cx="85.3"
          cy="103.6"
          rx="3.1"
          ry="4.2"
          fill="#6AA53A"
          opacity="0.42"
        />
        <ellipse
          cx="69.3"
          cy="113.2"
          rx="2.8"
          ry="3.8"
          fill="#6AA53A"
          opacity="0.36"
        />

        <Hat hatId={hatId} />
        <Face mood={mood} />
      </g>
    </svg>
  );
}
