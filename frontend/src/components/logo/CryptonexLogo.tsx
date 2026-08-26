import React from 'react';

interface CryptonexLogoProps {
  className?: string;
  size?: number;
}

export const CryptonexLogo: React.FC<CryptonexLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform hover:scale-105 duration-300"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#38EF7D" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Glow Hexagon Base */}
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          fill="url(#glowGrad)"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Geometric 'C' Curve */}
        <path
          d="M 68 28 C 55 18, 28 22, 24 45 C 20 68, 45 82, 68 72"
          stroke="url(#logoGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Upward Growth Arrow Vector */}
        <path
          d="M 38 60 L 52 46 L 62 54 L 78 34"
          stroke="#00F2FE"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Arrow Tip */}
        <polygon points="78,34 78,42 70,34" fill="#00F2FE" />

        {/* Intelligence Data Node Point */}
        <circle cx="78" cy="34" r="4" fill="#38EF7D" />
      </svg>
    </div>
  );
};
