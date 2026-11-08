'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface SceneStep {
  id: number;
  label: string;
}

interface ProgressIndicatorProps {
  scenes: SceneStep[];
  currentScene: number;
  onSelectScene: (sceneId: number) => void;
}

export function ProgressIndicator({
  scenes,
  currentScene,
  onSelectScene,
}: ProgressIndicatorProps) {
  const progressPercentage = Math.min(
    100,
    Math.max(0, (currentScene / (scenes.length - 1)) * 100)
  );

  return (
    <nav
      aria-label="Storybook scenes progress"
      className="w-full max-w-lg mx-auto px-4 z-10"
    >
      <div className="flex items-center justify-between gap-1 mb-2">
        {scenes.map((scene) => {
          const isActive = scene.id === currentScene;
          const isCompleted = scene.id < currentScene;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSelectScene(scene.id)}
              aria-current={isActive ? 'step' : undefined}
              className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                isActive
                  ? 'bg-pink-500 text-white shadow-sm scale-105'
                  : isCompleted
                  ? 'bg-pink-100 text-rose-700 hover:bg-pink-200'
                  : 'bg-white/75 text-slate-600 hover:bg-white'
              }`}
            >
              {scene.label}
            </button>
          );
        })}
      </div>

      <div className="h-2 w-full bg-pink-100/90 rounded-full overflow-hidden p-0.5 shadow-inner border border-pink-200">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-amber-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </nav>
  );
}

