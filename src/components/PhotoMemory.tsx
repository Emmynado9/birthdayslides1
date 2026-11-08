'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Grid,
  BookOpen,
  Play,
  Pause,
  ArrowRight,
  ImageIcon,
} from 'lucide-react';
import { PhotoItem } from '@/content/birthday';
import { PhotoDoodleFrame } from './DoodleLayer';

interface PhotoMemoryProps {
  photos: PhotoItem[];
  currentIndex: number;
  onSelectIndex: (index: number, direction: number) => void;
  onCompleteGallery: () => void;
  onPrevScene: () => void;
}

const CONSTELLATION_GROUPS: Array<PhotoItem['constellationGroup']> = [
  'Golden Dawn',
  'Radiant Joy',
  'Adventures',
  'Starlight Era',
];

export function PhotoMemory({
  photos,
  currentIndex,
  onSelectIndex,
  onCompleteGallery,
  onPrevScene,
}: PhotoMemoryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [direction, setDirection] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'storybook' | 'constellation'>('storybook');
  const [likedIds, setLikedIds] = useState<Record<string, number>>({});
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const photo = photos[currentIndex] || photos[0];
  const total = photos.length;

  useEffect(() => {
    if (!isAutoPlaying || viewMode !== 'storybook') return;
    const timer = setInterval(() => {
      if (currentIndex < total - 1) {
        setDirection(1);
        onSelectIndex(currentIndex + 1, 1);
      } else {
        setIsAutoPlaying(false);
      }
    }, 3400);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, currentIndex, total, onSelectIndex]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    if (currentIndex > 0) {
      setDirection(-1);
      onSelectIndex(currentIndex - 1, -1);
    } else {
      onPrevScene();
    }
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    if (currentIndex < total - 1) {
      setDirection(1);
      onSelectIndex(currentIndex + 1, 1);
    } else {
      onCompleteGallery();
    }
  };

  const handleJumpTo = (idx: number) => {
    setIsAutoPlaying(false);
    const dir = idx >= currentIndex ? 1 : -1;
    setDirection(dir);
    onSelectIndex(idx, dir);
    setViewMode('storybook');
  };

  const handleLikePhoto = (id: string) => {
    setLikedIds((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 42) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const cardVariants = {
    enter: (dir: number) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir > 0 ? 72 : -72,
            y: 12,
            rotate: dir > 0 ? 4 : -4,
            scale: 0.92,
          },
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: currentIndex % 2 === 0 ? -1.2 : 1.2,
      scale: 1,
    },
    exit: (dir: number) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir > 0 ? -72 : 72,
            y: -10,
            rotate: dir > 0 ? -4 : 4,
            scale: 0.92,
          },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-3 sm:px-4 z-10">
      {/* Top Controls Bar: Chapter Indicator + Mode Switcher + Auto-Play */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-pink-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-bold text-rose-700">
            Memory {currentIndex + 1} of {total}
          </span>
          <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
            {photo.constellationGroup}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {viewMode === 'storybook' && (
            <button
              type="button"
              onClick={() => setIsAutoPlaying((p) => !p)}
              aria-pressed={isAutoPlaying}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pause Glide</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Auto-Glide</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              setViewMode((m) => (m === 'storybook' ? 'constellation' : 'storybook'))
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          >
            {viewMode === 'storybook' ? (
              <>
                <Grid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Constellation Map (28)</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Storybook View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animated Hand-Drawn SVG Doodly Connector Bridge Between Memories */}
      <div aria-hidden="true" className="w-full max-w-md h-8 relative mb-1">
        <motion.svg
          key={`bridge-${photo.id}`}
          viewBox="0 0 360 32"
          className="w-full h-full text-pink-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        >
          <motion.path
            d={
              currentIndex % 2 === 0
                ? 'M 16 20 Q 95 4, 180 18 T 344 12'
                : 'M 16 12 Q 95 28, 180 14 T 344 22'
            }
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            strokeDasharray="6 5"
          />
          <circle cx="18" cy="16" r="4" fill="#f472b6" />
          <circle cx="180" cy="16" r="5" fill="#fbbf24" />
          <circle cx="342" cy="16" r="4" fill="#f472b6" />
        </motion.svg>
      </div>

      {viewMode === 'storybook' ? (
        <>
          {/* Polaroid Card with Directional Motion, Touch Swipe & Doodly Frame */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-md my-1 touch-pan-y"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={photo.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 0.85,
                }}
                className="relative bg-white p-4 sm:p-5 pb-6 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.14)] border-2 border-pink-100"
              >
                {/* Animated Hand-Drawn Doodly Frame Around the Photo */}
                <PhotoDoodleFrame doodleType={photo.doodleType} photoId={photo.id} />

                {/* Washi Tape Effect at Top */}
                <div
                  aria-hidden="true"
                  className="w-28 h-6 bg-amber-200/75 border border-amber-300/60 absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 rounded-sm shadow-xs z-20"
                />

                {/* Photo Container */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-100 mb-4 border border-slate-100">
                  {!failedIds[photo.id] ? (
                    <motion.img
                      key={`img-${photo.id}`}
                      src={photo.src}
                      alt={photo.alt}
                      fetchPriority="high"
                      onError={() =>
                        setFailedIds((prev) => ({ ...prev, [photo.id]: true }))
                      }
                      initial={shouldReduceMotion ? {} : { scale: 1.07 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-amber-100 p-6 text-center text-slate-700">
                      <ImageIcon className="mb-2 h-10 w-10 text-rose-400" aria-hidden="true" />
                      <p className="text-sm font-bold text-slate-800">
                        Memory #{currentIndex + 1} Placeholder
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Add <code className="rounded bg-white/80 px-1">{photo.src}</code>
                      </p>
                    </div>
                  )}

                  {/* Date / Era Pill */}
                  {photo.date && (
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-pink-200">
                      ✨ {photo.date}
                    </div>
                  )}

                  {/* Interactive Star-Heart Reaction Button */}
                  <button
                    type="button"
                    onClick={() => handleLikePhoto(photo.id)}
                    aria-label={`${(likedIds[photo.id] || 0) + 1} birthday love reactions — send love to this photo`}
                    className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-white/90 hover:bg-pink-50 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 shadow-sm border border-pink-200 cursor-pointer transition-transform active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                  >
                    <Heart
                      className="w-3.5 h-3.5 fill-rose-500 text-rose-500"
                      aria-hidden="true"
                    />
                    <span>{(likedIds[photo.id] || 0) + 1}</span>
                  </button>
                </div>

                {/* Handwritten Caption */}
                <p className="font-handwriting text-2xl sm:text-[1.7rem] text-slate-800 text-center px-2 leading-snug">
                  {photo.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Constellation Thumbnail Strip (All 28 Photos) */}
          <div className="w-full max-w-md mt-3 sm:mt-4 bg-white/75 backdrop-blur-xs p-2 rounded-2xl border border-pink-200 shadow-xs">
            <div
              role="region"
              aria-label="Photo memory strip"
              className="flex items-center gap-2 overflow-x-auto overscroll-x-contain py-1 px-1 scrollbar-thin"
            >
              {photos.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleJumpTo(idx)}
                    aria-label={`Jump to photo ${idx + 1}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative shrink-0 w-11 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                      isActive
                        ? 'border-pink-500 scale-110 shadow-md ring-2 ring-pink-300'
                        : 'border-white opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="sr-only">Memory {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Constellation Map Mode: All 28 Photos in 4 Star Constellations with Doodly Lines */
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border-2 border-pink-200 shadow-xl max-h-[60dvh] overflow-y-auto overscroll-y-contain"
        >
          <div className="text-center mb-4">
            <h2 className="font-handwriting text-3xl font-bold text-rose-700">
              Dawa&apos;s 28-Star Photo Constellation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tap any glowing memory star to glide smoothly into that moment
            </p>
          </div>

          <div className="space-y-6">
            {CONSTELLATION_GROUPS.map((group) => {
              const groupPhotos = photos
                .map((p, index) => ({ ...p, index }))
                .filter((p) => p.constellationGroup === group);

              return (
                <div
                  key={group}
                  className="relative p-3.5 rounded-2xl bg-gradient-to-br from-pink-50/80 via-white to-amber-50/70 border border-pink-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-handwriting text-xl font-bold text-rose-700 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
                      {group} Constellation
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {groupPhotos.length} Stars
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 relative z-10">
                    {groupPhotos.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleJumpTo(item.index)}
                        className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-transform hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                          item.index === currentIndex
                            ? 'border-pink-500 ring-2 ring-amber-300 shadow-md'
                            : 'border-white shadow-xs'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/75 via-slate-900/30 to-transparent p-1.5 text-left">
                          <span className="text-[11px] font-bold text-white">
                            #{item.index + 1} · {item.date}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Navigation Controls: Previous / Next Memory + Jump to Birthday Wishes */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-md mt-5 gap-2">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 font-bold text-sm shadow-sm border border-pink-200 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onCompleteGallery}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-100/90 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm border border-amber-300 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
        >
          <span>Skip to Wish Planets ✨</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
        >
          <span>{currentIndex === total - 1 ? 'Wishes' : 'Next Photo'}</span>
          {currentIndex === total - 1 ? (
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

