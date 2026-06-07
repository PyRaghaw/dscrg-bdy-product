'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  src?: string;
  alt?: string;
  size?: 'main' | 'side' | 'step';
  className?: string;
  float?: 'main' | 'left' | 'right' | 'none';
  premium?: boolean;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const sizeMap = {
  main: { frame: 'w-[272px]', screen: 'min-h-[500px]' },
  side: { frame: 'w-[226px]', screen: 'min-h-[430px]' },
  step: { frame: 'w-[232px]', screen: 'min-h-[438px]' },
};

const floatMap = {
  main: 'animate-float-main',
  left: 'animate-float-side-l',
  right: 'animate-float-side-r',
  none: '',
};

export function PhoneFrame({
  src,
  alt = 'Phone preview',
  size = 'main',
  className,
  float = 'none',
  premium = false,
  title,
  subtitle,
  children,
}: PhoneFrameProps) {
  const dims = sizeMap[size];

  return (
    <div
      className={cn(
        'relative rounded-[56px] border border-white/25 bg-[linear-gradient(115deg,#f8fafc_0%,#8d97a5_12%,#1f2937_30%,#07090d_48%,#a8b0bd_72%,#f9fafb_100%)] p-[7px] transition-transform duration-300 hover:-translate-y-1.5',
        dims.frame,
        floatMap[float],
        premium
          ? 'shadow-[0_48px_110px_rgba(15,23,42,0.48),0_12px_34px_rgba(92,96,245,0.2)]'
          : 'shadow-[0_34px_80px_rgba(15,23,42,0.22),0_8px_24px_rgba(92,96,245,0.12)]',
        'before:pointer-events-none before:absolute before:inset-[2px] before:rounded-[52px] before:border before:border-white/10 before:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-8px_18px_rgba(0,0,0,0.32)]',
        'after:pointer-events-none after:absolute after:inset-[9px] after:rounded-[46px] after:border after:border-black/70',
        className
      )}
    >
      <div className="absolute -left-[3px] top-[88px] z-20 h-[32px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#cbd5e1,#334155,#020617)] shadow-[inset_1px_0_0_rgba(255,255,255,0.25)]" />
      <div className="absolute -left-[3px] top-[132px] z-20 h-[54px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#cbd5e1,#334155,#020617)] shadow-[inset_1px_0_0_rgba(255,255,255,0.25)]" />
      <div className="absolute -right-[3px] top-[112px] z-20 h-[78px] w-[4px] rounded-r-full bg-[linear-gradient(180deg,#f8fafc,#475569,#020617)] shadow-[inset_-1px_0_0_rgba(255,255,255,0.22)]" />
      <div className="rounded-[50px] bg-black p-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09),inset_0_10px_24px_rgba(255,255,255,0.08)]">
        <div className="rounded-[45px] bg-[linear-gradient(180deg,#030712_0%,#111827_52%,#020617_100%)] p-[3px]">
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-brand-light">
            <div className="pointer-events-none absolute inset-0 z-20 rounded-[40px] bg-[linear-gradient(110deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.03)_18%,transparent_38%,rgba(255,255,255,0.08)_100%)] opacity-50 mix-blend-screen" />
            <div className="absolute left-1/2 top-[10px] z-30 flex h-[30px] w-[104px] -translate-x-1/2 items-center justify-center rounded-full bg-black shadow-[0_8px_18px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <span className="absolute right-[14px] h-[7px] w-[7px] rounded-full bg-[#111827] ring-1 ring-white/10" />
              <span className="absolute right-[16px] h-[3px] w-[3px] rounded-full bg-sky-400/45" />
            </div>
            {premium && (title || subtitle) && (
              <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 bg-gradient-to-b from-black/45 to-transparent px-4 pb-10 pt-12 text-white">
                <div className="min-w-0">
                  {title && <p className="text-[10px] uppercase tracking-[0.26em] text-sky-100/80">{title}</p>}
                  {subtitle && <p className="mt-1 max-w-[160px] text-[12px] leading-snug text-white/90">{subtitle}</p>}
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/12 px-2 py-1 text-[10px] text-emerald-50 shadow-lg backdrop-blur-md">
                  Live
                </span>
              </div>
            )}
            {src ? (
              <div className={cn('relative', dims.screen)}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 220px, 260px"
                />
              </div>
            ) : (
              <div className={cn('relative overflow-hidden', dims.screen)}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
