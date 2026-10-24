import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Shield, Truck, CreditCard, Lock, Sparkles, Download } from 'lucide-react';
import { CartItem } from '../types/boutique';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  includeGiftBox: boolean;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  includeGiftBox,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [fullName, setFullName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@couture.com');
  const [address, setAddress] = useState('45 Mayfair Avenue');
  const [city, setCity] = useState('London');
  const [postalCode, setPostalCode] = useState('W1K 6ZF');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('+44 20 7946 0912');
  const [paymentMethod, setPaymentMethod] = useState<'concierge_wire' | 'card' | 'client_account'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderNum = `AV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setIsProcessing(false);
      setOrderNumber(generatedOrderNum);
      setStep('confirmation');
      onOrderCompleted();
    }, 1000);
  };

  const handleReset = () => {
    setStep('details');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#141210] border border-[#312b23] p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 text-[#857a6e] hover:text-white transition-colors cursor-pointer"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            {/* Header */}
            <div className="border-b border-[#252019] pb-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
                Private Order Finalization
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#fbf7f2]">
                White-Glove Courier Delivery
              </h3>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Client Contact Info */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#ab9f90] mb-3 font-semibold">
                  1. Recipient Dossier
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#807669] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0c0b0a] border border-[#2d261e] focus:border-[#d4af37] px-3 py-2 text-xs text-[#f3ece4] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#807669] mb-1">Email for Atelier Tracking</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0c0b0a] border border-[#2d261e] focus:border-[#d4af37] px-3 py-2 text-xs text-[#f3ece4] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#ab9f90] mb-3 font-semibold">
                  2. Destination Address
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#807669] mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0c0b0a] border border-[#2d261e] focus:border-[#d4af37] px-3 py-2 text-xs text-[#f3ece4] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#807669] mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#0c0b0a] border border-[#2d261e] focus:border-[#d4af37] px-3 py-2 text-xs text-[#f3ece4] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#807669] mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-[#0c0b0a] border border-[#2d261e] focus:border-[#d4af37] px-3 py-2 text-xs text-[#f3ece4] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#807669] mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#0c0b0a] border border-[#2d261e] focus:border-[#d4af37] px-3 py-2 text-xs text-[#f3ece4] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#ab9f90] mb-3 font-semibold">
                  3. Settlement Mode
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Encrypted Card', icon: CreditCard },
                    { id: 'concierge_wire', label: 'Private Wire', icon: Lock },
                    { id: 'client_account', label: 'VIP Account', icon: Sparkles },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 text-left border flex flex-col gap-1.5 transition-colors cursor-pointer ${
                          paymentMethod === m.id
                            ? 'bg-[#221c17] border-[#d4af37] text-white'
                            : 'bg-[#0c0b0a] border-[#29221b] text-[#8c8172]'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-xs font-medium">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="p-4 bg-[#0c0b0a] border border-[#262019] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8c8273]">
                  <span>{cartItems.length} Piece(s) Selected</span>
                  <span className="font-mono text-[#f0eae1] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                {includeGiftBox && (
                  <div className="flex items-center justify-between text-xs text-[#8c8273]">
                    <span>Cedarwood Presentation Packaging</span>
                    <span className="text-[#d4af37]">Complimentary</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-semibold text-[#fbf7f2] pt-2 border-t border-[#201b16]">
                  <span>Total Due</span>
                  <span className="font-mono text-[#d4af37] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#d4af37] hover:bg-[#bfa02e] text-[#0c0b0a] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isProcessing
                    ? 'Securing Serial Allocation...'
                    : `Confirm Acquisition · ₹${total.toLocaleString('en-IN')}`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6e6456]">
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Private 256-Bit SSL Encrypted Checkout · Discretion Guaranteed</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt View */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#1b4332] text-[#74c69d] flex items-center justify-center mx-auto mb-4 border border-[#2d6a4f]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-[0.2em] block mb-1">
              Order {orderNumber}
            </span>

            <h3 className="font-serif-luxury text-3xl text-[#fcf9f5] mb-2">
              Acquisition Confirmed
            </h3>

            <p className="text-xs text-[#a69c8f] max-w-md mx-auto mb-6">
              Thank you, {fullName}. Your garment has been earmarked in our Parisian
              atelier archives. You will receive an encrypted concierge tracking transmission at {email}.
            </p>

            {/* Receipt Summary Card */}
            <div className="p-5 bg-[#0c0b0a] border border-[#2b251e] text-left max-w-md mx-auto mb-6 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-[#211d18] pb-2 text-[#7d7366]">
                <span>Valuation Total:</span>
                <span className="text-[#f5efe7]">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-[#211d18] pb-2 text-[#7d7366]">
                <span>Destination:</span>
                <span className="text-[#f5efe7]">{city}, {country}</span>
              </div>
              <div className="flex justify-between border-b border-[#211d18] pb-2 text-[#7d7366]">
                <span>Packaging:</span>
                <span className="text-[#d4af37]">Atelier Cedar Presentation Box</span>
              </div>
              <div className="flex justify-between text-[#7d7366]">
                <span>Estimated Arrival:</span>
                <span className="text-[#f5efe7]">Within 48h via Armored Courier</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#d4af37] hover:bg-[#bfa02e] text-[#0c0b0a] text-xs uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer"
              >
                Return to Lookbook
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
