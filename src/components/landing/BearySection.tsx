'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MILESTONES } from '@/lib/landing-data';
import { RobotMeddy } from './RobotMeddy';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

const XP_COLORS = [
  { from: '#5c60f5', to: '#7c3aed' },
  { from: '#f97316', to: '#ef4444' },
  { from: '#f59e0b', to: '#d97706' },
  { from: '#10b981', to: '#059669' },
];

export function BearySection() {
  const [sectionElement, setSectionElement] = useState<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionElement ? { current: sectionElement } : undefined,
    offset: ["start end", "end start"]
  });
  // Smooth parallax translation from 60px down to -60px up
  const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section
      ref={setSectionElement}
      id="beary"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden"
    >
      {/* Warm ambient glow */}
      <div className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 100%, rgba(245,158,11,0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 60% at 80% 0%, rgba(92,96,245,0.05) 0%, transparent 60%),' +
            '#ffffff',
        }}
      />

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Card — Mr. Meddy */}
        <Reveal>
          <motion.div style={{ y: yParallax }} className="w-full">
            <div
              className="relative flex flex-col items-center text-center rounded-[40px] p-12 md:p-14 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg,#eef2ff 0%,#f5f3ff 40%,#fdf4ff 100%)',
                border: '1.5px solid rgba(92,96,245,0.18)',
                boxShadow: '0 24px 80px rgba(92,96,245,0.10), 0 2px 4px rgba(0,0,0,0.03)',
              }}
            >
              {/* Glow behind mascot */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full blur-[60px] bg-brand/20 pointer-events-none animate-glow-pulse" />

              {/* Noise texture */}
              <div className="absolute inset-0 rounded-[40px] noise opacity-60 pointer-events-none" />

              <div className="relative mb-5 animate-mascot-slide drop-shadow-[0_20px_44px_rgba(92,96,245,0.26)]">
                <RobotMeddy size="lg" />
              </div>

              <div className="font-[family-name:var(--font-bricolage)] text-[24px] font-black text-gray-900 mb-1 tracking-tight">
                Meet Mr. Meddy
              </div>
              <div className="text-[13px] text-gray-500 mb-8 font-medium">Your AI recovery companion · Always in your corner</div>

              {/* Game chip */}
              <div className="relative overflow-hidden inline-flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5 shadow-[0_6px_24px_rgba(92,96,245,0.15)] border border-brand/15 mb-5">
                <span className="font-[family-name:var(--font-bricolage)] text-[13px] font-black text-brand">🔥 7-Day Streak</span>
                <span className="w-px h-4 bg-gray-200" />
                <span className="font-[family-name:var(--font-bricolage)] text-[13px] font-black gradient-text">Level 4</span>
                <span className="w-px h-4 bg-gray-200" />
                <span className="font-[family-name:var(--font-bricolage)] text-[13px] font-black text-gray-700">720 XP</span>
                {/* Shimmer */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.65) 50%,transparent 65%)',
                    animation: 'shimmer 2.5s linear infinite',
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>

              {/* XP bar */}
              <div className="w-full max-w-[240px] h-[8px] bg-brand/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full animate-fill-bar"
                  style={{ background: 'linear-gradient(90deg,#4338ca,#5c60f5,#7c3aed)', backgroundSize: '200% auto', animation: 'fill-bar 1.8s cubic-bezier(0.16,1,0.3,1) 0.8s both, shimmer 3s linear infinite' }}
                />
              </div>
              <div className="text-[11px] text-gray-400 mt-2 font-medium tracking-wide">720 / 1000 XP — Level 5 soon ✨</div>
            </div>
          </motion.div>
        </Reveal>

        {/* Right — copy + milestones */}
        <Reveal delay={0.15}>
          <SectionHeader
            eyebrow="Gamified Recovery"
            title={
              <>
                Healing is hard.
                <br />
                It should feel{' '}
                <span className="gradient-text">rewarding.</span>
              </>
            }
            subtitle="Mr. Meddy celebrates every dose you take, every streak you build, and every milestone you reach. Because consistent recovery deserves more than a pill alarm."
          />

          <div className="mt-8 flex flex-col gap-3">
            {MILESTONES.map((item, i) => (
              <Reveal key={item.title} delay={0.22 + i * 0.09}>
                <div className="group flex items-center gap-4 bg-white rounded-2xl px-4 py-3.5 cursor-default transition-all duration-300 hover:-translate-x-px"
                  style={{
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-glow)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(92,96,245,0.18)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)';
                  }}
                >
                  <span className="text-[24px] group-hover:animate-confetti">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-[family-name:var(--font-bricolage)] text-[14px] font-bold text-gray-900">{item.title}</div>
                    <div className="text-[12px] text-gray-400 mt-0.5">{item.sub}</div>
                  </div>
                  <span
                    className="text-white text-[11px] font-black px-3 py-1 rounded-full font-[family-name:var(--font-bricolage)] shrink-0"
                    style={{ background: `linear-gradient(135deg,${XP_COLORS[i].from},${XP_COLORS[i].to})` }}
                  >
                    {item.xp}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
