'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, ChevronLeft, ArrowRight } from 'lucide-react';

interface CandleCakeProps {
  friendName: string;
  onAllExtinguished: () => void;
  onPrevScene: () => void;
}

const CANDLE_LABELS = [
  'Joy',
  'Adventure',
  'Health',
  'Laughter',
  'Magic',
];

export function CandleCake({
  friendName,
  onAllExtinguished,
  onPrevScene,
}: CandleCakeProps) {
  const shouldReduceMotion = useReducedMotion();
  const [litCandles, setLitCandles] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);

  const remainingCount = litCandles.filter(Boolean).length;
  const allOut = remainingCount === 0;

  const fireCelebration = () => {
    if (shouldReduceMotion) return;
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#c084fc', '#38bdf8', '#fb7185'],
    });
  };

  const toggleCandle = (idx: number) => {
    setLitCandles((prev) => {
      if (!prev[idx]) return prev;
      const next = [...prev];
      next[idx] = false;
      if (next.every((c) => !c)) {
        fireCelebration();
      }
      return next;
    });
  };

  const blowOutAll = () => {
    if (allOut) {
      onAllExtinguished();
      return;
    }
    setLitCandles([false, false, false, false, false]);
    fireCelebration();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -16 }}
      className="flex flex-col items-center text-center max-w-xl mx-auto px-5 py-7 sm:p-9 bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_24px_60px_rgba(244,114,182,0.22)] border-2 border-pink-200 z-10 w-full"
    >
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
        <span>Make a Birthday Wish, {friendName}!</span>
      </span>

      <h2 className="font-handwriting text-3xl sm:text-5xl font-bold text-slate-900 mb-2">
        {allOut
          ? '✨ Wish Sent to the Stars! ✨'
          : `Tap the Candles to Blow Them Out (${remainingCount} left)`}
      </h2>

      <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-md">
        {allOut
          ? `Every single candle is out! May all your birthday wishes come true this year, ${friendName}!`
          : 'Tap each flickering candle flame above the cake (or tap the button below to blow them all out at once).'}
      </p>

      {/* Interactive Illustrated Cake & 5 Candles */}
      <div className="relative w-full max-w-sm pt-12 pb-4 flex flex-col items-center">
        {/* 5 Interactive Candles Row */}
        <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 -mb-2">
          {litCandles.map((isLit, idx) => (
            <button
              key={CANDLE_LABELS[idx]}
              type="button"
              onClick={() => toggleCandle(idx)}
              aria-pressed={!isLit}
              aria-label={
                isLit
                  ? `Blow out ${CANDLE_LABELS[idx]} candle`
                  : `${CANDLE_LABELS[idx]} candle extinguished`
              }
              className="group relative flex flex-col items-center cursor-pointer px-1.5 pt-6 pb-1 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              {/* Flickering Flame or Doodly Smoke Curl */}
              <div className="h-10 flex items-center justify-center">
                {isLit ? (
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? { scale: 1 }
                        : {
                            scale: [1, 1.16, 0.94, 1.08, 1],
                            rotate: [-4, 4, -3, 3, 0],
                          }
                    }
                    transition={{
                      duration: 1.1 + idx * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-5 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_16px_rgba(251,191,36,0.95)]"
                  >
                    <div className="absolute inset-x-1 bottom-1 top-2.5 rounded-full bg-white/80" />
                  </motion.div>
                ) : (
                  <motion.svg
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: [0.9, 0.3], y: -10 }}
                    transition={{ duration: 1.2 }}
                    viewBox="0 0 24 36"
                    className="w-6 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path d="M12 32 C 6 24, 18 16, 10 8 C 6 4, 14 2, 12 0" />
                  </motion.svg>
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-slate-700" />

              {/* Candle Pillar */}
              <div className="w-6 sm:w-7 h-16 sm:h-20 rounded-t-md bg-gradient-to-b from-pink-100 to-rose-200 border-2 border-rose-400 relative overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-2.5 bg-amber-300 mt-2 -rotate-12" />
                <div className="w-full h-2.5 bg-pink-400 mt-3 -rotate-12" />
                <div className="w-full h-2.5 bg-violet-300 mt-3 -rotate-12" />
              </div>

              <span className="mt-1 text-[11px] font-bold text-rose-700">
                {CANDLE_LABELS[idx]}
              </span>
            </button>
          ))}
        </div>

        {/* Cake Top Tier */}
        <div
          aria-hidden="true"
          className="relative w-60 sm:w-68 h-20 bg-gradient-to-b from-pink-200 via-rose-200 to-rose-300 rounded-t-3xl border-2 border-rose-400 shadow-md flex flex-col justify-between overflow-hidden"
        >
          {/* Frosting Drips */}
          <div className="flex justify-around -mt-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-6 bg-white rounded-b-full border-b-2 border-pink-300"
              />
            ))}
          </div>
          <p className="font-handwriting text-xl font-bold text-rose-800 pb-2">
            Happy Birthday {friendName}!
          </p>
        </div>

        {/* Cake Bottom Tier */}
        <div
          aria-hidden="true"
          className="w-72 sm:w-80 h-16 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-b-2xl border-2 border-t-0 border-rose-400 shadow-lg flex items-center justify-around px-4"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-pink-400 border border-white shadow-xs"
            />
          ))}
        </div>

        {/* Cake Stand Plate */}
        <div
          aria-hidden="true"
          className="w-80 sm:w-88 h-3.5 bg-slate-200 rounded-full border-2 border-slate-300 shadow-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between w-full mt-6 gap-3">
        <button
          type="button"
          onClick={onPrevScene}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-pink-50 text-slate-800 font-bold text-sm border border-pink-200 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Wishes</span>
        </button>

        {!allOut ? (
          <button
            type="button"
            onClick={blowOutAll}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          >
            <Wind className="w-4 h-4" aria-hidden="true" />
            <span>Blow Out All Candles ✨</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAllExtinguished}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold py-3 px-7 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          >
            <span>Open Grand Finale Note 🎉</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

