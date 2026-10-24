import React from 'react';
import { Product } from '../types/boutique';

interface BoutiquePackShowcaseProps {
  product: Product;
  onInspect: (product: Product) => void;
}

export const CoffeePackShowcase: React.FC<BoutiquePackShowcaseProps> = ({
  product,
  onInspect,
}) => {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Soft shadow beneath the Couture Lookbook Frame */}
      <div
        className="absolute -bottom-6 w-64 sm:w-80 h-12 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(20, 16, 12, 0.28) 0%, rgba(20, 16, 12, 0.08) 55%, transparent 78%)',
        }}
      />

      {/* Haute Couture Limestone, Onyx & Gold Foil Lookbook Presentation Frame */}
      <div
        onClick={() => onInspect(product)}
        className="relative w-[280px] sm:w-[330px] md:w-[350px] transition-transform duration-500 hover:scale-[1.02] cursor-pointer group"
      >
        <div className="relative rounded-sm overflow-hidden border border-[#C8A24A] bg-[#141210] shadow-[0_28px_50px_rgba(18,15,12,0.32)] p-4 sm:p-5">
          {/* Top Gold Foil Atelier Header */}
          <div className="text-center pb-3 mb-3 border-b border-[#D4AF37]/25">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
              Atelier Valois · Haute Couture
            </div>
            <div className="font-serif-luxury italic text-xl sm:text-2xl text-[#FAF5ED] tracking-[0.03em] mt-0.5 leading-snug truncate px-1">
              {product.subtitle || product.frenchTitle || product.name}
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#A89E90] mt-1">
              EDITION {product.serialNumber} · NUMBERED ARCHIVE
            </div>
          </div>

          {/* Center Framed High-Fashion Couture Photograph */}
          <div className="relative aspect-[4/4.5] w-full overflow-hidden border border-[#D4AF37]/40 bg-[#1B1815]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/85 via-transparent to-transparent pointer-events-none" />

            {/* Price & Fabric Overlay inside Frame */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-left">
              <div className="pr-2">
                <div className="text-[9px] uppercase tracking-[0.22em] text-[#D4AF37]">
                  {product.category}
                </div>
                <div className="font-serif-luxury text-base text-[#FAF5ED] leading-tight">
                  {product.name}
                </div>
              </div>
              <div className="font-mono text-xs font-semibold text-[#0D0C0A] bg-[#D4AF37] px-2.5 py-1 tabular-nums shrink-0 rounded-xs shadow-sm">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Bottom Gold Seal & Sizing Trigger */}
          <div className="pt-3 mt-3 border-t border-[#D4AF37]/25 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#B8AEA0]">
            <span>{product.sizes[0]} – {product.sizes[product.sizes.length - 1]}</span>
            <span className="text-[#D4AF37] font-semibold group-hover:underline">
              Inspect Silhouette →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
