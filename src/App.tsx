/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  ShoppingBag,
  ArrowUp,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { RitualVisualizer } from './components/RitualVisualizer';
import { FloatingElements } from './components/FloatingElements';
import { CoffeePackShowcase } from './components/CoffeePackShowcase';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { PRODUCTS } from './data/boutiqueData';
import { CartItem, Product } from './types/boutique';

interface CraftStepInfo {
  step: number;
  title: string;
  italicPart?: string;
  description: string;
}

const CRAFT_STEPS: CraftStepInfo[] = [
  {
    step: 1,
    title: 'First, the',
    italicPart: 'architectural cut.',
    description:
      'Every silhouette begins on our Parisian pattern tables. Eighteen geometric panels of virgin wool and cashmere are drafted by hand along a 45-degree bias grain.',
  },
  {
    step: 2,
    title: 'Sculpted on',
    italicPart: 'horsehair canvas.',
    description:
      'A full floating natural horsehair chest canvas is pad-stitched beneath the lapel, allowing the overcoat to contour organically to its wearer over decades.',
  },
  {
    step: 3,
    title: 'Draped in',
    italicPart: 'liquid mulberry silk.',
    description:
      'Forty-millimeter champagne silk charmeuse is hand-pleated directly onto the wooden atelier mannequin—requiring 48 hours of uninterrupted draping per gown.',
  },
  {
    step: 4,
    title: 'Numbered,',
    italicPart: 'and then timeless.',
    description:
      'Finished with hand-buffed horn closures, brushed brass clasps, and an embroidered edition serial limited to 50 pieces worldwide.',
  },
];

export default function App() {
  // Section refs for smooth scroll measurement
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const ritualSectionRef = useRef<HTMLElement | null>(null);
  const packSectionRef = useRef<HTMLElement | null>(null);
  const estateSectionRef = useRef<HTMLElement | null>(null);

  // Normalized scroll progress (0..1) per section
  const [heroProgress, setHeroProgress] = useState(0);
  const [ritualProgress, setRitualProgress] = useState(0);
  const [packProgress, setPackProgress] = useState(0);
  const [estateProgress, setEstateProgress] = useState(0);
  const [activeNav, setActiveNav] = useState<'hero' | 'ritual' | 'pack' | 'estate'>('hero');
  const [isLightHeader, setIsLightHeader] = useState(false);

  // Manual / Auto-Play override for The Craft section
  const [isAutoPlayingRitual, setIsAutoPlayingRitual] = useState(false);
  const [manualRitualProgress, setManualRitualProgress] = useState<number | null>(null);

  // Selected Boutique Product in Section 3 (The Collection)
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const activeCollectionProduct = PRODUCTS[selectedProductIndex] || PRODUCTS[0];
  const prevCollectionProduct =
    PRODUCTS[(selectedProductIndex - 1 + PRODUCTS.length) % PRODUCTS.length];
  const nextCollectionProduct =
    PRODUCTS[(selectedProductIndex + 1) % PRODUCTS.length];

  const slideNext = () => {
    setSlideDirection(1);
    setSelectedProductIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const slidePrev = () => {
    setSlideDirection(-1);
    setSelectedProductIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const goToSlide = (idx: number) => {
    if (idx === selectedProductIndex) return;
    setSlideDirection(idx > selectedProductIndex ? 1 : -1);
    setSelectedProductIndex(idx);
  };

  // Cart & Modals
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Scroll listener computing exact 0..1 progress for every sticky section
  useEffect(() => {
    const computeProgress = (el: HTMLElement | null): number => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = Math.max(1, rect.height - viewportH);
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollableDistance));
    };

    const computeVisibilityProgress = (el: HTMLElement | null): number => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const current = viewportH - rect.top;
      return Math.max(0, Math.min(1, current / total));
    };

    const handleScroll = () => {
      const hProg = computeProgress(heroSectionRef.current);
      const rProg = computeProgress(ritualSectionRef.current);
      const pProg = computeVisibilityProgress(packSectionRef.current);
      const eProg = computeProgress(estateSectionRef.current);

      setHeroProgress(hProg);
      setRitualProgress(rProg);
      setPackProgress(pProg);
      setEstateProgress(eProg);

      // Determine active section for top bar pill indicator
      const scrollY = window.scrollY;
      const rTop = ritualSectionRef.current?.offsetTop ?? 99999;
      const pTop = packSectionRef.current?.offsetTop ?? 99999;
      const eTop = estateSectionRef.current?.offsetTop ?? 99999;

      if (scrollY >= eTop - 160) {
        setActiveNav('estate');
        setIsLightHeader(false);
      } else if (scrollY >= pTop - 120) {
        setActiveNav('pack');
        setIsLightHeader(true);
      } else if (scrollY >= rTop - 160) {
        setActiveNav('ritual');
        setIsLightHeader(false);
      } else {
        setActiveNav('hero');
        setIsLightHeader(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Auto-play animation loop when user clicks Play in The Craft section
  useEffect(() => {
    if (!isAutoPlayingRitual) return;

    let animId: number;
    let startTime: number | null = null;
    const duration = 6500;
    const startProg =
      manualRitualProgress !== null
        ? manualRitualProgress >= 0.98
          ? 0
          : manualRitualProgress
        : ritualProgress >= 0.98
        ? 0
        : ritualProgress;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const nextP = Math.min(1, startProg + elapsed / duration);
      setManualRitualProgress(nextP);

      if (nextP < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setIsAutoPlayingRitual(false);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlayingRitual]);

  // Clear manual override when user scrolls significantly
  useEffect(() => {
    if (!isAutoPlayingRitual && manualRitualProgress !== null) {
      const timeout = setTimeout(() => setManualRitualProgress(null), 1200);
      return () => clearTimeout(timeout);
    }
  }, [ritualProgress]);

  const effectiveRitualProgress =
    manualRitualProgress !== null ? manualRitualProgress : ritualProgress;

  // Current step index (0..3) in The Craft
  const currentStepIndex = Math.min(
    3,
    Math.floor(effectiveRitualProgress * 3.99)
  );
  const currentStepData = CRAFT_STEPS[currentStepIndex];

  // Smooth scroll helper
  const scrollToSection = (id: 'hero' | 'ritual' | 'pack' | 'estate') => {
    const map = {
      hero: heroSectionRef.current,
      ritual: ritualSectionRef.current,
      pack: packSectionRef.current,
      estate: estateSectionRef.current,
    };
    const target = map[id];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Jump to a specific craft step (0..3)
  const jumpToRitualStep = (stepIdx: number) => {
    setIsAutoPlayingRitual(false);
    const targetP = stepIdx / 3.2 + 0.05;
    setManualRitualProgress(Math.min(0.98, targetP));

    if (ritualSectionRef.current) {
      const rect = ritualSectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = Math.max(
        1,
        ritualSectionRef.current.offsetHeight - window.innerHeight
      );
      window.scrollTo({
        top: sectionTop + targetP * scrollable,
        behavior: 'smooth',
      });
    }
  };

  // Keyboard navigation for slidable collection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCartOpen || isCheckoutOpen || quickViewProduct) return;
      if (e.key === 'ArrowRight') {
        slideNext();
      } else if (e.key === 'ArrowLeft') {
        slidePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, isCheckoutOpen, quickViewProduct]);

  // Cart handlers
  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: string
  ) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { product, selectedSize, selectedColor, quantity: 1 }];
    });
    showToast(`Added ${product.name} to your boutique bag`);
  };

  const handleBuyActivePiece = () => {
    handleAddToCart(
      activeCollectionProduct,
      activeCollectionProduct.sizes[0],
      ''
    );
    setIsCartOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ============================================================================
  // HERO ARCHITECTURAL STAGE CURTAIN & TEXT CALCULATIONS
  // ============================================================================
  const curtainTranslateY = Math.max(0, (1 - heroProgress * 1.25) * 105);
  const heroTitleScale = 0.9 + Math.min(1, heroProgress * 1.3) * 0.1;
  const heroTitleOpacity = Math.max(
    0,
    Math.min(1, (heroProgress - 0.16) / 0.45)
  );

  // ============================================================================
  // ATELIER ARCH EXPANSION & STAGE CALCULATIONS
  // ============================================================================
  const archExpandT = Math.max(0, Math.min(1, estateProgress / 0.35));
  const estateStageT = Math.max(
    0,
    Math.min(1, (estateProgress - 0.35) / 0.65)
  );
  const estateStageIndex =
    estateStageT < 0.34 ? 0 : estateStageT < 0.68 ? 1 : 2;

  return (
    <div className="relative bg-[#0D0C0A] text-[#FAF5ED] antialiased selection:bg-[#D4AF37]/30">
      {/* =====================================================================
          STICKY ADAPTIVE TOP NAVIGATION BAR (3-Zone Top Bar Contract)
         ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isLightHeader
            ? 'text-[#181512] bg-[#F6F3EE]/85 backdrop-blur-md border-b border-[#E5DEC9]'
            : 'text-[#FAF5ED] bg-[#0D0C0A]/40 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center group cursor-pointer focus:outline-none whitespace-nowrap shrink-0"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl font-light tracking-[0.26em] uppercase leading-none">
              ATELIER VALOIS
            </span>
          </button>

          {/* Zone 2: THE CRAFT | THE COLLECTION | THE ATELIER */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] font-medium">
            {[
              { id: 'ritual', label: 'The Craft' },
              { id: 'pack', label: 'The Collection' },
              { id: 'estate', label: 'The Atelier' },
            ].map((item) => {
              const isCurrent = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id as 'ritual' | 'pack' | 'estate')
                  }
                  className={`px-4 py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? isLightHeader
                        ? 'border border-[#181512] rounded-full font-semibold'
                        : 'border border-[#D4AF37] text-[#E5C77D] rounded-full font-semibold'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action - Boutique Bag */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.18em] rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isLightHeader
                  ? 'border-[#181512] bg-[#181512] text-[#F6F3EE] hover:bg-[#2E2924]'
                  : 'border-[#D4AF37]/45 bg-[#141210]/85 backdrop-blur-md text-[#FAF5ED] hover:border-[#D4AF37]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 1: PARISIAN HAUTE COUTURE HERO -> ARCHITECTURAL SILK VEIL WIPE
         ===================================================================== */}
      <section
        ref={heroSectionRef}
        className="relative h-[230vh] w-full"
        id="hero"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* LAYER 1: Sunlit Parisian Couture Campaign Backdrop at scroll = 0 */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-300"
            style={{
              transform: `scale(${1 + heroProgress * 0.08})`,
            }}
          >
            <img
              src="/assets/images/boutique_hero_campaign_1792767540901.jpg"
              alt="Atelier Valois Haute Couture Salon"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-[#0D0C0A]/90" />

            {/* Center Couture Crest & Title (Fades as architectural stage rises) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{
                opacity: Math.max(0, 1 - heroProgress * 2.2),
                transform: `translateY(${-heroProgress * 80}px)`,
              }}
            >
              {/* Golden Couture Mannequin Emblem */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#0D0C0A]/60 backdrop-blur-md">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <p className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-[#E5C77D] mb-3 font-medium">
                Paris · Place Vendôme
              </p>
              <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.18em] text-[#FAF5ED] drop-shadow-[0_6px_24px_rgba(0,0,0,0.7)]">
                VALOIS
              </h1>
              <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#E5DEC9] mt-3 drop-shadow">
                Architectural silhouettes sculpted by hand.
              </p>

              {/* Scroll indicator */}
              <div className="mt-12 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                <span>Scroll to unveil collection</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
              </div>
            </div>
          </div>

          {/* =================================================================
              LAYER 2: RISING ARCHITECTURAL VELVET-ONYX & GOLD STAGE CURTAIN
             ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `translate3d(0, ${curtainTranslateY}%, 0)`,
              transition: 'transform 45ms linear',
            }}
          >
            {/* Smooth Curved Architectural Arch Top Edge (Zero drips) */}
            <svg
              viewBox="0 0 1440 140"
              preserveAspectRatio="none"
              className="w-full h-20 sm:h-28 -mt-19 sm:-mt-27 block"
            >
              <path
                fill="#D4AF37"
                d="M0,140 Q720,0 1440,140 L1440,140 L0,140 Z"
                opacity="0.45"
              />
              <path
                fill="#171412"
                d="M0,140 Q720,12 1440,140 L1440,140 L0,140 Z"
              />
            </svg>

            {/* Full Parisian Onyx & Warm Charcoal Stage Body */}
            <div
              className="w-full h-full flex items-center justify-center relative px-6"
              style={{
                background:
                  'linear-gradient(165deg, #171412 0%, #12100E 55%, #0B0A09 100%)',
              }}
            >
              {/* Centered Split Headline: Haute [Couture Lookbook Frame] Couture */}
              <div
                className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative"
                style={{
                  opacity: heroTitleOpacity,
                  transform: `scale(${heroTitleScale})`,
                }}
              >
                {/* Left Word: Haute */}
                <div className="relative text-center md:text-right">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] mb-1">
                    Autumn / Winter
                  </div>
                  <span className="font-serif-luxury text-6xl sm:text-8xl lg:text-[112px] font-light text-[#FAF5ED] tracking-tight leading-none select-none">
                    Haute
                  </span>
                </div>

                {/* Centerpiece Framed Champagne Silk Gown Silhouette */}
                <div className="w-[220px] sm:w-[270px] lg:w-[300px] aspect-[3/4] relative z-10 border border-[#D4AF37]/60 p-2 bg-[#0D0C0A] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                  <img
                    src={PRODUCTS[0].image}
                    alt={PRODUCTS[0].name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="font-serif-luxury italic text-lg text-[#FAF5ED]">
                      {PRODUCTS[0].subtitle || PRODUCTS[0].frenchTitle}
                    </span>
                  </div>
                </div>

                {/* Right Word: Couture */}
                <div className="text-center md:text-left">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] mb-1">
                    Limited Edition
                  </div>
                  <span className="font-serif-luxury text-6xl sm:text-8xl lg:text-[112px] font-light text-[#FAF5ED] tracking-tight leading-none select-none">
                    Couture
                  </span>
                </div>
              </div>

              {/* Bottom-Right "50 NUMBERED SERIALS WORLDWIDE" Callout */}
              <div
                className="absolute bottom-10 right-8 sm:right-14 flex items-center gap-3 text-[#FAF5ED]/90"
                style={{ opacity: heroTitleOpacity }}
              >
                <span className="font-serif-luxury text-4xl sm:text-5xl font-light text-[#D4AF37] leading-none">
                  50
                </span>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] leading-tight text-left text-[#C8BEB0]">
                  <div>Numbered Serials</div>
                  <div>Per Silhouette</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: THE CRAFT — STICKY 4-STEP SARTORIAL BLUEPRINT & LOOKBOOK
         ===================================================================== */}
      <section
        ref={ritualSectionRef}
        id="ritual"
        className="relative h-[420vh] w-full"
        style={{
          background:
            'linear-gradient(155deg, #181512 0%, #12100E 50%, #0B0A09 100%)',
        }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center border-t border-[#2A241E]">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT COLUMN: Step Headline, Poetic Copy, Scrubbing Timeline & Play Control */}
            <div className="lg:col-span-5 flex flex-col justify-center z-20">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#D4AF37] mb-3">
                MASTER CRAFTSMANSHIP · STAGE 0{currentStepData.step}
              </div>

              <div
                key={currentStepData.step}
                className="transition-all duration-500 ease-out"
              >
                <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-[#FAF5ED] leading-[1.08] mb-5">
                  {currentStepData.title}
                  <br />
                  <span className="italic font-normal text-[#E5C77D]">
                    {currentStepData.italicPart}
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-[#B8AEA0] leading-relaxed max-w-md mb-10 font-light">
                  {currentStepData.description}
                </p>
              </div>

              {/* Horizontal 4-Step Progress Timeline Bar */}
              <div className="w-full max-w-md mb-6">
                <div className="relative h-8 flex items-center">
                  <div className="w-full h-[2px] bg-[#FAF5ED]/15 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-[#D4AF37] transition-all duration-100"
                      style={{ width: `${effectiveRitualProgress * 100}%` }}
                    />
                  </div>

                  {/* Glowing Progress Thumb */}
                  <div
                    className="w-3.5 h-3.5 rounded-full bg-[#FAF5ED] border-2 border-[#D4AF37] shadow-[0_0_12px_#D4AF37] absolute -translate-x-1/2 pointer-events-none transition-all duration-100"
                    style={{ left: `${effectiveRitualProgress * 100}%` }}
                  />

                  {/* Clickable Step Tick Nodes (1, 2, 3, 4) */}
                  {[0, 1, 2, 3].map((idx) => {
                    const pos = (idx / 3) * 100;
                    const isPassed = effectiveRitualProgress * 3 >= idx - 0.1;
                    return (
                      <button
                        key={idx}
                        onClick={() => jumpToRitualStep(idx)}
                        style={{ left: `${pos}%` }}
                        aria-label={`Jump to Craft Step ${idx + 1}`}
                        className="absolute -translate-x-1/2 -bottom-4 flex flex-col items-center cursor-pointer group focus:outline-none"
                      >
                        <span
                          className={`text-[10px] font-mono transition-colors ${
                            isPassed
                              ? 'text-[#D4AF37] font-semibold'
                              : 'text-[#FAF5ED]/35 group-hover:text-[#FAF5ED]/80'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Play / Pause Button + Step X / 4 Indicator */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => setIsAutoPlayingRitual((prev) => !prev)}
                  aria-label={
                    isAutoPlayingRitual
                      ? 'Pause couture sequence'
                      : 'Play couture sequence'
                  }
                  className="w-9 h-9 rounded-full border border-[#D4AF37]/50 bg-[#1B1815] hover:bg-[#D4AF37] hover:text-[#0D0C0A] flex items-center justify-center transition-all cursor-pointer"
                >
                  {isAutoPlayingRitual ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>

                <span className="text-xs font-mono tracking-widest text-[#FAF5ED]/85 tabular-nums">
                  Stage {currentStepData.step} / 4
                </span>

                <span className="text-[11px] text-[#A89E90] hidden sm:inline">
                  · Scroll or press play to inspect the craft
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Sartorial Blueprint & Couture Silhouette Transformation */}
            <div className="lg:col-span-7 flex items-center justify-center relative z-10">
              <RitualVisualizer
                progress={effectiveRitualProgress}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: THE COLLECTION — PARISIAN LIMESTONE SHOWCASE + FLOATING ICONS
         ===================================================================== */}
      <section
        ref={packSectionRef}
        id="pack"
        className="relative min-h-screen w-full bg-[#F6F3EE] text-[#181512] py-28 px-6 sm:px-12 overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Floating Parallax Couture Shears, Perfume Flacons, Silk Spools & Brooches */}
        <FloatingElements scrollProgress={packProgress} />

        {/* Main Center Content */}
        <div className="max-w-6xl mx-auto w-full relative z-20 flex flex-col items-center text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#8C6D1F] font-semibold mb-2">
            The Permanent Collection
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light text-[#181512] tracking-tight mb-6 [text-wrap:balance]">
            Acquire the <span className="italic font-normal text-[#8C6D1F]">silhouette.</span>
          </h2>

          {/* Dark Pill CTA Button: ADD TO BOUTIQUE BAG */}
          <button
            onClick={handleBuyActivePiece}
            className="px-8 py-3.5 bg-[#181512] hover:bg-[#2E2822] text-[#FAF5ED] text-[11px] uppercase tracking-[0.24em] font-semibold rounded-full shadow-lg transition-all duration-300 cursor-pointer mb-8"
          >
            Acquire Piece · ₹{activeCollectionProduct.price.toLocaleString('en-IN')}
          </button>

          {/* Boutique Silhouette Selector Tabs */}
          <div className="w-full max-w-5xl overflow-x-auto pb-3 mb-10 scrollbar-none">
            <div className="flex items-center justify-start sm:justify-center gap-2 bg-[#EAE4DA] p-1.5 rounded-full border border-[#D8CFC0] w-max sm:w-auto mx-auto shadow-inner">
              {PRODUCTS.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    selectedProductIndex === idx
                      ? 'bg-[#181512] text-[#FAF5ED] shadow-md scale-[1.02]'
                      : 'text-[#5C5346] hover:text-[#181512] hover:bg-black/5'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#D4AF37]">0{idx + 1}</span>
                  <span>{prod.name}</span>
                  <span className="opacity-75 font-mono text-[11px]">· ₹{prod.price.toLocaleString('en-IN')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Showcase: Left Sartorial Specs + Center Lookbook Deck (With Visible Peek Cards) + Right Provenance */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
            {/* Left Callouts */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 order-2 lg:order-1 min-h-[220px] justify-center z-20">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={`left-${activeCollectionProduct.id}`}
                  initial={{ opacity: 0, y: slideDirection > 0 ? 16 : -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: slideDirection > 0 ? -16 : 16 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-6 flex flex-col items-center lg:items-end w-full"
                >
                  <div className="max-w-xs">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D1F] font-semibold mb-1">
                      01 · Textile Composition
                    </div>
                    <p className="font-serif-luxury text-xl text-[#181512] font-medium leading-snug">
                      {activeCollectionProduct.fabric}
                    </p>
                    <p className="text-xs text-[#5C5346] mt-1">
                      {activeCollectionProduct.sustainability}
                    </p>
                  </div>

                  <div className="w-16 h-[1px] bg-[#D5CBB8]" />

                  <div className="max-w-xs">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D1F] font-semibold mb-1">
                      02 · Tailoring Architecture
                    </div>
                    <p className="font-serif-luxury text-xl text-[#181512] font-medium leading-snug">
                      Hand-Sculpted Couture
                    </p>
                    <p className="text-xs text-[#5C5346] mt-1">
                      {activeCollectionProduct.details[0]}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Centerpiece Onyx & Gold Couture Lookbook Deck with Visible Subtle Peek Cards */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 relative w-full">
              <div className="relative flex items-center justify-center w-full min-h-[470px]">
                {/* PREVIOUS PEEK CARD (Subtle, non-disturbing, clickable) */}
                <div
                  onClick={slidePrev}
                  aria-label={`Preview previous piece: ${prevCollectionProduct.name}`}
                  className="hidden md:block absolute left-2 lg:-left-2 xl:left-4 z-10 w-[160px] lg:w-[195px] transition-all duration-500 ease-out cursor-pointer hover:opacity-80 hover:scale-[0.86] group select-none opacity-40 scale-[0.80] filter blur-[0.4px]"
                  style={{ transformOrigin: 'center right' }}
                >
                  <div className="rounded-sm overflow-hidden border border-[#D4AF37]/35 bg-[#141210] p-2.5 shadow-xl">
                    <div className="text-center pb-1 mb-1 border-b border-[#D4AF37]/20">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37]">
                        ← Previous
                      </span>
                      <div className="font-serif-luxury italic text-xs text-[#FAF5ED] truncate px-1">
                        {prevCollectionProduct.name}
                      </div>
                    </div>
                    <div className="relative aspect-[4/4.5] w-full overflow-hidden border border-[#D4AF37]/20 bg-[#1B1815]">
                      <img
                        src={prevCollectionProduct.image}
                        alt={prevCollectionProduct.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-[#D4AF37]">
                        <span>₹{prevCollectionProduct.price.toLocaleString('en-IN')}</span>
                        <span className="text-[9px] text-[#FAF5ED] group-hover:underline">View</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous Navigation Button */}
                <button
                  onClick={slidePrev}
                  aria-label="Previous couture piece"
                  className="absolute left-1 sm:left-3 md:left-28 lg:left-24 xl:left-32 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181512]/95 hover:bg-[#D4AF37] hover:text-[#0C0B0A] text-[#D4AF37] border border-[#D4AF37]/60 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer group"
                >
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* Animated Active Center Card */}
                <div className="relative z-20 w-full max-w-[340px] sm:max-w-[360px] overflow-visible flex justify-center py-2">
                  <AnimatePresence mode="popLayout" custom={slideDirection}>
                    <motion.div
                      key={activeCollectionProduct.id}
                      custom={slideDirection}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 150 : -150,
                          opacity: 0,
                          scale: 0.92,
                          rotate: dir > 0 ? 3 : -3,
                          filter: 'blur(3px)',
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                          filter: 'blur(0px)',
                          transition: {
                            x: { type: 'spring', stiffness: 280, damping: 26 },
                            opacity: { duration: 0.35 },
                            scale: { duration: 0.35 },
                            filter: { duration: 0.35 },
                          },
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? -150 : 150,
                          opacity: 0,
                          scale: 0.92,
                          rotate: dir > 0 ? -3 : 3,
                          filter: 'blur(3px)',
                          transition: { duration: 0.28, ease: 'easeInOut' },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60 || info.velocity.x < -300) slideNext();
                        else if (info.offset.x > 60 || info.velocity.x > 300) slidePrev();
                      }}
                      className="cursor-grab active:cursor-grabbing touch-pan-y"
                    >
                      <CoffeePackShowcase
                        product={activeCollectionProduct}
                        onInspect={(p) => setQuickViewProduct(p)}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next Navigation Button */}
                <button
                  onClick={slideNext}
                  aria-label="Next couture piece"
                  className="absolute right-1 sm:right-3 md:right-28 lg:right-24 xl:right-32 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181512]/95 hover:bg-[#D4AF37] hover:text-[#0C0B0A] text-[#D4AF37] border border-[#D4AF37]/60 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer group"
                >
                  <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* NEXT PEEK CARD (Subtle, non-disturbing, clickable) */}
                <div
                  onClick={slideNext}
                  aria-label={`Preview next piece: ${nextCollectionProduct.name}`}
                  className="hidden md:block absolute right-2 lg:-right-2 xl:right-4 z-10 w-[160px] lg:w-[195px] transition-all duration-500 ease-out cursor-pointer hover:opacity-80 hover:scale-[0.86] group select-none opacity-40 scale-[0.80] filter blur-[0.4px]"
                  style={{ transformOrigin: 'center left' }}
                >
                  <div className="rounded-sm overflow-hidden border border-[#D4AF37]/35 bg-[#141210] p-2.5 shadow-xl">
                    <div className="text-center pb-1 mb-1 border-b border-[#D4AF37]/20">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37]">
                        Next →
                      </span>
                      <div className="font-serif-luxury italic text-xs text-[#FAF5ED] truncate px-1">
                        {nextCollectionProduct.name}
                      </div>
                    </div>
                    <div className="relative aspect-[4/4.5] w-full overflow-hidden border border-[#D4AF37]/20 bg-[#1B1815]">
                      <img
                        src={nextCollectionProduct.image}
                        alt={nextCollectionProduct.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-[#D4AF37]">
                        <span>₹{nextCollectionProduct.price.toLocaleString('en-IN')}</span>
                        <span className="text-[9px] text-[#FAF5ED] group-hover:underline">View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Pagination Controls & Number Counter */}
              <div className="mt-8 flex flex-col items-center gap-2 z-20">
                <div className="flex items-center gap-2">
                  {PRODUCTS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to piece ${idx + 1}`}
                      className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                        selectedProductIndex === idx
                          ? 'w-7 bg-[#8C6D1F]'
                          : 'w-2 bg-[#D5CBB8] hover:bg-[#8C6D1F]/60'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[11px] font-mono tracking-widest text-[#8C6D1F] uppercase font-semibold flex items-center gap-2">
                  <span>0{selectedProductIndex + 1} / 0{PRODUCTS.length}</span>
                  <span className="text-[#A89E90] font-normal">· Click preview cards, drag or use ← → to slide</span>
                </div>
              </div>
            </div>

            {/* Right Callouts & Quick Inspect */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-3 min-h-[220px] justify-center z-20">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={`right-${activeCollectionProduct.id}`}
                  initial={{ opacity: 0, y: slideDirection > 0 ? 16 : -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: slideDirection > 0 ? -16 : 16 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-6 flex flex-col items-center lg:items-start w-full"
                >
                  <div className="max-w-xs">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D1F] font-semibold mb-1">
                      03 · Provenance & Serial
                    </div>
                    <p className="font-serif-luxury text-xl text-[#181512] font-medium leading-snug">
                      {activeCollectionProduct.origin}
                    </p>
                    <p className="text-xs text-[#5C5346] mt-1">
                      Individually numbered edition ({activeCollectionProduct.serialNumber}) delivered in a cedarwood keepsake archive trunk.
                    </p>
                  </div>

                  <div className="w-16 h-[1px] bg-[#D5CBB8]" />

                  <div className="max-w-xs">
                    <button
                      onClick={() => setQuickViewProduct(activeCollectionProduct)}
                      className="text-xs uppercase tracking-[0.2em] text-[#181512] font-semibold underline underline-offset-4 hover:text-[#8C6D1F] cursor-pointer"
                    >
                      Open Sizing & Atelier Dossier →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: THE ATELIER — "Inside the Paris Atelier"
          ARCH PORTAL THAT EXPANDS TO FULL SCREEN + 3 COUTURE STAGES
         ===================================================================== */}
      <section
        ref={estateSectionRef}
        id="estate"
        className="relative h-[400vh] w-full bg-[#0D0C0A] text-[#FAF5ED]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-end">
          {/* Top Title & Location Metadata (Visible while Arch is expanding) */}
          <div
            className="absolute top-24 left-0 right-0 text-center px-6 z-20 pointer-events-none transition-all duration-300"
            style={{
              opacity: Math.max(0, 1 - archExpandT * 1.6),
              transform: `translateY(${-archExpandT * 60}px)`,
            }}
          >
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light text-[#FAF5ED] mb-3">
              Inside the <span className="italic font-normal text-[#E5C77D]">Paris Atelier</span>
            </h2>
            <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#A89E90]">
              <span>Rue Saint-Honoré</span>
              <span aria-hidden="true">·</span>
              <span>Place Vendôme</span>
              <span aria-hidden="true">·</span>
              <span>France</span>
            </div>
          </div>

          {/* EXPANDING ARCH WINDOW -> FULL VIEWPORT SHOWCASE */}
          <div
            className="relative overflow-hidden shadow-2xl transition-all duration-75 ease-out flex items-end justify-between border-t border-[#D4AF37]/40"
            style={{
              width: `${Math.min(100, 38 + archExpandT * 62)}vw`,
              height: `${Math.min(100, 62 + archExpandT * 38)}vh`,
              minWidth: archExpandT < 0.95 ? '320px' : '100vw',
              borderTopLeftRadius: `${(1 - archExpandT) * 500}px`,
              borderTopRightRadius: `${(1 - archExpandT) * 500}px`,
            }}
          >
            {/* Background Sunlit Parisian Master Tailor Scene */}
            <img
              src="/assets/images/boutique_atelier_craft_1792767542824.jpg"
              alt="Master Tailor Hand-Stitching at Atelier Valois Paris"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700"
              style={{
                transform: `scale(${1.05 + estateStageT * 0.08})`,
              }}
            />

            {/* Studio Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/90 via-[#12100E]/35 to-black/30 pointer-events-none" />

            {/* CENTER POP-UP PORTRAIT CARD DURING STAGE 2 */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6 transition-all duration-500"
              style={{
                opacity:
                  archExpandT > 0.9 && estateStageIndex === 1 ? 1 : 0,
                transform: `translateY(${
                  archExpandT > 0.9 && estateStageIndex === 1 ? '0px' : '40px'
                }) scale(${
                  archExpandT > 0.9 && estateStageIndex === 1 ? 1 : 0.92
                })`,
              }}
            >
              <div className="w-60 sm:w-72 aspect-[3/4] rounded-sm overflow-hidden border-2 border-[#D4AF37] shadow-[0_28px_60px_rgba(0,0,0,0.85)] bg-[#141210] relative">
                <img
                  src="/assets/images/boutique_tailored_coat_1792767543121.jpg"
                  alt="Double-Breasted Cashmere Overcoat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 right-3 text-center bg-[#0D0C0A]/85 backdrop-blur-sm py-1.5 px-2 border border-[#D4AF37]/40 text-[10px] uppercase tracking-[0.2em] text-[#E5C77D]">
                  650g Mongolian Cashmere · Biella
                </div>
              </div>
            </div>

            {/* FULL-SCREEN STAGE OVERLAYS (Bottom-Left Dynamic Text + Bottom-Right Spinning Seal) */}
            <div
              className="relative z-30 w-full max-w-7xl mx-auto p-8 sm:p-14 flex items-end justify-between gap-8 transition-opacity duration-500"
              style={{
                opacity: archExpandT > 0.82 ? 1 : 0,
              }}
            >
              {/* Bottom-Left Stage Copy */}
              <div className="max-w-md">
                {estateStageIndex === 0 && (
                  <div className="animate-fadeIn">
                    <h3 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#FAF5ED] leading-none mb-3">
                      Bespoke
                      <br />
                      <span className="italic font-normal text-[#E5C77D]">
                        pattern cutting.
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D8CFC2]/85 leading-relaxed font-light">
                      In our sunlit Rue Saint-Honoré workshop, master tailors
                      preserve centuries-old French draping and architectural
                      pattern-making.
                    </p>
                  </div>
                )}

                {estateStageIndex === 1 && (
                  <div className="animate-fadeIn">
                    <h3 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#FAF5ED] leading-none mb-3">
                      Loomed
                      <br />
                      <span className="italic font-normal text-[#E5C77D]">
                        for eternity.
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D8CFC2]/85 leading-relaxed font-light">
                      Unbleached Mongolian cashmere and Grade-6A organic mulberry
                      silk are woven in small batches for unmatched lustre and
                      movement.
                    </p>
                  </div>
                )}

                {estateStageIndex === 2 && (
                  <div className="animate-fadeIn">
                    <h3 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#FAF5ED] leading-none mb-3">
                      Stitched
                      <br />
                      <span className="italic font-normal text-[#E5C77D]">
                        by hand.
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D8CFC2]/85 leading-relaxed font-light">
                      Seven saddle-stitches per inch using waxed French linen
                      thread—every lapel, corset stay, and silk hem is finished
                      individually by hand.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom-Right Circular Rotating Couture Seal Badge */}
              <div className="hidden sm:flex items-center justify-center w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-[#141210]/85 backdrop-blur-md border border-[#D4AF37]/50 shadow-2xl relative shrink-0">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full p-2"
                  style={{
                    transform: `rotate(${estateProgress * 360}deg)`,
                  }}
                >
                  <defs>
                    <path
                      id="coutureCirclePath"
                      d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                    />
                  </defs>
                  <text
                    fill="#E5C77D"
                    fontSize="10.5"
                    fontWeight="600"
                    letterSpacing="3"
                  >
                    <textPath href="#coutureCirclePath">
                      • HANDCRAFTED COUTURE • BESPOKE ARCHIVE •
                    </textPath>
                  </text>
                </svg>

                {/* Center Emblem Inside Spinning Ring */}
                <div className="absolute inset-7 rounded-full bg-[#1D1916] border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center p-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-serif-luxury italic text-xs text-[#FAF5ED] leading-tight">
                    Atelier Valois
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] mt-0.5">
                    PARIS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: DARK HAUTE COUTURE BOUTIQUE FOOTER
         ===================================================================== */}
      <footer className="bg-[#090807] border-t border-[#221E1A] text-[#C8BEB0] py-20 px-6 sm:px-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1C1815]">
          {/* Col 1: Brand Emblem & Story */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#171412] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-serif-luxury font-bold text-lg">
                V
              </div>
              <span className="font-serif-luxury text-2xl font-light tracking-[0.22em] text-[#FAF5ED]">
                ATELIER VALOIS
              </span>
            </div>
            <p className="text-xs text-[#8E8477] max-w-xs leading-relaxed">
              From our historic Parisian atelier on Rue Saint-Honoré, carrying the
              grace and architectural precision of hand-draped haute couture.
            </p>
          </div>

          {/* Col 2: EXPLORE */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#7A7064] font-semibold">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm font-serif-luxury">
              <li>
                <button
                  onClick={() => scrollToSection('ritual')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  The Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pack')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  The Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('estate')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  The Atelier
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: THE BOUTIQUE ARCHIVE */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#7A7064] font-semibold">
              The Boutique Archive
            </div>
            <ul className="space-y-2.5 text-sm font-serif-luxury">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    onClick={() => setQuickViewProduct(prod)}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                  >
                    {prod.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7064]">
          <p>© 2026 Atelier Valois Paris. Haute Couture & Luxury Boutique.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 uppercase tracking-[0.2em] text-[#C8BEB0] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* =====================================================================
          SLIDE-OVER CART DRAWER, CHECKOUT MODAL, AND QUICK VIEW
         ===================================================================== */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(idx, qty) =>
          setCartItems((prev) => {
            const copy = [...prev];
            copy[idx].quantity = qty;
            return copy;
          })
        }
        onRemoveItem={(idx) =>
          setCartItems((prev) => prev.filter((_, i) => i !== idx))
        }
        onProceedCheckout={(gift) => {
          setIncludeGiftBox(gift);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        includeGiftBox={includeGiftBox}
        onOrderCompleted={() => {
          setCartItems([]);
          showToast('Order confirmed — Preparing white-glove atelier courier');
        }}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        products={PRODUCTS}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141210] border border-[#D4AF37] text-[#FAF5ED] px-5 py-3 rounded-full shadow-2xl text-xs uppercase tracking-[0.16em] flex items-center gap-2.5">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
