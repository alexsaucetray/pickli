export default function PickleLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Warm background circle for contrast */}
      <circle cx="24" cy="24" r="23" fill="#FFFDF7" stroke="#E8DCC8" strokeWidth="1" />

      {/* Body — organic pickle shape, slightly smaller to fit circle */}
      <path
        d="M17 12C13.5 15.5 11 22 12 29C13 34.5 17 38 24 38C31 38 35 34.5 36 29C37 22 34.5 15.5 31 12C29 10 26.5 9 24 9C21.5 9 19 10 17 12Z"
        fill="#7CB518"
      />
      <path
        d="M17 12C13.5 15.5 11 22 12 29C13 34.5 17 38 24 38C31 38 35 34.5 36 29C37 22 34.5 15.5 31 12C29 10 26.5 9 24 9C21.5 9 19 10 17 12Z"
        stroke="#4A7C1A"
        strokeWidth="1.2"
      />

      {/* Inner highlight */}
      <path
        d="M18.5 15C15.5 18.5 14.5 24 15 30C15.5 33.5 18.5 36 24 36C29.5 36 32.5 33.5 33 30C33.5 24 32.5 18.5 29.5 15"
        fill="#8DC63F"
        opacity="0.3"
      />

      {/* Bumps */}
      <circle cx="15.5" cy="21" r="1.5" fill="#4A7C1A" opacity="0.15" />
      <circle cx="33" cy="24" r="1.8" fill="#4A7C1A" opacity="0.15" />
      <circle cx="16" cy="32" r="1.5" fill="#4A7C1A" opacity="0.12" />
      <circle cx="32" cy="32" r="1.2" fill="#4A7C1A" opacity="0.15" />

      {/* Shine */}
      <ellipse cx="19" cy="22" rx="2.5" ry="6" fill="white" opacity="0.2" transform="rotate(-12 19 22)" />

      {/* Eyes — big and cute */}
      <ellipse cx="20" cy="22" rx="2.8" ry="3.2" fill="white" />
      <ellipse cx="28" cy="22" rx="2.8" ry="3.2" fill="white" />
      <ellipse cx="20.5" cy="22.5" rx="1.8" ry="2.2" fill="#1A2E1A" />
      <ellipse cx="28.5" cy="22.5" rx="1.8" ry="2.2" fill="#1A2E1A" />
      <circle cx="21.2" cy="21.2" r="0.8" fill="white" />
      <circle cx="29.2" cy="21.2" r="0.8" fill="white" />

      {/* Cheeky smile */}
      <path d="M20.5 27C22.5 29.5 25.5 29.5 27.5 27" stroke="#1A2E1A" strokeWidth="1.4" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="16.5" cy="25.5" rx="2.2" ry="1.3" fill="#E85D4A" opacity="0.18" />
      <ellipse cx="31.5" cy="25.5" rx="2.2" ry="1.3" fill="#E85D4A" opacity="0.18" />

      {/* Leaves */}
      <path
        d="M24 9C24 9 20 3.5 23.5 2.5C26 3 24 9 24 9Z"
        fill="#6bc46b"
        stroke="#4A7C1A"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <path
        d="M25.5 9.5C25.5 9.5 30.5 5 28 3C26.5 4 25.5 9.5 25.5 9.5Z"
        fill="#8DC63F"
        stroke="#4A7C1A"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />

      {/* Left arm — waving */}
      <path
        d="M12 25.5C9.5 24 7.5 21 8 19"
        stroke="#4A7C1A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="8" cy="18.5" r="1.3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="0.7" />

      {/* Right arm — on hip */}
      <path
        d="M36 27C38 26.5 39.5 27.5 39.5 29"
        stroke="#4A7C1A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="40" cy="29.5" r="1.3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="0.7" />
    </svg>
  );
}
