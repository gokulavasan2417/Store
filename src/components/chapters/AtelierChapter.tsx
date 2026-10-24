import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const AtelierChapter: React.FC = () => {
  const [activePin, setActivePin] = useState<number>(0);

  const CRAFT_HOTSPOTS = [
    {
      id: 0,
      x: '52%',
      y: '58%',
      title: 'Hand-Waxed Saddle Stitching',
      subtitle: '7 stitches per inch using French linen cord',
      description: 'Every seam is set by hand using historic saddlery techniques. The double-needle thread lock guarantees resilience that outlasts modern machine lock-stitching by decades.',
    },
    {
      id: 1,
      x: '32%',
      y: '72%',
      title: 'Full Floating Horsehair Canvas',
      subtitle: 'Living interior architecture',
      description: 'Unlike fast-fashion bonded fusibles, our overcoats use un-glued natural horsehair chest canvasing that gradually contours and breathes with the wearer’s body heat.',
    },
    {
      id: 2,
      x: '75%',
      y: '30%',
      title: 'Artisanal Silk Spools from Lyon',
      subtitle: 'Certified vegetable & water-dyed fibers',
      description: 'We exclusively utilize heritage buttonhole silk thread spun in Lyon since 1892, finished with beeswax for effortless gliding through dense cashmere.',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center pt-20 pb-16 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Craftsmanship Image with Interactive Hotspots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-[#161412] border border-[#302921] shadow-2xl">
            <img
              src="/src/assets/images/boutique_atelier_craft_1792767542824.jpg"
              alt="Artisan tailoring at Maison Valois Paris Atelier"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Pins */}
            {CRAFT_HOTSPOTS.map((pin) => {
              const isSelected = activePin === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  style={{ top: pin.y, left: pin.x }}
                  aria-label={`Inspect ${pin.title}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer p-2 focus:outline-none"
                >
                  <span
                    className={`block w-5 h-5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#d4af37] ring-8 ring-[#d4af37]/30 scale-125'
                        : 'bg-white/90 hover:bg-[#d4af37] ring-4 ring-black/40'
                    }`}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono tracking-wider bg-black/80 px-2 py-0.5 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                    Point 0{pin.id + 1}
                  </span>
                </button>
              );
            })}

            {/* Bottom Atelier Info Pill */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#cfc5b6]">
              <span className="flex items-center gap-1.5 font-mono text-[11px] bg-black/70 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Rue Saint-Honoré, Paris Ier
              </span>
              <span className="text-[11px] text-[#9c9183] hidden sm:inline">
                Click hotspots to reveal craft secrets
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative & Detailed Hotspot Card */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            <span className="font-mono text-[11px]">04</span>
            <span aria-hidden="true">·</span>
            <span>Le Savoir-Faire Artisanal</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#fcf9f5] leading-tight mb-4">
            Hands That Sculpt Time
          </h2>

          <p className="text-sm text-[#a89e91] leading-relaxed mb-6 font-light">
            In an era of disposable manufacturing, our atelier preserves centuries-old
            sartorial disciplines. Every lapel roll, interior gusset, and silk lining
            is sculpted by hand by our Parisian compagnons.
          </p>

          {/* Active Hotspot Inspector Card */}
          <div className="p-5 bg-[#141210] border border-[#2f281f] relative mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider">
                Craft Focus 0{CRAFT_HOTSPOTS[activePin].id + 1} / 03
              </span>
              <div className="flex gap-1.5">
                {CRAFT_HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActivePin(h.id)}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      activePin === h.id ? 'bg-[#d4af37]' : 'bg-[#383127]'
                    }`}
                    aria-label={`Inspect detail ${h.id + 1}`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-base font-semibold text-[#f8f4ed] mb-1">
              {CRAFT_HOTSPOTS[activePin].title}
            </h3>
            <p className="font-serif-luxury italic text-xs text-[#b8aa98] mb-3">
              {CRAFT_HOTSPOTS[activePin].subtitle}
            </p>
            <p className="text-xs text-[#a09587] leading-relaxed">
              {CRAFT_HOTSPOTS[activePin].description}
            </p>
          </div>

          {/* Quantitative Atelier Proof */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#231e18] text-center">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-light text-[#f5efe7] tabular-nums">
                48h
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#7a7165] mt-0.5">
                Hand-Draped
              </div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-light text-[#d4af37] tabular-nums">
                50
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#7a7165] mt-0.5">
                Numbered Serials
              </div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-light text-[#f5efe7] tabular-nums">
                100%
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#7a7165] mt-0.5">
                Traceable Mills
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
