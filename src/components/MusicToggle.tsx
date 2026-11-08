'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { birthdayData } from '@/content/birthday';

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(birthdayData.musicSrc || '/audio/music.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback prevented:', err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-pressed={isPlaying}
      className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs shadow-sm border-2 border-pink-200 text-slate-800 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-rose-500 music-pulse-indicator" aria-hidden="true" />
          <span className="text-xs font-bold">Music On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-slate-500" aria-hidden="true" />
          <span className="text-xs font-bold">Play Music</span>
        </>
      )}
    </button>
  );
}

