'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Sparkles, Stars } from 'lucide-react';

interface EnvelopeProps {
  friendName: string;
  birthdayDate: string;
  onOpen: () => void;
}

export function Envelope({ friendName, birthdayDate, onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(
      () => {
        onOpen();
      },
      shouldReduceMotion ? 100 : 1250
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[64dvh] sm:min-h-[72dvh] px-3 sm:px-4 w-full max-w-lg mx-auto">
      {/* Cosmic Delivery Badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-pink-200 shadow-sm text-rose-700 text-xs sm:text-sm font-bold"
      >
        <Stars className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
        <span>🎂 Birthday Special · Tomorrow, {birthdayDate}!</span>
      </motion.div>

      <motion.button
        type="button"
        onClick={handleOpen}
        aria-label={`Open birthday envelope and universe for ${friendName}`}
        className="relative group cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pink-500 rounded-2xl p-2"
        whileHover={shouldReduceMotion ? {} : { scale: 1.03, rotate: -0.5 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      >
        {/* Hand-drawn Doodle Arrow pointing to Envelope */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 60"
          className="hidden sm:block absolute -left-24 top-4 w-24 h-14 text-pink-500 -rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 42 C 38 10, 72 12, 104 32" strokeDasharray="4 4" />
          <path d="M94 22 L106 33 L92 40" />
        </svg>

        {/* Envelope Container */}
        <div className="relative w-76 h-52 sm:w-96 sm:h-64 bg-gradient-to-br from-pink-100 via-rose-100 to-amber-50 rounded-2xl shadow-[0_20px_50px_rgba(244,114,182,0.28)] border-2 border-pink-300 flex items-center justify-center">
          {/* Letter Inside */}
          <motion.div
            className="absolute w-[88%] h-[84%] bg-white rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-2 border-amber-200 z-10"
            animate={
              isOpening && !shouldReduceMotion
                ? { y: -96, scale: 1.06, rotate: -1 }
                : { y: 0, scale: 1, rotate: 0 }
            }
            transition={{
              duration: 0.75,
              delay: 0.3,
              type: 'spring',
              bounce: 0.35,
            }}
          >
            <Sparkles className="w-6 h-6 text-amber-400 mb-1" aria-hidden="true" />
            <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-bold">
              For {friendName} ✨
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              28 Memories · Flying Star Bubbles · Birthday Wishes
            </p>
          </motion.div>

          {/* Envelope Front Flaps (Left, Right, Bottom) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl"
          >
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-pink-200/90"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-rose-200/90"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-pink-300 to-pink-200 border-t border-pink-300"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          </div>

          {/* Envelope Top Flap */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-rose-300 to-pink-300 origin-top rounded-t-2xl shadow-sm"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              zIndex: isOpening ? 5 : 30,
            }}
            animate={
              isOpening && !shouldReduceMotion ? { rotateX: 180 } : { rotateX: 0 }
            }
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />

          {/* Interactive Wax Heart & Star Seal */}
          <motion.div
            className="absolute z-40 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200"
            animate={
              isOpening
                ? { opacity: 0, scale: 0 }
                : shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { scale: [1, 1.1, 1] }
            }
            transition={
              isOpening
                ? { duration: 0.2 }
                : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            }
          >
            <Heart className="w-7 h-7 text-white fill-white" aria-hidden="true" />
          </motion.div>
        </div>
      </motion.button>

      {/* Call to Action Text */}
      <motion.div
        className="mt-6 sm:mt-8 text-center px-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xl sm:text-2xl font-handwriting text-rose-700 font-bold">
          Special {birthdayDate} Delivery for {friendName}!
        </p>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Tap the envelope to open your Birthday Universe (and tap any flying star bubble!)
        </p>
      </motion.div>
    </div>
  );
}

