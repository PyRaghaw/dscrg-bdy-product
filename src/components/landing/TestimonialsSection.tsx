'use client';

import { TESTIMONIALS } from '@/lib/landing-data';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`sg-${i}`} x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" /><stop offset="1" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M8 1.5l1.8 3.7 4.1.6-3 2.9.7 4.1L8 10.8l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.5z"
            fill={`url(#sg-${i})`} />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-4">
          <SectionHeader
            eyebrow="Real Stories"
            centered
            title={
              <>
                People whose lives
                <br />
                <span className="gradient-text">got measurably better.</span>
              </>
            }
          />
        </Reveal>

        {/* NPS row */}
        <Reveal delay={0.1}>
          <div className="flex justify-center items-center gap-4 mb-14 md:mb-16 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/70 rounded-full px-4 py-1.5">
              <Stars count={5} />
              <span className="text-[13px] font-bold text-amber-700">4.9 / 5</span>
            </div>
            <span className="text-[13px] text-gray-400">·</span>
            <span className="text-[13px] text-gray-500 font-medium">2,400+ early access users</span>
            <span className="text-[13px] text-gray-400">·</span>
            <span className="text-[13px] text-gray-500 font-medium">Across India & Southeast Asia</span>
          </div>
        </Reveal>

        {/* Testimonial cards — center elevated */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className={`group relative bg-white rounded-[28px] p-7 md:p-8 flex flex-col overflow-hidden cursor-default ${
                  i === 1 ? 'lg:-translate-y-5' : ''
                }`}
                style={{
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: i === 1 ? 'var(--shadow-lift)' : 'var(--shadow-card)',
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-glow)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(92,96,245,0.15)';
                  (e.currentTarget as HTMLElement).style.transform = i === 1 ? 'translateY(calc(-1.25rem - 4px))' : 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = i === 1 ? 'var(--shadow-lift)' : 'var(--shadow-card)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = i === 1 ? 'translateY(-1.25rem)' : 'translateY(0)';
                }}
              >
                {/* Decorative quote */}
                <div
                  className="absolute top-3 right-5 font-[family-name:var(--font-bricolage)] text-[88px] leading-none font-black select-none pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg,#5c60f5,#7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.06,
                  }}
                  aria-hidden
                >
                  "
                </div>

                <Stars count={t.stars} />

                <p className="text-[14.5px] text-gray-600 leading-[1.75] flex-1 mb-6 font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  {/* Gradient avatar ring */}
                  <div className="w-10 h-10 rounded-full shrink-0 p-[2px]"
                    style={{ background: 'linear-gradient(135deg,#5c60f5,#7c3aed)' }}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-[family-name:var(--font-bricolage)] text-[13px] font-black text-brand">
                      {t.initials}
                    </div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-bricolage)] text-[14px] font-bold text-gray-900">{t.name}</div>
                    <div className="text-[12px] text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
