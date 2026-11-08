'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { birthdayData } from '@/content/birthday';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `Happy Birthday, ${birthdayData.friendName}!`,
      text: `Celebrate ${birthdayData.friendName}'s Birthday Universe & Storybook!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-pink-50 text-slate-800 rounded-full font-bold shadow-sm border-2 border-pink-200 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-rose-500" aria-hidden="true" />
          <span>Share Universe</span>
        </>
      )}
    </button>
  );
}

