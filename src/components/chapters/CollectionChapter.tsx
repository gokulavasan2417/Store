import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types/boutique';

interface CollectionChapterProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const CollectionChapter: React.FC<CollectionChapterProps> = ({
  products,
  onAddToCart,
  onOpenQuickView,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts =
    filter === 'all'
      ? products
      : products.filter((p) => p.category === filter);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.sizes[0], product.colors[0].name);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col justify-center pt-24 pb-20 px-6 lg:px-16 overflow-y-auto lg:overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Strip with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#25211b] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-2">
              <span className="font-mono text-[11px]">03</span>
              <span aria-hidden="true">·</span>
              <span>La Collection Permanente</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#fcf9f5]">
              Le Vestiaire Virtuose
            </h2>
          </div>

          {/* Interactive filter controls - segmented tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141210] border border-[#2b251e] self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Silhouettes' },
              { id: 'outerwear', label: 'Outerwear' },
              { id: 'eveningwear', label: 'Eveningwear' },
              { id: 'tailoring', label: 'Tailoring' },
              { id: 'leather', label: 'Leather' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#29241e] text-[#f7f2ea] shadow-sm font-medium'
                    : 'text-[#877f72] hover:text-[#cfc6b8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod, idx) => {
            const isAdded = addedId === prod.id;
            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col bg-[#141210] border border-[#26211b] hover:border-[#42392e] transition-all duration-300"
              >
                {/* Product Image Slot */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1715]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Serial Number Kicker */}
                  <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest bg-black/75 px-2 py-0.5 text-[#cfc5b6] border border-white/10">
                    {prod.serialNumber}
                  </div>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onOpenQuickView(prod)}
                      className="flex-1 py-2.5 px-3 bg-[#0c0b0a]/90 hover:bg-black text-[#f0eae1] text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 backdrop-blur-sm border border-[#383126] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Inspect</span>
                    </button>
                    <button
                      onClick={() => handleQuickAdd(prod)}
                      className={`p-2.5 text-[11px] uppercase tracking-[0.15em] flex items-center justify-center backdrop-blur-sm border transition-colors cursor-pointer ${
                        isAdded
                          ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                          : 'bg-[#d4af37] hover:bg-[#bfa02e] text-[#0c0b0a] border-[#d4af37]'
                      }`}
                      aria-label={`Add ${prod.name} to bag`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] text-[#857b6f] uppercase tracking-[0.15em] mb-1">
                      {prod.category}
                    </div>
                    <h3 className="text-sm font-semibold text-[#f5efe8] group-hover:text-[#d4af37] transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="font-serif-luxury italic text-xs text-[#a39788] mb-3">
                      {prod.frenchTitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#231e18] flex items-center justify-between">
                    <span className="font-mono text-sm text-[#f0eae1] tabular-nums font-medium">
                      ${prod.price.toLocaleString()} USD
                    </span>
                    <button
                      onClick={() => onOpenQuickView(prod)}
                      className="text-[11px] text-[#8e8476] group-hover:text-[#f0eae1] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
