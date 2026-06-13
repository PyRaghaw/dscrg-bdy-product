'use client';

import { Reveal } from './ui/Reveal';
import { HoverRevealHeading } from './ui/HoverRevealHeading';

function AppleIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18.07 13.74c-.03-3.1 2.54-4.59 2.66-4.67-1.45-2.12-3.71-2.41-4.51-2.44-1.92-.2-3.75 1.14-4.72 1.14-.98 0-2.5-1.11-4.1-1.08C5.04 6.72 3.1 7.9 2.01 9.72c-2.19 3.79-.56 9.4 1.57 12.47 1.05 1.5 2.3 3.19 3.94 3.13 1.58-.06 2.18-1.02 4.09-1.02 1.91 0 2.46 1.02 4.12.99 1.7-.03 2.78-1.53 3.82-3.04 1.2-1.74 1.7-3.43 1.73-3.51-.04-.02-3.21-1.23-3.21-4.9zM14.85 4.39C15.74 3.3 16.33 1.79 16.17.27c-1.31.06-2.89.87-3.83 1.97-.84.96-1.57 2.5-1.37 3.97 1.46.11 2.96-.74 3.88-1.82z"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M.5 1.31C.5.58 1.29.16 1.9.52l19.2 10.7a1 1 0 010 1.76L1.9 23.48C1.29 23.84.5 23.42.5 22.69V1.31z" opacity=".9"/>
    </svg>
  );
}

export function CTASection() {
  return (
    <section id="download" className="py-[clamp(80px,10vw,130px)] px-5 md:px-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div
            className="relative rounded-[44px] px-8 md:px-20 py-16 md:py-28 text-center overflow-hidden noise"
            style={{
              background: 'linear-gradient(135deg,#3730a3 0%,#4338ca 25%,#5c60f5 55%,#7c3aed 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 60px 120px rgba(92,96,245,0.30), 0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            {/* Star particle dots */}
            <div className="absolute inset-0 dot-grid-dark opacity-30 pointer-events-none rounded-[44px]" />

            {/* Animated orbs */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 70%)', animation: 'gradient-shift 9s ease infinite' }}
            />
            <div className="absolute -bottom-48 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)' }}
            />

            {/* Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/80 text-[11px] font-bold uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot shrink-0" />
              Free · No credit card · Always private
            </div>

            {/* Headline */}
            <HoverRevealHeading
              as="h2"
              dark={true}
              imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
              className="relative z-10 font-[family-name:var(--font-bricolage)] text-[clamp(34px,5vw,68px)] font-black tracking-[-0.04em] text-white leading-[1.03] mb-5"
            >
              Start your smarter
              <br />
              recovery today.
            </HoverRevealHeading>

            <p className="relative z-10 text-[clamp(15px,1.5vw,19px)] text-white/65 max-w-[440px] mx-auto leading-[1.7] font-light mb-12">
              Join 2,400+ patients, families, and clinicians who've already taken the guesswork out of recovery.
            </p>

            {/* Store buttons */}
            <div className="relative z-10 flex gap-3.5 justify-center flex-wrap mb-9">
              {[
                { Icon: AppleIcon, top: 'Download on the', bottom: 'App Store'  },
                { Icon: PlayIcon,  top: 'Get it on',       bottom: 'Google Play' },
              ].map(({ Icon, top, bottom }) => (
                <a
                  key={bottom}
                  href="#"
                  className="flex items-center gap-3.5 rounded-[18px] px-6 py-3.5 text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
                  style={{ background: 'rgba(255,255,255,0.13)', border: '1.5px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(12px)' }}
                >
                  <Icon />
                  <div className="text-left">
                    <span className="text-[10px] text-white/55 uppercase tracking-wider block">{top}</span>
                    <span className="font-[family-name:var(--font-bricolage)] text-[16px] font-black block">{bottom}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Trust row */}
            <div className="relative z-10 flex justify-center items-center gap-5 flex-wrap">
              {['🔒 HIPAA-ready', '🛡️ End-to-end encrypted', '🌐 Works offline', '⭐ Free forever'].map(
                (item, i) => (
                  <span key={item} className="flex items-center gap-1.5 text-[12px] text-white/40">
                    {i > 0 && <span className="text-white/15 hidden sm:inline">·</span>}
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Wave to footer */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '64px' }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full" fill="#06060e" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 32 C180 64 360 0 540 32 C720 64 900 0 1080 32 C1260 64 1350 16 1440 32 L1440 64 L0 64 Z"/>
        </svg>
      </div>
    </section>
  );
}
