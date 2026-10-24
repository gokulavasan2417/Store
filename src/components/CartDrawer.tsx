import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Gift } from 'lucide-react';
import { CartItem } from '../types/boutique';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedCheckout: (includeGiftBox: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const [includeGiftBox, setIncludeGiftBox] = useState(true);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#12100f] border-l border-[#2e271f] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#252019] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
                  Your Shopping Bag
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#f8f4ee]">
                  Boutique Shopping Bag
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Shopping Bag"
                className="p-2 text-[#8c8273] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-12 h-12 rounded-full border border-[#2b251e] flex items-center justify-center mb-4 text-[#8a7f71]">
                    <Gift className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <h4 className="font-serif-luxury text-xl text-[#f3ece2] mb-1">
                    Your bag is presently empty
                  </h4>
                  <p className="text-xs text-[#8c8172] max-w-xs mb-6">
                    Explore our Autumn / Winter capsule to reserve serialized atelier pieces.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#231e19] hover:bg-[#312b23] text-xs uppercase tracking-[0.15em] text-[#d9cebf] cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 pb-6 border-b border-[#221d18]"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 shrink-0 bg-[#1a1715] border border-[#2d271f] overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-[#f5efe7] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#696054] hover:text-[#e63946] transition-colors cursor-pointer p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-serif-luxury italic text-xs text-[#9c9082]">
                          {item.product.subtitle || item.product.frenchTitle}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-[#7d7366] mt-1.5 font-mono">
                          <span>Size: {item.selectedSize}</span>
                          {item.selectedColor ? (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{item.selectedColor}</span>
                            </>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#2d261e] bg-[#0c0b0a]">
                          <button
                            onClick={() =>
                              onUpdateQuantity(idx, Math.max(1, item.quantity - 1))
                            }
                            className="p-1.5 text-[#857b6f] hover:text-white cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono tabular-nums text-[#f3ede5]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1.5 text-[#857b6f] hover:text-white cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-mono text-xs font-medium text-[#f5efe7] tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Gift Packaging & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-[#0c0b0a] border-t border-[#262019] space-y-4">
                {/* Gift Wrap Toggle */}
                <label className="flex items-start gap-3 p-3 bg-[#151311] border border-[#26211a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    className="mt-0.5 accent-[#d4af37] cursor-pointer"
                  />
                  <div className="text-[11px]">
                    <span className="font-semibold text-[#f0eae1] block">
                      Complimentary Atelier Cedar Box & Ribbon
                    </span>
                    <span className="text-[#807669]">
                      Enclosed in cedarwood presentation box with wax seal & handwritten dossier.
                    </span>
                  </div>
                </label>

                {/* Subtotal */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#8c8172]">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-[#f0eae1]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#8c8172]">
                    <span>White-Glove Courier Delivery</span>
                    <span className="text-[#d4af37] uppercase text-[10px] tracking-wider">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#f8f4ee] pt-2 border-t border-[#221c17]">
                    <span>Total Valuation</span>
                    <span className="font-mono tabular-nums text-[#d4af37]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => onProceedCheckout(includeGiftBox)}
                  className="w-full py-4 bg-[#d4af37] hover:bg-[#bfa02e] text-[#0c0b0a] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Proceed to Private Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6b6255]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Insured International Courier · Serialized Authentication Dossier</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
