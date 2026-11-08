'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { birthdayData } from '@/content/birthday';
import { Starfield } from '@/components/Starfield';
import { DoodleLayer } from '@/components/DoodleLayer';
import { Envelope } from '@/components/Envelope';
import { BirthdayReveal } from '@/components/BirthdayReveal';
import { PhotoMemory } from '@/components/PhotoMemory';
import { WishPage } from '@/components/WishPage';
import { CandleCake } from '@/components/CandleCake';
import { Finale } from '@/components/Finale';
import { MusicToggle } from '@/components/MusicToggle';
import { MobileQrModal } from '@/components/MobileQrModal';
import { ProgressIndicator, SceneStep } from '@/components/ProgressIndicator';

const SCENES: SceneStep[] = [
  { id: 0, label: '1. Envelope' },
  { id: 1, label: '2. Reveal' },
  { id: 2, label: '3. 28 Photos' },
  { id: 3, label: '4. Wishes' },
  { id: 4, label: '5. Cake' },
  { id: 5, label: '6. Finale' },
];

export default function BirthdayStorybookPage() {
  const [scene, setScene] = useState<number>(0);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [bubblesPopped, setBubblesPopped] = useState<number>(0);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  const handleSelectPhoto = useCallback((idx: number) => {
    setPhotoIndex(idx);
  }, []);

  // Keyboard navigation for scenes and photos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (scene === 2) {
          if (photoIndex < birthdayData.photos.length - 1) {
            setPhotoIndex((p) => p + 1);
          } else {
            setScene(3);
          }
        } else if (scene > 0 && scene < 5) {
          setScene((s) => s + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (scene === 2) {
          if (photoIndex > 0) {
            setPhotoIndex((p) => p - 1);
          } else {
            setScene(1);
          }
        } else if (scene > 1) {
          setScene((s) => s - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene, photoIndex]);

  const handleReplay = () => {
    setPhotoIndex(0);
    setScene(0);
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-amber-50 via-pink-50/75 to-violet-100/80 text-slate-800 flex flex-col justify-between relative overflow-x-clip">
      {/* Interactive Flying Star Bubbles & Cosmic Starfield */}
      <Starfield
        onBubblePop={() => setBubblesPopped((c) => c + 1)}
        bubblesPoppedCount={bubblesPopped}
      />

      {/* Animated Hand-Drawn SVG Doodly Background Lines */}
      <DoodleLayer step={scene * 10 + photoIndex} />

      {/* Top Header Landmark with Single Page H1, 9th of November Badge, QR Modal & Music Toggle */}
      <header className="w-full p-2.5 sm:p-3.5 sm:px-6 flex flex-wrap items-center justify-between gap-2 z-20 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border-2 border-pink-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
          <h1 className="font-handwriting text-lg sm:text-2xl font-bold text-rose-700">
            {birthdayData.friendName} · {birthdayData.birthdayDate}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div
            aria-live="polite"
            className="px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border-2 border-amber-200 text-xs font-bold text-amber-800 shadow-xs"
          >
            🫧 Bubbles: {bubblesPopped}
          </div>
          <MobileQrModal
            isMobileFrame={isMobileFrame}
            onToggleMobileFrame={() => setIsMobileFrame((v) => !v)}
          />
          <MusicToggle />
        </div>
      </header>

      {/* Main Content Area Landmark (Supports Mobile Phone Frame Preview on Desktop) */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-2 sm:py-4 z-10 px-2">
        <div
          className={
            isMobileFrame
              ? 'w-full max-w-[390px] min-h-[720px] max-h-[82dvh] overflow-y-auto overscroll-y-contain rounded-[2.75rem] border-[10px] border-slate-900 bg-gradient-to-br from-amber-50/95 via-pink-50/95 to-violet-100/95 shadow-[0_25px_70px_rgba(15,23,42,0.35)] p-3 flex flex-col justify-between relative'
              : 'w-full flex flex-col items-center justify-center'
          }
        >
          {isMobileFrame && (
            <div
              aria-hidden="true"
              className="w-28 h-5 bg-slate-900 rounded-full mx-auto mb-3 shrink-0"
            />
          )}
          <AnimatePresence mode="wait">
            {scene === 0 && (
              <Envelope
                key="scene-envelope"
                friendName={birthdayData.friendName}
                birthdayDate={birthdayData.birthdayDate}
                onOpen={() => setScene(1)}
              />
            )}

            {scene === 1 && (
              <BirthdayReveal
                key="scene-reveal"
                data={birthdayData}
                onStartStorybook={() => setScene(2)}
              />
            )}

            {scene === 2 && (
              <PhotoMemory
                key="scene-photos"
                photos={birthdayData.photos}
                currentIndex={photoIndex}
                onSelectIndex={handleSelectPhoto}
                onCompleteGallery={() => setScene(3)}
                onPrevScene={() => setScene(1)}
              />
            )}

            {scene === 3 && (
              <WishPage
                key="scene-wishes"
                wishes={birthdayData.wishes}
                onNextScene={() => setScene(4)}
                onPrevScene={() => setScene(2)}
              />
            )}

            {scene === 4 && (
              <CandleCake
                key="scene-cake"
                friendName={birthdayData.friendName}
                onAllExtinguished={() => setScene(5)}
                onPrevScene={() => setScene(3)}
              />
            )}

            {scene === 5 && (
              <Finale
                key="scene-finale"
                data={birthdayData}
                bubblesPopped={bubblesPopped}
                onReplay={handleReplay}
              />
            )}
          </AnimatePresence>
          {isMobileFrame && (
            <div
              aria-hidden="true"
              className="w-32 h-1.5 bg-slate-900/40 rounded-full mx-auto mt-3 shrink-0"
            />
          )}
        </div>
      </main>

      {/* Bottom Footer Landmark with Interactive Scene Progress Bar */}
      <footer className="w-full py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-20">
        <ProgressIndicator
          scenes={SCENES}
          currentScene={scene}
          onSelectScene={(s) => setScene(s)}
        />
      </footer>
    </div>
  );
}

