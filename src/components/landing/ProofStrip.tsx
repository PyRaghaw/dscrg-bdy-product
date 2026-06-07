'use client';

import { useEffect, useRef, useState } from 'react';
import { PROOF_STATS } from '@/lib/landing-data';

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix = target.match(/[^0-9.]+$/)?.[0] ?? '';
    if (isNaN(num)) { setDisplay(target); return; }
    const dur = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      const cur = Math.round(ease * num * 10) / 10;
      setDisplay(`${prefix}${Number.isInteger(cur) ? cur : cur.toFixed(0)}${suffix}`);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return display;
}

function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const display = useCountUp(value, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center px-8 md:px-12 lg:px-14" style={{ animationDelay: `${delay}ms` }}>
      <div
        className="font-[family-name:var(--font-bricolage)] text-[clamp(36px,4.5vw,58px)] font-black leading-none mb-2"
        style={{
          background: 'linear-gradient(135deg,#818cf8,#a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {display}
      </div>
      <div className="w-6 h-[2px] mx-auto mb-3 rounded-full bg-white/20" />
      <div className="text-[12px] text-white/45 max-w-[130px] leading-snug tracking-wide">{label}</div>
    </div>
  );
}

export function ProofStrip() {
  return (
    <div
      className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#07070f 0%,#0e0c20 50%,#08080f 100%)' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 dot-grid-dark opacity-100 pointer-events-none" />
      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(92,96,245,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Eyebrow */}
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-10">
          The scale of the problem
        </p>

        <div className="flex justify-center flex-wrap items-center gap-0 px-5">
          {PROOF_STATS.map((item, i) => (
            <div key={item.value} className="flex items-center">
              <Stat value={item.value} label={item.label} delay={i * 120} />
              {i < PROOF_STATS.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-white/[0.07]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
