'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function DoodleLayer({ step = 0 }: { step?: number }) {
  const shouldReduceMotion = useReducedMotion();

  const drawTransition = {
    duration: shouldReduceMotion ? 0 : 1.5,
    ease: 'easeInOut' as const,
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Top-Left Hand-Drawn Star & Loop Doodle */}
      <motion.svg
        key={`tl-${step}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.72, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-4 sm:top-10 sm:left-10 w-24 h-24 sm:w-36 sm:h-36 text-amber-400"
        viewBox="0 0 140 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M12 95 C 32 40, 68 25, 95 55 C 110 72, 85 95, 72 78 C 58 60, 88 22, 128 18"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
          strokeDasharray="4 4"
        />
        <motion.path
          d="M116 8 L120 18 L130 22 L120 26 L116 36 L112 26 L102 22 L112 18 Z"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.25 }}
        />
      </motion.svg>

      {/* Top-Right Hand-Drawn Heart & Squiggle Trail */}
      <motion.svg
        key={`tr-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.6 }}
        className="absolute top-12 right-4 sm:top-16 sm:right-12 w-24 h-28 sm:w-36 sm:h-36 text-pink-400"
        viewBox="0 0 140 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M70 46 C 55 24, 22 32, 32 60 C 40 82, 70 98, 70 108 C 70 98, 100 82, 108 60 C 118 32, 85 24, 70 46 Z"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
        <motion.path
          d="M22 118 Q 48 104, 72 122 T 124 114"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.3 }}
        />
      </motion.svg>

      {/* Bottom-Left Hand-Drawn Swirl & Sparkle Line */}
      <motion.svg
        key={`bl-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-14 left-4 sm:bottom-16 sm:left-12 w-28 h-28 sm:w-40 sm:h-40 text-violet-400"
        viewBox="0 0 150 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <motion.path
          d="M15 120 C 35 65, 95 70, 85 105 C 78 128, 45 118, 56 90 C 68 60, 118 55, 138 25"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
        <circle cx="138" cy="25" r="4" fill="currentColor" />
      </motion.svg>

      {/* Bottom-Right Hand-Drawn Constellation Squiggle */}
      <motion.svg
        key={`br-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-16 right-4 sm:bottom-20 sm:right-12 w-28 h-28 sm:w-36 sm:h-36 text-rose-400"
        viewBox="0 0 140 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M18 110 L 52 74 L 88 92 L 122 36"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
          strokeDasharray="6 5"
        />
        <circle cx="18" cy="110" r="4" fill="currentColor" />
        <circle cx="52" cy="74" r="4.5" fill="#fbbf24" />
        <circle cx="88" cy="92" r="4" fill="currentColor" />
        <circle cx="122" cy="36" r="5" fill="#fbbf24" />
      </motion.svg>
    </div>
  );
}

/**
 * Hand-drawn animated SVG doodly ornaments that sketch around each photo transition!
 */
export function PhotoDoodleFrame({
  doodleType,
  photoId,
}: {
  doodleType: 'star-trail' | 'heart-loop' | 'crown-sparkle' | 'spiral-wave';
  photoId: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-4 sm:-inset-6 z-20 overflow-visible"
    >
      {/* Top-Left Hand-Drawn Corner Squiggle & Crown/Star */}
      <motion.svg
        key={`corner-tl-${photoId}`}
        viewBox="0 0 120 120"
        className="absolute -top-5 -left-5 w-20 h-20 sm:w-24 sm:h-24 text-amber-400 drop-shadow-sm"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {doodleType === 'crown-sparkle' && (
          <motion.path
            d="M18 65 L14 32 L36 48 L52 22 L68 48 L90 32 L82 65 Z"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )}
        {doodleType === 'star-trail' && (
          <motion.path
            d="M14 78 C 24 44, 52 24, 88 18 M88 18 L78 12 M88 18 L80 28"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
        )}
        {doodleType === 'heart-loop' && (
          <motion.path
            d="M48 36 C 36 18, 12 26, 22 48 C 30 64, 48 76, 48 84 C 48 76, 66 64, 74 48 C 84 26, 60 18, 48 36 Z"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="text-rose-400"
          />
        )}
        {doodleType === 'spiral-wave' && (
          <motion.path
            d="M16 74 Q 28 28, 62 42 T 98 20"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="text-violet-500"
          />
        )}
      </motion.svg>

      {/* Bottom-Right Animated Hand-Drawn Loop Connector Line */}
      <motion.svg
        key={`corner-br-${photoId}`}
        viewBox="0 0 160 110"
        className="absolute -bottom-6 -right-4 w-28 h-20 sm:w-36 sm:h-24 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M12 88 C 52 96, 86 68, 72 48 C 60 32, 42 54, 64 72 C 88 90, 126 66, 146 24"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.05, ease: 'easeInOut' }}
        />
        <motion.path
          d="M138 14 L148 22 L136 30"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </motion.svg>
    </div>
  );
}

