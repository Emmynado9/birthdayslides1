'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Compass,
  Sun,
  Crown,
} from 'lucide-react';
import { WishItem } from '@/content/birthday';

interface WishPageProps {
  wishes: WishItem[];
  onNextScene: () => void;
  onPrevScene: () => void;
}

export function WishPage({ wishes, onNextScene, onPrevScene }: WishPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([wishes[0]?.id || 'wish-1']);

  const activeWish = wishes[activeIdx] || wishes[0];

  const handleSelectWish = (idx: number) => {
    setActiveIdx(idx);
    const id = wishes[idx].id;
    if (!unlockedIds.includes(id)) {
      setUnlockedIds((prev) => [...prev, id]);
    }
  };

  const handleNext = () => {
    if (activeIdx < wishes.length - 1) {
      handleSelectWish(activeIdx + 1);
    } else {
      onNextScene();
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      handleSelectWish(activeIdx - 1);
    } else {
      onPrevScene();
    }
  };

  const renderWishIcon = (icon: WishItem['icon']) => {
    switch (icon) {
      case 'heart':
        return <Heart className="w-6 h-6 text-white" aria-hidden="true" />;
      case 'compass':
        return <Compass className="w-6 h-6 text-white" aria-hidden="true" />;
      case 'sun':
        return <Sun className="w-6 h-6 text-white" aria-hidden="true" />;
      case 'crown':
        return <Crown className="w-6 h-6 text-white" aria-hidden="true" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto px-4 z-10">
      <div className="text-center mb-4">
        <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 mb-2">
          🪐 Interactive Wish Orbit · {unlockedIds.length} of {wishes.length} Unlocked
        </span>
        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-slate-900">
          Tap the Orbiting Wish Bubbles!
        </h2>
      </div>

      {/* Interactive Orbiting Wish Planets / Star Bubbles Bar with Doodly Connector Path */}
      <div className="relative w-full max-w-md py-4 mb-4 flex items-center justify-between px-4">
        {/* Hand-drawn SVG Doodly Orbit Line connecting the 5 Wish Planets */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 50"
          className="absolute inset-0 w-full h-full pointer-events-none text-pink-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        >
          <path d="M 32 25 Q 115 6, 200 25 T 368 25" />
        </svg>

        {wishes.map((w, idx) => {
          const isCurrent = idx === activeIdx;
          const isUnlocked = unlockedIds.includes(w.id);

          return (
            <motion.button
              key={w.id}
              type="button"
              onClick={() => handleSelectWish(idx)}
              aria-label={`#${idx + 1} — ${w.title}`}
              aria-pressed={isCurrent}
              animate={
                shouldReduceMotion
                  ? {}
                  : isCurrent
                  ? { y: [-3, 3, -3], scale: 1.15 }
                  : { y: [0, -4, 0], scale: 1 }
              }
              transition={{
                duration: 2.4 + idx * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${w.planetColor} flex items-center justify-center shadow-lg border-2 cursor-pointer transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                isCurrent
                  ? 'border-slate-900 ring-4 ring-pink-300'
                  : isUnlocked
                  ? 'border-white opacity-95'
                  : 'border-white/80 opacity-75 hover:opacity-100'
              }`}
            >
              {renderWishIcon(w.icon)}
              <span className="absolute -bottom-5 text-[11px] font-bold text-slate-700 bg-white/90 px-1.5 rounded-full border border-pink-200">
                #{idx + 1}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Wish Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWish.id}
          initial={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 18 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -18 }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative bg-white/95 backdrop-blur-md p-7 sm:p-9 rounded-3xl shadow-[0_20px_50px_rgba(244,114,182,0.22)] border-2 border-amber-200 text-center w-full"
        >
          {/* Hand-drawn Doodle Frame Corners */}
          <div
            aria-hidden="true"
            className="absolute inset-3 border-2 border-dashed border-pink-200 rounded-2xl pointer-events-none"
          />

          <div
            className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${activeWish.planetColor} flex items-center justify-center shadow-md`}
          >
            {renderWishIcon(activeWish.icon)}
          </div>

          <h3 className="font-handwriting text-3xl sm:text-4xl font-bold text-rose-600 mb-3 relative z-10">
            {activeWish.title}
          </h3>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium relative z-10">
            &ldquo;{activeWish.message}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between w-full mt-6">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 font-bold text-sm shadow-sm border border-pink-200 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>

        <span className="text-sm font-bold text-slate-600">
          Wish {activeIdx + 1} of {wishes.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
        >
          <span>{activeIdx === wishes.length - 1 ? 'Birthday Cake 🎂' : 'Next Wish'}</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

