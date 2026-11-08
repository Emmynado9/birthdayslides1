'use client';

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, PartyPopper } from 'lucide-react';
import { BirthdayContent } from '@/content/birthday';
import { ShareButton } from './ShareButton';

interface FinaleProps {
  data: BirthdayContent;
  bubblesPopped: number;
  onReplay: () => void;
}

export function Finale({ data, bubblesPopped, onReplay }: FinaleProps) {
  const shouldReduceMotion = useReducedMotion();

  const triggerFireworks = () => {
    if (shouldReduceMotion) return;
    confetti({
      particleCount: 95,
      spread: 85,
      origin: { y: 0.55 },
      colors: ['#f472b6', '#fbbf24', '#60a5fa', '#a78bfa', '#34d399'],
    });
  };

  useEffect(() => {
    if (!shouldReduceMotion) {
      const duration = 2.8 * 1000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f472b6', '#fbbf24', '#60a5fa', '#a78bfa'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f472b6', '#fbbf24', '#60a5fa', '#a78bfa'],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [shouldReduceMotion]);

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 18 }
      }
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="flex flex-col items-center text-center max-w-xl mx-auto px-6 py-8 sm:p-10 bg-white/92 backdrop-blur-md rounded-3xl shadow-[0_24px_65px_rgba(244,114,182,0.28)] border-2 border-pink-200 z-10"
    >
      {/* Featured Finale Portrait Ring */}
      <div className="relative mb-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-500 shadow-lg">
          <img
            src={data.photos[data.photos.length - 1].src}
            alt={data.photos[data.photos.length - 1].alt}
            className="w-full h-full object-cover rounded-full border-2 border-white"
          />
        </div>
        <button
          type="button"
          onClick={triggerFireworks}
          aria-label="Launch extra birthday confetti"
          className="absolute -bottom-2 -right-2 bg-amber-400 hover:bg-amber-300 text-slate-900 p-2.5 rounded-full shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
        >
          <PartyPopper className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
        Happy Birthday, {data.friendName}!
      </h2>

      {/* Hand-drawn Doodle Divider */}
      <svg
        aria-hidden="true"
        viewBox="0 0 220 20"
        className="w-48 h-5 text-pink-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M 10 10 Q 55 2, 110 10 T 210 10" />
      </svg>

      <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
        {data.finalMessage}
      </p>

      {/* Interactive Journey Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs font-bold">
        <span className="px-3 py-1.5 rounded-full bg-pink-50 text-rose-700 border border-pink-200">
          ✨ {data.photos.length} Memories Celebrated
        </span>
        <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          🫧 {bubblesPopped} Star Bubbles Popped
        </span>
        <span className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
          🎂 5 Wishes Sent to the Stars
        </span>
      </div>

      <div className="mb-7 text-right w-full px-4 border-t border-pink-100 pt-4">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
          With warm birthday love,
        </p>
        <p className="font-handwriting text-3xl text-rose-600 font-bold mt-0.5">
          {data.senderName}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <ShareButton />
        <button
          type="button"
          onClick={triggerFireworks}
          className="inline-flex items-center gap-2 px-5 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full font-bold shadow-xs border-2 border-amber-300 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-600" aria-hidden="true" />
          <span>More Confetti!</span>
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-bold shadow-md transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Replay Storybook</span>
        </button>
      </div>
    </motion.div>
  );
}

