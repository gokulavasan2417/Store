import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  Ruler,
} from 'lucide-react';
import { Product } from '../types/boutique';

interface ProductQuickViewModalProps {
  product: Product | null;
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  products,
  onClose,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);
  const [slideDir, setSlideDir] = useState<number>(1);

  // Sync state whenever active product changes
  useEffect(() => {
    setSelectedSize(product.sizes[0]);
  }, [product.id]);

  const currentIndex = products.findIndex((p) => p.id === product.id);
  const totalProducts = products.length;

  const handlePrevProduct = () => {
    setSlideDir(-1);
    const prevIdx = (currentIndex - 1 + totalProducts) % totalProducts;
    onSelectProduct(products[prevIdx]);
  };

  const handleNextProduct = () => {
    setSlideDir(1);
    const nextIdx = (currentIndex + 1) % totalProducts;
    onSelectProduct(products[nextIdx]);
  };

  // Keyboard navigation within the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextProduct();
      } else if (e.key === 'ArrowLeft') {
        handlePrevProduct();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalProducts]);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, '');
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Outer Floating Prev Button */}
      <button
        onClick={handlePrevProduct}
        aria-label="View previous silhouette"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#181512]/90 hover:bg-[#D4AF37] hover:text-[#0C0B0A] border border-[#D4AF37]/50 text-[#D4AF37] items-center justify-center cursor-pointer transition-all shadow-2xl hover:scale-110 active:scale-95 group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Outer Floating Next Button */}
      <button
        onClick={handleNextProduct}
        aria-label="View next silhouette"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#181512]/90 hover:bg-[#D4AF37] hover:text-[#0C0B0A] border border-[#D4AF37]/50 text-[#D4AF37] items-center justify-center cursor-pointer transition-all shadow-2xl hover:scale-110 active:scale-95 group"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-[#141210] border border-[#302920] shadow-2xl relative my-auto max-h-[94vh] overflow-y-auto rounded-xs"
      >
        {/* Top Control Bar with Slide Counter and Close */}
        <div className="sticky top-0 z-30 bg-[#141210]/95 backdrop-blur-md px-6 py-3 border-b border-[#252019] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              Piece 0{currentIndex + 1} / 0{totalProducts}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevProduct}
                aria-label="Previous product"
                className="p-1 rounded-sm text-[#A89E90] hover:text-[#D4AF37] hover:bg-[#201C18] cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextProduct}
                aria-label="Next product"
                className="p-1 rounded-sm text-[#A89E90] hover:text-[#D4AF37] hover:bg-[#201C18] cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-[#7D7366] hidden sm:inline">
              (Use ← → to slide silhouettes)
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[#8A7F71] hover:text-white p-1.5 transition-colors cursor-pointer rounded-full hover:bg-white/5"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slidable Content Body */}
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={product.id}
            custom={slideDir}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 80 : -80,
                opacity: 0,
              }),
              center: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.28, ease: 'easeOut' },
              },
              exit: (dir: number) => ({
                x: dir > 0 ? -80 : 80,
                opacity: 0,
                transition: { duration: 0.2, ease: 'easeIn' },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8"
          >
            {/* Left: Product Image (Original, Clean Haute Couture Photography) */}
            <div className="md:col-span-6 relative aspect-[3/4] bg-[#1A1715] overflow-hidden border border-[#2B251E] group">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Serial Badge */}
              <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[11px] font-mono text-[#D4AF37] border border-white/10 backdrop-blur-sm">
                SERIAL: {product.serialNumber}
              </div>

              {/* Origin Badge */}
              <div className="absolute bottom-3 left-3 text-[11px] text-[#CFC5B6] bg-black/70 px-2.5 py-1 backdrop-blur-sm border border-white/5">
                {product.origin}
              </div>
            </div>

            {/* Right: Details & Purchase Options */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Couture Capsule</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#FCF9F5] leading-tight">
                  {product.name}
                </h3>
                <p className="font-serif-luxury italic text-base text-[#B0A494] mb-3">
                  {product.subtitle || product.frenchTitle}
                </p>

                {/* Price */}
                <div className="text-xl font-mono text-[#F5EFE7] tabular-nums mb-4 pb-4 border-b border-[#252019] flex items-center justify-between">
                  <span>₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A89E90]">
                    Numbered Atelier Edition
                  </span>
                </div>

                <p className="text-xs text-[#A69C8F] leading-relaxed mb-6 font-light">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mb-6">
                  <span className="block text-[11px] uppercase tracking-[0.15em] text-[#8E8374] mb-2">
                    Atelier Sizing: <span className="text-[#F5EFE7] font-medium">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-mono border cursor-pointer transition-colors ${
                          selectedSize === s
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                            : 'bg-[#181614] text-[#CFC5B6] border-[#2E271F] hover:border-[#524738]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5 pt-3 border-t border-[#231E18] mb-6">
                  {product.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-[#8F8577]">
                      <span className="text-[#D4AF37] mt-0.5">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Bag CTA */}
              <div>
                <button
                  onClick={handleAdd}
                  className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isAdded
                      ? 'bg-[#1B4332] text-[#D8F3DC]'
                      : 'bg-[#D4AF37] hover:bg-[#BFA02E] text-[#0C0B0A]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Allocated to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ₹{product.price.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
