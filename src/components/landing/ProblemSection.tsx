'use client';

import { PROBLEM_CARDS } from '@/lib/landing-data';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function ProblemSection() {
  return (
    <section className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header — full width, centered */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <SectionHeader
            eyebrow="The Problem"
            centered
            title={
              <>
                The system sends patients home
                <br />
                <span className="gradient-text">completely unprepared.</span>
              </>
            }
            subtitle="Hospitals spend thousands on care. Then hand patients a 12-page packet they can't understand and wish them luck. The result is entirely predictable."
          />
        </Reveal>

        {/* 3-column editorial stat cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {PROBLEM_CARDS.map((card, i) => (
            <Reveal key={card.stat} delay={i * 0.12}>
              <div className="group relative bg-white rounded-[28px] p-8 md:p-10 overflow-hidden h-full"
                style={{
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-glow)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(92,96,245,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)';
                }}
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
                  style={{ background: 'linear-gradient(90deg,#4338ca,#5c60f5,#7c3aed)' }}
                />

                {/* Stat */}
                <div
                  className="font-[family-name:var(--font-bricolage)] text-[56px] font-black leading-none mb-3 tracking-[-0.04em]"
                  style={{
                    background: 'linear-gradient(135deg,#5c60f5 0%,#7c3aed 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {card.stat}
                </div>

                {/* Icon */}
                <div className="text-[28px] mb-4">{card.icon}</div>

                <h3 className="font-[family-name:var(--font-bricolage)] text-[19px] font-black text-gray-900 mb-3 tracking-tight leading-tight">
                  {card.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.75]">{card.desc}</p>

                {/* Corner brand tint */}
                <div className="absolute bottom-0 right-0 w-36 h-36 rounded-tl-full bg-brand/[0.03] pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom editorial line */}
        <Reveal delay={0.4}>
          <p className="text-center text-[15px] text-gray-400 font-light mt-12 max-w-xl mx-auto leading-relaxed">
            These aren't edge cases. They're what happens every single day.<br />
            <span className="text-gray-900 font-semibold">We built Discharge Buddy to stop this cycle.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
