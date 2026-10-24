import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Check, Send, PhoneCall, Sparkles } from 'lucide-react';
import { SALONS } from '../../data/boutiqueData';

interface SalonChapterProps {
  onBookSuccess: (salon: string, date: string, time: string, name: string) => void;
}

export const SalonChapter: React.FC<SalonChapterProps> = ({ onBookSuccess }) => {
  const [selectedCity, setSelectedCity] = useState(SALONS[0].city);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-11-12');
  const [selectedTime, setSelectedTime] = useState('14:30 VIP Fitting');
  const [focusArea, setFocusArea] = useState('Capsule Silhouette Fitting');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const currentSalon = SALONS.find((s) => s.city === selectedCity) || SALONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      onBookSuccess(currentSalon.name, selectedDate, selectedTime, clientName);
    }, 700);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center pt-20 pb-20 px-6 lg:px-16 overflow-y-auto lg:overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        {/* Left Column: Salon Selection & Editorial Praise */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            <span className="font-mono text-[11px]">05</span>
            <span aria-hidden="true">·</span>
            <span>Rendez-Vous Exclusif</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#fcf9f5] leading-tight mb-3">
            Le Salon Privé
          </h2>

          <p className="text-sm text-[#a69c8e] leading-relaxed mb-6 font-light">
            Experience an intimate fitting accompanied by our head stylist and private champagne service.
            Select your preferred international salon residence.
          </p>

          {/* Salon City Selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {SALONS.map((salon) => (
              <button
                key={salon.city}
                type="button"
                onClick={() => setSelectedCity(salon.city)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  selectedCity === salon.city
                    ? 'border-[#d4af37] bg-[#1a1714]'
                    : 'border-[#29231c] bg-[#12100f] hover:border-[#42392d]'
                }`}
              >
                <div className="text-xs font-semibold text-[#f5eee6]">{salon.city}</div>
                <div className="text-[11px] text-[#857b6f] truncate">{salon.name}</div>
              </button>
            ))}
          </div>

          {/* Salon Location Details */}
          <div className="p-4 bg-[#141210] border border-[#2b251e] mb-6 text-xs text-[#a3988a]">
            <div className="flex items-start gap-2.5 mb-2">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{currentSalon.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#8a7f72]">
              <PhoneCall className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono">{currentSalon.phone}</span>
              <span aria-hidden="true">·</span>
              <span>{currentSalon.hours}</span>
            </div>
          </div>

          {/* Editorial Press Quote */}
          <div className="border-t border-[#231e18] pt-4 text-xs text-[#877d6f] italic">
            &ldquo;Atelier Valois restores the quiet sovereignty of genuine haute couture.&rdquo;
            <span className="block not-italic text-[11px] uppercase tracking-wider text-[#d4af37] mt-1 font-mono">
              — Vogue Paris Haute Édition
            </span>
          </div>
        </motion.div>

        {/* Right Column: Private Appointment Booking Module */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="bg-[#141210] border border-[#2e271f] p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#262019] pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
                  Private Fitting Request
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f8f4ee]">
                  {currentSalon.name}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#cfc5b6] font-mono bg-black/60 px-3 py-1 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#d4af37]" /> VIP CONCIERGE
              </div>
            </div>

            {isConfirmed ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#1b4332] text-[#74c69d] flex items-center justify-center mx-auto mb-4 border border-[#2d6a4f]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-2xl text-[#fcf9f5] mb-2">
                  Rendez-Vous Confirmed
                </h4>
                <p className="text-xs text-[#a69c8f] max-w-md mx-auto mb-6">
                  Thank you, {clientName}. Your dedicated private stylist has reserved {selectedTime} on {selectedDate} at {currentSalon.name}.
                  A bespoke dossier and concierge confirmation has been dispatched to {clientEmail}.
                </p>
                <button
                  onClick={() => setIsConfirmed(false)}
                  className="px-6 py-2.5 bg-[#241f19] hover:bg-[#332c23] border border-[#3d3428] text-xs uppercase tracking-[0.15em] text-[#d9cfc1] cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-[#918678] mb-1.5">
                      Client Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#0c0b0a] border border-[#2d2720] focus:border-[#d4af37] px-3.5 py-2.5 text-xs text-[#f3ede6] placeholder:text-[#524a3e] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-[#918678] mb-1.5">
                      Private Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@residence.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#0c0b0a] border border-[#2d2720] focus:border-[#d4af37] px-3.5 py-2.5 text-xs text-[#f3ede6] placeholder:text-[#524a3e] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-[#918678] mb-1.5">
                      Requested Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-[#0c0b0a] border border-[#2d2720] focus:border-[#d4af37] px-3.5 py-2.5 text-xs text-[#f3ede6] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-[#918678] mb-1.5">
                      Private Fitting Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#0c0b0a] border border-[#2d2720] focus:border-[#d4af37] px-3.5 py-2.5 text-xs text-[#f3ede6] outline-none transition-colors cursor-pointer"
                    >
                      <option value="11:00 Morning Fitting">11:00 AM — Morning Fitting</option>
                      <option value="14:30 VIP Fitting">2:30 PM — VIP Salon Consultation</option>
                      <option value="16:45 Afternoon Fitting">4:45 PM — Afternoon Wardrobe Preview</option>
                      <option value="18:30 Champagne Soirée Fitting">6:30 PM — Private Champagne Salon</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#918678] mb-1.5">
                    Styling Focus
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Capsule Silhouette Fitting',
                      'Eveningwear Bespoke',
                      'Private Leather Monogramming',
                    ].map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setFocusArea(area)}
                        className={`p-2 text-center text-[11px] transition-all cursor-pointer border ${
                          focusArea === area
                            ? 'bg-[#26201a] border-[#d4af37] text-[#f7f2eb]'
                            : 'bg-[#0c0b0a] border-[#29231c] text-[#8c8273] hover:text-[#d4af37]'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#d4af37] hover:bg-[#bfa02e] text-[#0c0b0a] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Reserving Private Salon...' : 'Request Private Appointment'}</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-[#6e6557]">
                  No charge for private fitting sessions. Discretion and NDA guaranteed upon entry.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
