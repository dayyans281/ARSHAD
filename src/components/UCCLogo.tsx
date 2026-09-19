import React, { useState } from 'react';

interface UCCLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  withGlow?: boolean;
  withRing?: boolean;
  rounded?: string;
  variant?: 'emblem' | 'full';
}

export function UCCLogo({
  size = 'md',
  className = '',
  withGlow = false,
  withRing = true,
  rounded = 'rounded-xl',
  variant = 'emblem',
}: UCCLogoProps) {
  const [currentSrc, setCurrentSrc] = useState('/assets/ucc_logo.svg');
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (currentSrc === '/assets/ucc_logo.svg') {
      setCurrentSrc('/assets/ucc_logo.jpg');
    } else {
      setImgError(true);
    }
  };

  // Size mappings
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
    '2xl': 'w-28 h-28 sm:w-36 sm:h-36',
  }[size];

  const ringClasses = withRing
    ? 'p-0.5 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-md shadow-amber-500/20'
    : '';

  const glowClasses = withGlow
    ? 'shadow-[0_0_25px_rgba(227,34,25,0.4)]'
    : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden ${sizeClasses} ${rounded} ${ringClasses} ${glowClasses} ${className}`}
      id="ucc-official-logo"
    >
      <div className={`w-full h-full bg-white flex items-center justify-center overflow-hidden ${rounded}`}>
        {!imgError ? (
          <img
            src={currentSrc}
            alt="Unique Commerce Centre Official Logo - Red Mortarboard & Book"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={`w-full h-full object-contain p-0.5 ${rounded}`}
          />
        ) : (
          /* High Precision Vector SVG of the Official Unique Commerce Centre Logo */
          <svg
            viewBox="0 0 120 120"
            className={`w-full h-full p-1`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cap Top Board */}
            <rect x="34" y="1" width="52" height="4" rx="0.5" fill="#F38B1C" />

            {/* Mortarboard Crown / Head */}
            <path
              d="M46 5 H74 V15 C74 24 68 31 60 31 C52 31 46 24 46 15 Z"
              fill="#E32219"
            />
            {/* Cap Band Accent */}
            <rect x="46" y="13" width="28" height="2.5" fill="#F38B1C" />

            {/* Hanging Tassel */}
            <rect x="78" y="5" width="2.5" height="13" fill="#F38B1C" />
            <rect x="77" y="18" width="4.5" height="6.5" rx="0.5" fill="#F38B1C" />

            {/* Neck Pillar */}
            <rect x="58" y="31" width="4" height="3" fill="#F38B1C" />

            {/* Student Shoulders / Silhouette */}
            <path
              d="M60 34 C42 34 31 41 31 50 C31 55 40 62 60 70 C80 62 89 55 89 50 C89 41 78 34 60 34 Z"
              fill="#E32219"
            />

            {/* Radiating Book Pages (Left side) */}
            <line x1="60" y1="70" x2="14" y2="52" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="11" y2="57" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="8" y2="62" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="5" y2="67" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="3" y2="72" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="2" y2="76" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />

            {/* Radiating Book Pages (Right side) */}
            <line x1="60" y1="70" x2="106" y2="52" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="109" y2="57" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="112" y2="62" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="115" y2="67" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="117" y2="72" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="70" x2="118" y2="76" stroke="#E32219" strokeWidth="1.8" strokeLinecap="round" />

            {/* Solid Book Spine Base Bar with Central Notch */}
            <path
              d="M2 79 H118 V86 H64 C64 89 62.5 90 60 90 C57.5 90 56 89 56 86 H2 Z"
              fill="#E32219"
            />

            {/* Text: UNIQUE */}
            <text
              x="60"
              y="104"
              textAnchor="middle"
              fill="#E32219"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="19"
              letterSpacing="0.5"
            >
              UNIQUE
            </text>

            {/* Text: COMMERCE CENTRE */}
            <text
              x="60"
              y="117"
              textAnchor="middle"
              fill="#E32219"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="9"
              letterSpacing="0.8"
            >
              COMMERCE CENTRE
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}
