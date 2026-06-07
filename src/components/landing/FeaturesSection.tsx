'use client';

import { FEATURES } from '@/lib/landing-data';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden"
      style={{ background: '#fafafa' }}
    >
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Core Features"
            centered
            title={
              <>
                Six features. One platform.
                <br />
                <span className="gradient-text">Whole-journey recovery.</span>
              </>
            }
            subtitle="Every feature was designed around a real patient need — not a boardroom checklist. Nothing is there for show."
          />
        </Reveal>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.07}>
              <div
                className="group relative bg-white rounded-[24px] p-7 h-full overflow-hidden cursor-default"
                style={{
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'var(--shadow-glow)';
                  el.style.transform = 'translateY(-6px)';
                  el.style.borderColor = 'rgba(92,96,245,0.22)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'var(--shadow-card)';
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(0,0,0,0.06)';
                }}
              >
                {/* Top gradient line — expands on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: 'linear-gradient(90deg,#4338ca,#5c60f5,#7c3aed)' }}
                />

                {/* Tag pill */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-brand bg-brand-light border border-brand/15 px-2.5 py-0.5 rounded-full mb-4">
                  {feature.tag}
                </span>

                {/* Icon */}
                <div className="relative w-fit mb-5">
                  <div
                    className={`w-[52px] h-[52px] rounded-[15px] ${feature.iconBg} flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-bricolage)] text-[18px] font-black text-gray-900 mb-2.5 tracking-tight leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[13.5px] text-gray-500 leading-[1.7]">{feature.desc}</p>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-28 h-28 rounded-tl-full bg-brand/0 group-hover:bg-brand/[0.04] transition-all duration-500 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
