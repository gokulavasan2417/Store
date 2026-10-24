import React from 'react';
import { Sparkles, Scissors, Ruler, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/boutiqueData';

interface RitualVisualizerProps {
  /** Scroll progress from 0 to 1 across the 4 couture steps */
  progress: number;
  className?: string;
}

export const RitualVisualizer: React.FC<RitualVisualizerProps> = ({
  progress,
  className = '',
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Determine which of the 4 fashion stages is active (0, 1, 2, 3)
  const activeStage = Math.min(3, Math.floor(p * 3.99));

  // Map stages to our generated boutique fashion photography
  const stageImages = [
    PRODUCTS[1].image, // Step 1: Architectural Sculpted Wool Trench
    PRODUCTS[2].image, // Step 2: Double-Breasted Cashmere Overcoat
    PRODUCTS[0].image, // Step 3: Sculptural Champagne Silk Gown
    PRODUCTS[3].image, // Step 4: Atelier Calfskin Structured Handbag
  ];

  const stageCaptions = [
    {
      tag: 'STAGE 01 · GEOMETRIC PATTERN DRAFTING',
      label: 'The Sculptural Wool Trench',
      metric: 'BIAS ANGLE 45° · 18 PATTERN PANELS',
    },
    {
      tag: 'STAGE 02 · FLOATING HORSEHAIR CANVAS',
      label: 'The Double-Breasted Overcoat',
      metric: '650G MONGOLIAN CASHMERE · HAND-PAD STITCHED',
    },
    {
      tag: 'STAGE 03 · LIQUID MULBERRY SILK DRAPING',
      label: 'The Champagne Draped Gown',
      metric: '40MM PEACE SILK · 48 ARTISAN HOURS',
    },
    {
      tag: 'STAGE 04 · SERIALIZED HAUTE FINISHING',
      label: 'The Structured Atelier Bag',
      metric: 'BOX CALFSKIN & BRUSHED BRASS HARDWARE',
    },
  ];

  // Smooth rotation/parallax values driven by scroll progress
  const patternDashOffset = (1 - p) * 280;
  const ringRotate = p * 180;

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
    >
      {/* Subtle Champagne Ambient Aura */}
      <div
        className="absolute w-[340px] h-[420px] sm:w-[460px] sm:h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.04) 55%, transparent 75%)',
        }}
      />

      <div className="relative w-full max-w-[520px] aspect-[4/4.6] flex items-center justify-center">
        {/* ============================================================
            1. ROTATING GOLDEN SARTORIAL COMPASS & PATTERN RINGS
           ============================================================ */}
        <svg
          viewBox="0 0 500 560"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        >
          <defs>
            <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D98B" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6D1F" />
            </linearGradient>
          </defs>

          {/* Outer Architectural Measurement Circle */}
          <g
            style={{
              transform: `rotate(${ringRotate}deg)`,
              transformOrigin: '250px 280px',
              transition: 'transform 80ms linear',
            }}
          >
            <circle
              cx="250"
              cy="280"
              r="228"
              fill="none"
              stroke="url(#goldLine)"
              strokeWidth="0.8"
              strokeDasharray="6 10"
              opacity="0.45"
            />
            <circle
              cx="250"
              cy="280"
              r="212"
              fill="none"
              stroke="url(#goldLine)"
              strokeWidth="0.6"
              opacity="0.25"
            />
          </g>

          {/* Animated Couture Tailor Pattern Blueprint Overlay (Draws in with scroll) */}
          <path
            d="M 85 110 L 415 110 L 415 450 L 85 450 Z"
            fill="none"
            stroke="url(#goldLine)"
            strokeWidth="1"
            strokeDasharray="1400"
            strokeDashoffset={patternDashOffset}
            opacity="0.5"
          />

          {/* Corner Sartorial Crosshairs */}
          <g stroke="#E5C77D" strokeWidth="1.2" opacity="0.8">
            <path d="M 75 110 L 95 110 M 85 100 L 85 120" />
            <path d="M 405 110 L 425 110 M 415 100 L 415 120" />
            <path d="M 75 450 L 95 450 M 85 440 L 85 460" />
            <path d="M 405 450 L 425 450 M 415 440 L 415 460" />
          </g>

          {/* Dynamic Golden Dressform Silhouette Wireframe on Right Edge */}
          <g
            transform="translate(385, 135) scale(0.78)"
            opacity={0.65 + Math.sin(p * Math.PI) * 0.3}
          >
            {/* Mannequin Neck & Shoulders */}
            <path
              d="M 38 10 L 38 26 M 24 26 L 52 26 C 68 28, 76 42, 72 68 C 66 95, 58 115, 58 135 C 58 160, 78 195, 86 245 L -10 245 C -2 195, 18 160, 18 135 C 18 115, 10 95, 4 68 C 0 42, 8 28, 24 26 Z"
              fill="rgba(18, 16, 14, 0.75)"
              stroke="#E5C77D"
              strokeWidth="1.8"
            />
            {/* Waistline & Center Corset Axis */}
            <line
              x1="38"
              y1="26"
              x2="38"
              y2="245"
              stroke="#E5C77D"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M 18 135 Q 38 144 58 135"
              fill="none"
              stroke="#FFF2B2"
              strokeWidth="2"
            />
          </g>
        </svg>

        {/* ============================================================
            2. LAYERED HAUTE COUTURE LOOKBOOK PORTRAIT CARDS & PROVENANCE BADGE
           ============================================================ */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-[300px] sm:w-[360px] aspect-[3/3.8] rounded-sm overflow-hidden border border-[#D4AF37]/50 bg-[#141210] shadow-[0_30px_60px_rgba(0,0,0,0.75)]">
            {stageImages.map((imgSrc, idx) => {
              const isCurrent = activeStage === idx;
              return (
                <div
                  key={imgSrc}
                  className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: `scale(${isCurrent ? 1 + (p % 0.25) * 0.18 : 1.08})`,
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={stageCaptions[idx].label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/90 via-transparent to-black/25" />
                </div>
              );
            })}

            {/* Top-Left Atelier Spec Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5C77D] bg-[#0D0C0A]/80 backdrop-blur-md px-3 py-1.5 border border-[#D4AF37]/30">
              <span>{stageCaptions[activeStage].tag}</span>
            </div>

            {/* Bottom Garment Caption & Sartorial Telemetry */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0D0C0A]/85 backdrop-blur-md p-4 border border-[#D4AF37]/35">
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif-luxury italic text-xl text-[#FAF5ED]">
                  {stageCaptions[activeStage].label}
                </span>
                <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 border border-[#D4AF37]/40">
                  0{activeStage + 1} / 04
                </span>
              </div>
              <div className="text-[10px] font-mono tracking-[0.18em] text-[#B8AEA0] uppercase">
                {stageCaptions[activeStage].metric}
              </div>
            </div>
          </div>

          {/* Floating Atelier Badge - Moved to the RIGHT side below the frame so it NEVER hides the backside image or caption */}
          <div
            className="hidden sm:flex items-center gap-2.5 absolute -bottom-5 sm:-bottom-6 right-0 sm:right-2 z-30 bg-[#161412]/95 border border-[#D4AF37]/50 px-4 py-2 shadow-2xl backdrop-blur-md rounded-xs"
            style={{
              transform: `translateY(${-p * 20}px)`,
              transition: 'transform 80ms linear',
            }}
          >
            {activeStage === 0 && <Ruler className="w-4 h-4 text-[#D4AF37]" />}
            {activeStage === 1 && <Scissors className="w-4 h-4 text-[#D4AF37]" />}
            {activeStage === 2 && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
            {activeStage === 3 && <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />}
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#9E9488]">
                Master Atelier Standard
              </div>
              <div className="text-xs font-serif-luxury text-[#FAF5ED] whitespace-nowrap">
                {activeStage === 0 && 'Bespoke Anatomical Cut'}
                {activeStage === 1 && 'Hand-Rolled Lapel Architecture'}
                {activeStage === 2 && '7 Saddle-Stitches Per Inch'}
                {activeStage === 3 && 'Numbered Edition of 50'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
