import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../../types/boutique';

interface PrologueChapterProps {
  onExplore: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProduct: Product;
}

export const PrologueChapter: React.FC<PrologueChapterProps> = ({
  onExplore,
  onOpenQuickView,
  featuredProduct,
}) => {
  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center pt-20 pb-16 px-6 lg:px-16 overflow-hidden">
      {/* Subtle background ambient grain / gradient */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-[#1c1814]/40 via-[#0c0b0a] to-[#0c0b0a] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        {/* Left Column: Brand Statement & Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          {/* Natural human editorial kicker */}
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-5">
            <span className="font-mono text-[11px]">01</span>
            <span aria-hidden="true">·</span>
            <span>Collection Automne — Hiver</span>
            <span aria-hidden="true">·</span>
            <span>Paris</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#fcf9f5] leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
            Architecture of <span className="italic font-normal text-[#e6c679]">Pure Elegance</span>
          </h1>

          <p className="text-sm sm:text-base text-[#a89f92] leading-relaxed max-w-xl mb-8 font-light">
            Conceived in our historic Parisian atelier on Rue Saint-Honoré.
            Architectural silhouettes sculpted from hand-pressed virgin wool,
            rare double-faced cashmere, and fluid mulberry silk. Limited to 50 numbered
            garments per cut.
          </p>

          {/* Action Points */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onExplore}
              className="px-7 py-3.5 bg-[#f5ede3] text-[#0c0b0a] hover:bg-[#e0d6c8] transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer shadow-lg flex items-center gap-2 group"
            >
              <span>Explore The Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenQuickView(featuredProduct)}
              className="px-6 py-3.5 bg-transparent border border-[#3b352b] hover:border-[#665d4e] text-[#d9cfc1] hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.18em] cursor-pointer"
            >
              <span>Inspect Campaign Piece</span>
            </button>
          </div>

          {/* Unboxed Metadata Strip */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#7d7467] pt-6 border-t border-[#231f1a]">
            <span>Serial AV-26</span>
            <span aria-hidden="true">·</span>
            <span>48 Atelier Hours per Garment</span>
            <span aria-hidden="true">·</span>
            <span>White-Glove Courier Worldwide</span>
          </div>
        </motion.div>

        {/* Right Column: High-Fidelity Campaign Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-[#151311] border border-[#2e2922] shadow-2xl group">
            <img
              src="/assets/images/boutique_hero_campaign_1792767540901.jpg"
              alt="Maison Valois Fall/Winter Campaign Model in Sculptural Coat"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Editorial Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Editorial Badge & Info */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
              <div className="bg-[#0c0b0a]/85 backdrop-blur-md p-4 border border-[#332d24] max-w-xs pointer-events-auto">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
                  Campaign Silhouette I
                </span>
                <p className="font-serif-luxury text-lg text-[#f8f4ee] leading-tight">
                  {featuredProduct.frenchTitle}
                </p>
                <p className="text-xs text-[#a0978b] mt-1 font-mono tabular-nums">
                  ${featuredProduct.price.toLocaleString()} USD
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#cfc7bc] font-mono tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>PARIS ATELIER</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Cue */}
      <motion.button
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#827869] hover:text-[#d4af37] transition-colors cursor-pointer focus:outline-none"
      >
        <span>Scroll to continue</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.button>
    </div>
  );
};
