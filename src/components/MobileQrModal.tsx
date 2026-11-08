'use client';

import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Smartphone, Copy, Check, X, Sparkles } from 'lucide-react';
import { birthdayData } from '@/content/birthday';

interface MobileQrModalProps {
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export function MobileQrModal({
  isMobileFrame,
  onToggleMobileFrame,
}: MobileQrModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [mobileUrl, setMobileUrl] = useState<string>(birthdayData.localMobileUrl);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(mobileUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#881337',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, [mobileUrl]);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mobileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Mobile Frame Toggle (visible on desktop screens) */}
      <button
        type="button"
        onClick={onToggleMobileFrame}
        aria-pressed={isMobileFrame}
        className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs shadow-xs border-2 border-violet-200 text-violet-900 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Smartphone className="w-4 h-4 text-violet-600" aria-hidden="true" />
        <span>{isMobileFrame ? 'Exit Phone Frame' : 'Phone View'}</span>
      </button>

      {/* Open QR Code Dialog Trigger */}
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <QrCode className="w-4 h-4" aria-hidden="true" />
        <span>Mobile QR</span>
      </button>

      {/* Native Accessible Modal Dialog */}
      <dialog
        ref={dialogRef}
        aria-labelledby="qr-dialog-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
        className="m-auto rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border-2 border-pink-200 max-w-sm w-[92vw] text-center backdrop:bg-slate-900/55 backdrop:backdrop-blur-xs"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Tomorrow · {birthdayData.birthdayDate}</span>
          </span>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close QR Code modal"
            className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-rose-700 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <h2
          id="qr-dialog-title"
          className="font-handwriting text-3xl font-bold text-rose-700 mb-1"
        >
          Scan to Open Anywhere 📱
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          Anyone with this link or QR code can view Dawa&apos;s Birthday Universe on their phone or browser:
        </p>

        <div className="mx-auto w-56 h-56 p-3 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-amber-50 border-2 border-pink-200 shadow-inner flex items-center justify-center mb-4">
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt={`QR code for ${mobileUrl}`}
              className="w-full h-full object-contain rounded-xl"
            />
          )}
        </div>

        <div className="bg-slate-50 border border-pink-200 rounded-xl p-2.5 mb-4 flex items-center justify-between gap-2">
          <code className="text-xs font-bold text-rose-800 truncate select-all">
            {mobileUrl}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={closeModal}
          className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
        >
          Done
        </button>
      </dialog>
    </>
  );
}

