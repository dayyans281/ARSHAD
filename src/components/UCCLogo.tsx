import React, { useState } from 'react';

interface UCCLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  withGlow?: boolean;
  withRing?: boolean;
  rounded?: string;
}

export function UCCLogo({
  size = 'md',
  className = '',
  withGlow = false,
  withRing = true,
  rounded = 'rounded-xl',
}: UCCLogoProps) {
  const [imgError, setImgError] = useState(false);

  // Size mappings
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
    '2xl': 'w-28 h-28 sm:w-32 sm:h-32',
  }[size];

  const ringClasses = withRing
    ? 'p-0.5 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-lg'
    : '';

  const glowClasses = withGlow
    ? 'shadow-[0_0_20px_rgba(212,175,55,0.4)]'
    : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden ${sizeClasses} ${rounded} ${ringClasses} ${glowClasses} ${className}`}
      id="ucc-official-logo"
    >
      {!imgError ? (
        <img
          src="/assets/ucc_logo.jpg"
          alt="Unique Commerce Centre Official Logo"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover ${rounded}`}
        />
      ) : (
        /* Vector SVG Fallback reproducing the exact emblem */
        <svg
          viewBox="0 0 120 120"
          className={`w-full h-full ${rounded}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Navy Background Squircle */}
          <rect width="120" height="120" rx="26" fill="#0A1835" />
          
          {/* Castle / Fortress Emblem in Center */}
          <path
            d="M44 56.5 L60 48.5 L76 56.5 V80 H44 V56.5 Z"
            fill="#2563EB"
          />
          {/* Castle Battlements */}
          <rect x="44" y="52" width="6" height="7" rx="1" fill="#2563EB" />
          <rect x="57" y="50" width="6" height="7" rx="1" fill="#2563EB" />
          <rect x="70" y="52" width="6" height="7" rx="1" fill="#2563EB" />
          
          {/* White Stylized C-Loop Monogram */}
          <path
            d="M 75 42
               C 66 31, 40 32, 28 44
               C 16 57, 16 77, 28 90
               C 40 101, 65 101, 78 101
               L 92 101
               L 92 85
               L 78 85
               C 67 85, 48 85, 39 77
               C 31 69, 31 57, 39 49
               C 47 41, 65 41, 75 48
               Z"
            fill="#FFFFFF"
          />

          {/* Top Notch Circular Terminal */}
          <circle cx="77" cy="42" r="7" fill="#FFFFFF" />
          <circle cx="77" cy="42" r="3.5" fill="#0A1835" />

          {/* Golden Forward/Upward Arrow */}
          <path
            d="M78 30 L99 23 L92 44 L87 37 L74 45 L71 39 L84 32 Z"
            fill="#C99432"
          />
          <polygon points="99,23 78,31 88,38" fill="#D4AF37" />
        </svg>
      )}
    </div>
  );
}
