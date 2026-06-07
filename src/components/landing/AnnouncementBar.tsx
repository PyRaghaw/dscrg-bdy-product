'use client';

import { useState } from 'react';
import { PARTNER_LOGOS } from '@/lib/landing-data';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className="relative z-[300] flex items-center justify-center gap-3 px-4 py-2.5 text-white text-[13px] font-medium animate-announcement overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #4338ca 0%, #5c60f5 50%, #7c3aed 100%)',
        backgroundSize: '200% auto',
        animation: 'announcement-slide 0.5s cubic-bezier(0.16,1,0.3,1) both, shimmer 5s linear infinite',
      }}
    >
      {/* Star particles */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
          🏆 New
        </span>
        <span>
          We won <strong>Google Solution Challenge 2026.</strong> Thank you to our 2,400+ beta users.
        </span>
        <a
          href="#download"
          className="hidden sm:inline-flex items-center gap-1 text-white/80 hover:text-white underline underline-offset-2 text-[12px] transition-colors"
        >
          Get early access →
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 text-white/60 hover:text-white transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

export function LogosStrip() {
  return (
    <div className="border-y border-black/[0.06] bg-gray-50/80 py-5 overflow-hidden">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">
        Trusted by patients recovering at
      </p>
      {/* Marquee */}
      <div className="relative flex">
        <div className="flex animate-ticker whitespace-nowrap gap-0" aria-hidden>
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-2 mx-6 text-[14px] font-semibold text-gray-400 hover:text-gray-700 transition-colors cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
