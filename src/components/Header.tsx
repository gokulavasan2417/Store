import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Chapter } from '../types/boutique';

interface HeaderProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  chapters,
  currentChapterIndex,
  onSelectChapter,
  cartCount,
  onOpenCart,
  onOpenAppointment,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0b0a]/85 backdrop-blur-md border-b border-[#25221e]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in luxury display face */}
        <button
          onClick={() => onSelectChapter(0)}
          className="text-left group cursor-pointer focus:outline-none"
          aria-label="Atelier Valois Home"
        >
          <span className="font-serif-luxury text-2xl lg:text-3xl font-light tracking-[0.2em] text-[#f7f2ec] uppercase whitespace-nowrap shrink-0 group-hover:text-[#d4af37] transition-colors duration-300">
            Atelier Valois
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#b5ada3]">
          {chapters.map((chapter) => {
            const isActive = currentChapterIndex === chapter.index;
            return (
              <button
                key={chapter.id}
                onClick={() => onSelectChapter(chapter.index)}
                className={`transition-all duration-300 hover:text-[#f7f2ec] cursor-pointer relative py-1 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#f7f2ec]' : 'text-[#8a8277]'
                }`}
              >
                <span>{chapter.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d4af37]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action - Shopping Bag button */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenAppointment}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#c9bfb2] hover:text-[#f7f2ec] transition-colors py-2 px-3 border border-[#332e27] hover:border-[#52493e] cursor-pointer rounded-none"
          >
            <span>Rendez-vous</span>
            <ChevronRight className="w-3 h-3 text-[#d4af37]" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative flex items-center gap-2.5 py-2.5 px-4 bg-[#181614] hover:bg-[#23201d] border border-[#38332a] text-[#f3ede6] text-xs uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
            <span className="whitespace-nowrap shrink-0">Bag</span>
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-semibold bg-[#d4af37] text-[#0c0b0a] px-1 tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
