'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { birthdayData } from '@/content/birthday';

interface FloatingBubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  hue: string;
  driftX: number;
  popped?: boolean;
}

interface PopToast {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface StarfieldProps {
  onBubblePop?: () => void;
  bubblesPoppedCount?: number;
}

const BUBBLE_HUES = [
  'from-pink-400/35 via-rose-300/20 to-amber-200/40 border-pink-300/60',
  'from-amber-300/35 via-yellow-200/20 to-rose-300/40 border-amber-200/70',
  'from-violet-400/35 via-fuchsia-300/20 to-pink-200/40 border-violet-300/60',
  'from-cyan-300/35 via-sky-200/20 to-indigo-300/40 border-cyan-200/60',
];

const STATIC_STARS = Array.from({ length: 44 }, (_, i) => ({
  id: i,
  top: `${(i * 19 + 7) % 96}%`,
  left: `${(i * 31 + 11) % 97}%`,
  size: (i % 3) + 2,
  delay: (i % 7) * 0.4,
}));

export function Starfield({ onBubblePop }: StarfieldProps) {
  const shouldReduceMotion = useReducedMotion();
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const [toasts, setToasts] = useState<PopToast[]>([]);
  const [mounted, setMounted] = useState(false);

  const createBubbleBatch = useCallback((startId: number, count = 9): FloatingBubble[] => {
    return Array.from({ length: count }, (_, idx) => {
      const id = startId + idx;
      return {
        id,
        x: 6 + ((id * 13) % 86),
        size: 46 + ((id * 7) % 28),
        duration: 13 + ((id * 3) % 9),
        delay: (idx * 1.1) % 6,
        hue: BUBBLE_HUES[id % BUBBLE_HUES.length],
        driftX: (id % 2 === 0 ? 1 : -1) * (18 + (id % 24)),
      };
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    setBubbles(createBubbleBatch(1, 10));
  }, [createBubbleBatch]);

  const handlePopBubble = (
    bubble: FloatingBubble,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const msg =
      birthdayData.starBubbleMessages[
        bubble.id % birthdayData.starBubbleMessages.length
      ];

    const toastId = Date.now() + bubble.id;
    setToasts((prev) => [
      ...prev.slice(-4),
      {
        id: toastId,
        x: Math.min(Math.max(rect.left, 16), window.innerWidth - 220),
        y: Math.max(rect.top - 12, 60),
        text: msg,
      },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 2400);

    if (onBubblePop) {
      onBubblePop();
    }

    // Replace popped bubble with a fresh flying star bubble
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? {
              ...createBubbleBatch(Date.now() + Math.floor(Math.random() * 1000), 1)[0],
              delay: 0.2,
            }
          : b
      )
    );
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient Cosmic Nebulae */}
      <div
        aria-hidden="true"
        className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-rose-400/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-28 w-[28rem] h-[28rem] rounded-full bg-amber-300/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-violet-400/15 blur-3xl"
      />

      {/* Twinkling Starfield Dots */}
      <div aria-hidden="true" className="absolute inset-0">
        {STATIC_STARS.map((star) => (
          <motion.span
            key={star.id}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.55 }
                : { opacity: [0.25, 0.9, 0.25], scale: [1, 1.35, 1] }
            }
            transition={{
              duration: 3.4,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-amber-300/70 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
          />
        ))}
      </div>

      {/* Interactive Flying Star Bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((bubble) => (
          <motion.button
            key={bubble.id}
            type="button"
            onClick={(e) => handlePopBubble(bubble, e)}
            aria-label="Pop flying star bubble for a birthday sparkle"
            style={{
              left: `${bubble.x}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            initial={
              shouldReduceMotion
                ? { top: `${15 + (bubble.id % 70)}%`, opacity: 0.85 }
                : { top: '106%', opacity: 0, x: 0, scale: 0.85 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 0.85 }
                : {
                    top: '-12%',
                    opacity: [0, 0.92, 0.92, 0],
                    x: [0, bubble.driftX, -bubble.driftX * 0.6, bubble.driftX * 0.4],
                    scale: [0.85, 1.05, 0.95, 1.08],
                  }
            }
            whileHover={{ scale: 1.22 }}
            whileTap={{ scale: 0.65 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.3 }
                : {
                    duration: bubble.duration,
                    delay: bubble.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
            className={`pointer-events-auto absolute rounded-full bg-gradient-to-br ${bubble.hue} border backdrop-blur-[2px] shadow-[0_0_20px_rgba(244,114,182,0.35),inset_0_0_12px_rgba(255,255,255,0.65)] flex items-center justify-center cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500`}
          >
            {/* Bubble highlight gloss */}
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-2 w-2.5 h-1.5 rounded-full bg-white/75 -rotate-30"
            />
            {/* Hand-drawn doodle star inside the flying bubble */}
            <svg
              aria-hidden="true"
              viewBox="0 0 36 36"
              className="w-3/5 h-3/5 text-amber-500/90 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] group-hover:rotate-12 transition-transform"
              fill="currentColor"
              stroke="#be185d"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 3 C20 11, 25 14, 33 18 C25 21, 20 25, 18 33 C15 25, 11 21, 3 18 C11 14, 15 11, 18 3 Z" />
            </svg>
          </motion.button>
        ))}
      </div>

      {/* Popped Star Bubble Floating Compliments */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: -18, scale: 1 }}
            exit={{ opacity: 0, y: -38, scale: 0.9 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ left: toast.x, top: toast.y }}
            className="fixed z-50 pointer-events-none bg-white/95 text-rose-700 border-2 border-pink-300 px-3.5 py-1.5 rounded-full shadow-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
            <span>{toast.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

