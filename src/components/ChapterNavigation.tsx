import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Chapter } from '../types/boutique';

interface ChapterNavigationProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  chapters,
  currentChapterIndex,
  onSelectChapter,
  onNext,
  onPrev,
}) => {
  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const progressPercent = ((currentChapterIndex + 1) / chapters.length) * 100;

  return (
    <>
      {/* Right Vertical Pagination Strip */}
      <nav
        aria-label="Chapter pagination"
        className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-6"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#3a352d] to-[#3a352d]" />

        <div className="flex flex-col items-center gap-4">
          {chapters.map((ch, idx) => {
            const isActive = currentChapterIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(idx)}
                aria-label={`Go to chapter ${ch.number}: ${ch.title}`}
                className="group relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
              >
                {/* Tooltip Label */}
                <div className="absolute right-8 px-2.5 py-1 bg-[#151312] border border-[#2f2a23] text-[11px] uppercase tracking-[0.15em] text-[#cfc7bc] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[#d4af37] mr-1.5 font-mono">{ch.number}</span>
                  {ch.title}
                </div>

                {/* Dot */}
                <span
                  className={`block transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-[#d4af37] ring-4 ring-[#d4af37]/20 scale-110'
                      : 'w-1.5 h-1.5 bg-[#544c41] group-hover:bg-[#a19688] group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="w-[1px] h-12 bg-gradient-to-b from-[#3a352d] via-[#3a352d] to-transparent" />
      </nav>

      {/* Bottom Status & Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 pb-6 pt-4 flex items-end justify-between">
          {/* Chapter Metadata & Progress */}
          <div className="pointer-events-auto flex items-center gap-5 bg-[#0c0b0a]/90 backdrop-blur-md px-5 py-3 border border-[#2a2620] shadow-xl">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-semibold text-[#d4af37] tabular-nums">
                {currentChapter.number}
              </span>
              <span className="text-xs text-[#6e665a] font-mono tabular-nums">/ 05</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-[#2b2721]" />

            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8c8273] leading-none mb-1">
                {currentChapter.kicker}
              </p>
              <p className="font-serif-luxury text-base text-[#f0ebe3] leading-none tracking-wide">
                {currentChapter.title} — {currentChapter.subtitle}
              </p>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-20 sm:w-28 h-[2px] bg-[#221e1a] relative overflow-hidden ml-1">
              <div
                className="h-full bg-[#d4af37] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stepper Buttons for Next / Prev */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-[#0c0b0a]/90 backdrop-blur-md p-1.5 border border-[#2a2620] shadow-xl">
            <button
              onClick={onPrev}
              disabled={currentChapterIndex === 0}
              aria-label="Previous Chapter"
              className={`p-2 transition-colors cursor-pointer ${
                currentChapterIndex === 0
                  ? 'text-[#443e35] cursor-not-allowed'
                  : 'text-[#d8cfc3] hover:text-white hover:bg-[#1a1714]'
              }`}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-[#26221c]" />
            <button
              onClick={onNext}
              disabled={currentChapterIndex === chapters.length - 1}
              aria-label="Next Chapter"
              className={`p-2 transition-colors cursor-pointer ${
                currentChapterIndex === chapters.length - 1
                  ? 'text-[#443e35] cursor-not-allowed'
                  : 'text-[#d8cfc3] hover:text-white hover:bg-[#1a1714]'
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
