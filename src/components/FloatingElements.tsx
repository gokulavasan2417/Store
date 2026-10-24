import React from 'react';

interface FloatingElementsProps {
  /** Scroll progress within Section 3 (0 to 1) */
  scrollProgress: number;
}

interface CoutureElementSpec {
  id: number;
  kind: 'shears' | 'flacon' | 'spool' | 'brooch';
  x: string;
  y: string;
  size: number;
  rotate: number;
  speed: number;
  opacity?: number;
  animClass: string;
  delay: string;
  duration: string;
}

const FLOATING_COUTURE_ELEMENTS: CoutureElementSpec[] = [
  // Top arc
  { id: 1, kind: 'shears', x: '12%', y: '12%', size: 48, rotate: -24, speed: -70, animClass: 'animate-float-1', delay: '-0.5s', duration: '6.2s' },
  { id: 2, kind: 'flacon', x: '24%', y: '10%', size: 42, rotate: 18, speed: -50, opacity: 0.88, animClass: 'animate-float-2', delay: '-2.1s', duration: '7.8s' },
  { id: 3, kind: 'brooch', x: '76%', y: '11%', size: 46, rotate: -32, speed: -60, animClass: 'animate-float-3', delay: '-1.4s', duration: '5.5s' },
  { id: 4, kind: 'spool', x: '86%', y: '18%', size: 42, rotate: 45, speed: -45, opacity: 0.9, animClass: 'animate-float-4', delay: '-3.2s', duration: '8.4s' },

  // Mid sides
  { id: 5, kind: 'spool', x: '8%', y: '44%', size: 52, rotate: 22, speed: -80, animClass: 'animate-float-2', delay: '-4.0s', duration: '7.2s' },
  { id: 6, kind: 'brooch', x: '19%', y: '54%', size: 38, rotate: -40, speed: -55, animClass: 'animate-float-1', delay: '-1.8s', duration: '6.0s' },
  { id: 7, kind: 'shears', x: '80%', y: '46%', size: 50, rotate: 16, speed: -75, animClass: 'animate-float-3', delay: '-2.7s', duration: '5.8s' },
  { id: 8, kind: 'flacon', x: '90%', y: '58%', size: 44, rotate: -22, speed: -50, animClass: 'animate-float-4', delay: '-0.9s', duration: '8.0s' },

  // Bottom arc
  { id: 9, kind: 'flacon', x: '11%', y: '78%', size: 48, rotate: -15, speed: -65, animClass: 'animate-float-1', delay: '-3.5s', duration: '6.5s' },
  { id: 10, kind: 'shears', x: '22%', y: '84%', size: 52, rotate: 28, speed: -90, animClass: 'animate-float-2', delay: '-1.2s', duration: '7.4s' },
  { id: 11, kind: 'spool', x: '74%', y: '82%', size: 50, rotate: -26, speed: -85, animClass: 'animate-float-3', delay: '-2.3s', duration: '5.6s' },
  { id: 12, kind: 'brooch', x: '86%', y: '75%', size: 44, rotate: 15, speed: -70, animClass: 'animate-float-4', delay: '-4.6s', duration: '8.2s' },
];

export const FloatingElements: React.FC<FloatingElementsProps> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {FLOATING_COUTURE_ELEMENTS.map((item) => {
        const translateY = (scrollProgress - 0.5) * item.speed;
        const dynamicRotate = item.rotate + (scrollProgress - 0.5) * 25;

        return (
          <div
            key={item.id}
            style={{
              left: item.x,
              top: item.y,
              width: `${item.size}px`,
              height: `${item.size}px`,
              transform: `translate3d(0, ${translateY}px, 0)`,
              opacity: item.opacity ?? 0.9,
              transition: 'transform 120ms linear',
            }}
            className="absolute drop-shadow-[0_12px_22px_rgba(24,20,16,0.18)]"
          >
            {/* Inner Floating Bobbing / Swaying Container */}
            <div
              className={`w-full h-full ${item.animClass} filter transition-all duration-300`}
              style={{
                animationDelay: item.delay,
                animationDuration: item.duration,
                transform: `rotate(${dynamicRotate}deg)`,
              }}
            >
              {item.kind === 'shears' && (
              /* Golden Couture Dressmaker Shears */
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <circle cx="20" cy="46" r="8" fill="none" stroke="#B8892E" strokeWidth="2.5" />
                <circle cx="44" cy="46" r="8" fill="none" stroke="#B8892E" strokeWidth="2.5" />
                <path
                  d="M 26 41 L 46 10 M 38 41 L 18 10"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="32" cy="29" r="2.5" fill="#7A5816" />
              </svg>
            )}

            {item.kind === 'flacon' && (
              /* Crystal & Gold Haute Parfumerie Flacon */
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <rect x="26" y="10" width="12" height="7" rx="1" fill="#D4AF37" />
                <rect x="29" y="17" width="6" height="5" fill="#9E7622" />
                <rect
                  x="16"
                  y="22"
                  width="32"
                  height="32"
                  rx="4"
                  fill="#FBF6EB"
                  stroke="#C89B3C"
                  strokeWidth="2"
                />
                <rect x="22" y="29" width="20" height="18" fill="#E8C87A" opacity="0.55" />
              </svg>
            )}

            {item.kind === 'spool' && (
              /* Spun-Gold Silk Thread Spool */
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <rect x="16" y="12" width="32" height="6" rx="2" fill="#2A231D" stroke="#D4AF37" strokeWidth="1.2" />
                <rect x="16" y="46" width="32" height="6" rx="2" fill="#2A231D" stroke="#D4AF37" strokeWidth="1.2" />
                <rect x="21" y="18" width="22" height="28" fill="#E5C168" />
                <line x1="21" y1="24" x2="43" y2="24" stroke="#B38728" strokeWidth="1.2" />
                <line x1="21" y1="31" x2="43" y2="31" stroke="#B38728" strokeWidth="1.2" />
                <line x1="21" y1="38" x2="43" y2="38" stroke="#B38728" strokeWidth="1.2" />
              </svg>
            )}

            {item.kind === 'brooch' && (
              /* Couture Diamond & Pearl Starburst Brooch */
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <polygon
                  points="32,8 38,26 56,32 38,38 32,56 26,38 8,32 26,26"
                  fill="#E5C168"
                  stroke="#9E7622"
                  strokeWidth="1.5"
                />
                <circle cx="32" cy="32" r="7" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="1.5" />
              </svg>
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
