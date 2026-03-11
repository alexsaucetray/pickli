type MascotMood = 'happy' | 'neutral' | 'worried' | 'sad';

interface Props {
  mood?: MascotMood;
  className?: string;
  size?: number;
}

export default function PickleMascot({ mood = 'happy', className = '', size = 120 }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 130 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="65" cy="146" rx="28" ry="4" fill="#2D5016" opacity="0.08" />

      {/* Body — organic pickle shape */}
      <path
        d="M35 32C27 42 22 58 24 78C26 94 36 108 65 108C94 108 104 94 106 78C108 58 103 42 95 32C90 26 78 22 65 22C52 22 40 26 35 32Z"
        fill="#7CB518"
      />
      <path
        d="M35 32C27 42 22 58 24 78C26 94 36 108 65 108C94 108 104 94 106 78C108 58 103 42 95 32C90 26 78 22 65 22C52 22 40 26 35 32Z"
        stroke="#4A7C1A"
        strokeWidth="2"
      />

      {/* Inner gradient highlight */}
      <path
        d="M40 38C34 46 30 60 32 76C33 88 40 98 65 98C90 98 97 88 98 76C100 60 96 46 90 38"
        fill="#8DC63F"
        opacity="0.3"
      />

      {/* Shine streak */}
      <ellipse cx="45" cy="55" rx="8" ry="20" fill="white" opacity="0.15" transform="rotate(-10 45 55)" />

      {/* Bumps — scattered organically */}
      <circle cx="32" cy="48" r="3.5" fill="#4A7C1A" opacity="0.13" />
      <circle cx="96" cy="60" r="4" fill="#4A7C1A" opacity="0.1" />
      <circle cx="34" cy="85" r="3" fill="#4A7C1A" opacity="0.1" />
      <circle cx="92" cy="90" r="3.5" fill="#4A7C1A" opacity="0.12" />
      <circle cx="42" cy="100" r="2.5" fill="#4A7C1A" opacity="0.08" />
      <circle cx="82" cy="44" r="2.5" fill="#4A7C1A" opacity="0.1" />

      {/* Leaves — two at the top */}
      <path
        d="M65 22C65 22 52 6 62 2C70 4 65 22 65 22Z"
        fill="#6bc46b"
        stroke="#4A7C1A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line x1="63" y1="5" x2="64" y2="18" stroke="#4A7C1A" strokeWidth="0.6" opacity="0.4" />
      <path
        d="M68 22C68 22 82 10 76 4C70 7 68 22 68 22Z"
        fill="#8DC63F"
        stroke="#4A7C1A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Left arm */}
      {mood === 'happy' ? (
        // Waving!
        <>
          <path d="M24 68C16 62 10 52 8 46" stroke="#4A7C1A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="7" cy="44" r="3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="1.2" />
        </>
      ) : mood === 'sad' || mood === 'worried' ? (
        // Droopy
        <>
          <path d="M24 72C16 76 12 84 14 90" stroke="#4A7C1A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="14.5" cy="92" r="3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="1.2" />
        </>
      ) : (
        // Neutral — hands on hips
        <>
          <path d="M24 72C16 70 10 72 8 76" stroke="#4A7C1A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="7" cy="78" r="3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="1.2" />
        </>
      )}

      {/* Right arm */}
      {mood === 'happy' ? (
        // Thumbs-up energy
        <>
          <path d="M106 68C114 64 118 56 116 50" stroke="#4A7C1A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="116" cy="48" r="3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="1.2" />
        </>
      ) : mood === 'sad' || mood === 'worried' ? (
        <>
          <path d="M106 72C114 76 118 84 116 90" stroke="#4A7C1A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="116.5" cy="92" r="3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="1.2" />
        </>
      ) : (
        <>
          <path d="M106 72C114 70 120 72 122 76" stroke="#4A7C1A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="123" cy="78" r="3" fill="#7CB518" stroke="#4A7C1A" strokeWidth="1.2" />
        </>
      )}

      {/* Blush */}
      {(mood === 'happy' || mood === 'neutral') && (
        <>
          <ellipse cx="42" cy="76" rx="7" ry="4" fill="#E85D4A" opacity="0.15" />
          <ellipse cx="88" cy="76" rx="7" ry="4" fill="#E85D4A" opacity="0.15" />
        </>
      )}

      {/* Eyes */}
      {mood === 'sad' || mood === 'worried' ? (
        // Squint
        <>
          <path d="M47 66C50 62 58 62 61 66" stroke="#1A2E1A" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M69 66C72 62 80 62 83 66" stroke="#1A2E1A" strokeWidth="2.8" strokeLinecap="round" />
        </>
      ) : (
        // Big cute eyes
        <>
          <ellipse cx="52" cy="62" rx="7" ry="8" fill="white" />
          <ellipse cx="78" cy="62" rx="7" ry="8" fill="white" />
          <ellipse cx="53" cy="63" rx="4.5" ry="5.5" fill="#1A2E1A" />
          <ellipse cx="79" cy="63" rx="4.5" ry="5.5" fill="#1A2E1A" />
          <circle cx="55" cy="60" r="2" fill="white" />
          <circle cx="81" cy="60" r="2" fill="white" />
          {/* Tiny lower catchlight */}
          <circle cx="52" cy="66" r="1" fill="white" opacity="0.5" />
          <circle cx="78" cy="66" r="1" fill="white" opacity="0.5" />
        </>
      )}

      {/* Eyebrows */}
      {mood === 'worried' && (
        <>
          <path d="M46 56L60 52" stroke="#1A2E1A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M84 56L70 52" stroke="#1A2E1A" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {mood === 'happy' && (
        <>
          <path d="M46 54C48 52 56 52 58 54" stroke="#1A2E1A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <path d="M72 54C74 52 82 52 84 54" stroke="#1A2E1A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </>
      )}

      {/* Mouth */}
      {mood === 'happy' && (
        <>
          <path d="M50 80C56 90 74 90 80 80" stroke="#1A2E1A" strokeWidth="2.8" strokeLinecap="round" />
          {/* Tongue! */}
          <ellipse cx="65" cy="86" rx="5" ry="3" fill="#E85D4A" opacity="0.6" />
        </>
      )}
      {mood === 'neutral' && (
        <path d="M52 82C58 86 72 86 78 82" stroke="#1A2E1A" strokeWidth="2.4" strokeLinecap="round" />
      )}
      {mood === 'worried' && (
        <path d="M52 86C58 80 72 80 78 86" stroke="#1A2E1A" strokeWidth="2.4" strokeLinecap="round" />
      )}
      {mood === 'sad' && (
        <>
          <path d="M50 88C56 80 74 80 80 88" stroke="#1A2E1A" strokeWidth="2.8" strokeLinecap="round" />
          {/* Tear drop */}
          <path d="M86 68C86 68 88 72 86 74C84 72 86 68 86 68Z" fill="#7CB518" opacity="0.5" />
        </>
      )}
    </svg>
  );
}
