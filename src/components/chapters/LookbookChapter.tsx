import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShoppingBag, Info, ShieldCheck, Ruler } from 'lucide-react';
import { Product } from '../../types/boutique';

interface LookbookChapterProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const LookbookChapter: React.FC<LookbookChapterProps> = ({
  product,
  onAddToCart,
  onOpenQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [activeTab, setActiveTab] = useState<'architecture' | 'material' | 'provenance'>('architecture');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center pt-20 pb-16 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        {/* Left Column: Full-Height Editorial Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex justify-center"
        >
          <div className="relative w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#141210] border border-[#2f2921] shadow-2xl group">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Floating Serial & Origin Tag */}
            <div className="absolute top-4 left-4 bg-[#0c0b0a]/80 backdrop-blur-md px-3 py-1.5 border border-[#332c23] text-[11px] font-mono text-[#cfc5b6]">
              {product.serialNumber} · PARIS COUTURE
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#d9cfc1]">
              <span className="font-serif-luxury italic text-sm tracking-wide">
                48 Hand-Draped Hours
              </span>
              <button
                onClick={() => onOpenQuickView(product)}
                className="text-[11px] uppercase tracking-[0.15em] text-[#d4af37] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Inspect High-Res
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contiguous Purchase Module */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          {/* Chapter kicker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            <span className="font-mono text-[11px]">02</span>
            <span aria-hidden="true">·</span>
            <span>La Robe du Soir</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#fcf9f5] leading-tight mb-2">
            {product.name}
          </h2>

          <p className="font-serif-luxury italic text-lg text-[#b8ab99] mb-4">
            {product.frenchTitle}
          </p>

          {/* Pricing with tabular nums */}
          <div className="flex items-baseline gap-4 pb-6 border-b border-[#26221c] mb-6">
            <span className="text-2xl sm:text-3xl font-light text-[#f7f2ea] font-mono tabular-nums">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#8c8273] uppercase tracking-[0.15em]">
              USD · Complimentary Bespoke Packaging
            </span>
          </div>

          {/* Swatch Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-[0.15em] text-[#9c9183]">
                Colorway: <span className="text-[#f0eae1] font-medium">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={`Select ${c.name}`}
                  className={`relative p-1 border cursor-pointer transition-all ${
                    selectedColor === c.name
                      ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'border-[#383127] hover:border-[#695d4d]'
                  }`}
                >
                  <span
                    className="block w-6 h-6 rounded-none"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-[0.15em] text-[#9c9183]">
                Atelier Sizing: <span className="text-[#f0eae1] font-medium">{selectedSize}</span>
              </span>
              <span className="text-[11px] text-[#8c8273] flex items-center gap-1">
                <Ruler className="w-3 h-3 text-[#d4af37]" /> French sizing standards
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2.5 text-xs font-mono tracking-wider transition-all cursor-pointer border ${
                    selectedSize === s
                      ? 'bg-[#d4af37] text-[#0c0b0a] font-semibold border-[#d4af37]'
                      : 'bg-[#161412] text-[#d5cbbd] border-[#312b23] hover:border-[#574d3f]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation for Details */}
          <div className="bg-[#141210] border border-[#2b251e] p-4 mb-8">
            <div className="flex items-center gap-6 border-b border-[#252019] pb-3 mb-3 text-xs uppercase tracking-[0.15em]">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`transition-colors cursor-pointer ${
                  activeTab === 'architecture' ? 'text-[#d4af37] font-semibold' : 'text-[#877e70] hover:text-[#cfc5b6]'
                }`}
              >
                Architecture
              </button>
              <button
                onClick={() => setActiveTab('material')}
                className={`transition-colors cursor-pointer ${
                  activeTab === 'material' ? 'text-[#d4af37] font-semibold' : 'text-[#877e70] hover:text-[#cfc5b6]'
                }`}
              >
                Fabrication
              </button>
              <button
                onClick={() => setActiveTab('provenance')}
                className={`transition-colors cursor-pointer ${
                  activeTab === 'provenance' ? 'text-[#d4af37] font-semibold' : 'text-[#877e70] hover:text-[#cfc5b6]'
                }`}
              >
                Provenance
              </button>
            </div>

            <div className="text-xs text-[#a3998b] leading-relaxed min-h-[56px]">
              {activeTab === 'architecture' && (
                <p>
                  Internal boned corsetry engineered with French bias tape. High asymmetric leg slit
                  balanced by a sculptural off-shoulder neckline and flowing puddle train.
                </p>
              )}
              {activeTab === 'material' && (
                <p>
                  {product.fabric}. Sourced from certified pesticide-free mulberry groves, washed with organic rainwater processing in Lyon.
                </p>
              )}
              {activeTab === 'provenance' && (
                <p>
                  {product.origin}. Each piece bears an embroidered serial number and master tailoress signature under the lining.
                </p>
              )}
            </div>
          </div>

          {/* Add to Bag Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleAdd}
              className={`flex-1 py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                isAdded
                  ? 'bg-[#1b4332] text-[#d8f3dc] border border-[#2d6a4f]'
                  : 'bg-[#d4af37] hover:bg-[#bfa02e] text-[#0c0b0a]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Boutique Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Piece · ${product.price.toLocaleString()}</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenQuickView(product)}
              className="py-4 px-4 bg-[#181614] hover:bg-[#25221d] border border-[#332e26] text-[#c9bfb1] hover:text-white transition-colors cursor-pointer"
              aria-label="Inspect details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
