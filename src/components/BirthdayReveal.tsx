'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight, Stars } from 'lucide-react';
import { BirthdayContent } from '@/content/birthday';

interface BirthdayRevealProps {
  data: BirthdayContent;
  onStartStorybook: () => void;
}

export function BirthdayReveal({ data, onStartStorybook }: BirthdayRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex flex-col items-center text-center max-w-xl mx-auto px-6 py-8 sm:p-10 bg-white/85 backdrop-blur-md rounded-3xl shadow-[0_24px_60px_rgba(244,114,182,0.22)] border-2 border-pink-200 z-10"
    >
      {/* Gathering Constellation Stars Around Name */}
      <div className="relative mb-5 flex items-center justify-center">
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 8, -8, 0], scale: [1, 1.07, 1] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-tr from-pink-500 via-amber-300 to-violet-500 shadow-lg"
        >
          <img
            src={data.photos[0].src}
            alt={data.photos[0].alt}
            fetchPriority="high"
            className="w-full h-full object-cover rounded-full border-2 border-white"
          />
        </motion.div>

        <motion.div
          animate={shouldReduceMotion ? {} : { y: [-4, 4, -4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -top-2 -right-3 bg-amber-400 text-slate-900 p-2 rounded-full shadow-md border-2 border-white"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
        </motion.div>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [4, -4, 4] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="absolute -bottom-1 -left-3 bg-pink-500 text-white p-2 rounded-full shadow-md border-2 border-white"
        >
          <Stars className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </div>

      {/* 9th of November Celebration Pill */}
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
        <span>Celebrating Tomorrow · {data.birthdayDate}</span>
      </span>

      {/* Scene Heading */}
      <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2 font-handwriting tracking-wide">
        {data.titleHeadline}
      </h2>

      {/* Animated Hand-Drawn Doodle Underline */}
      <svg
        aria-hidden="true"
        viewBox="0 0 280 26"
        className="w-56 sm:w-72 h-6 text-pink-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <motion.path
          d="M8 16 Q 75 4, 142 15 T 272 11"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <motion.path
          d="M42 22 Q 140 12, 238 21"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
          stroke="#f59e0b"
          strokeWidth="2.5"
        />
      </svg>

      <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
        {data.titleSubtext}
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-7 text-xs sm:text-sm font-semibold">
        <span className="px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
          📸 {data.photos.length} Photo Memories
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          🫧 Interactive Star Bubbles
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
          🎂 Make-a-Wish Birthday Cake
        </span>
      </div>

      <button
        type="button"
        onClick={onStartStorybook}
        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-pink-500 cursor-pointer text-base sm:text-lg"
      >
        <span>Explore {data.friendName}&apos;s 28 Memories</span>
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </motion.div>
  );
}
