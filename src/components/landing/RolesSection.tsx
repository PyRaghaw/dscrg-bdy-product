'use client';

import { ROLES } from '@/lib/landing-data';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

const ACCENTS = [
  { gradient: 'linear-gradient(135deg,#5c60f5,#7c3aed)', glow: 'rgba(92,96,245,0.12)',  badge: 'text-brand bg-brand-light border-brand/20' },
  { gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)', glow: 'rgba(59,130,246,0.12)',  badge: 'text-blue-600 bg-blue-50 border-blue-200/60' },
  { gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)', glow: 'rgba(245,158,11,0.12)',  badge: 'text-amber-700 bg-amber-50 border-amber-200/60' },
];

export function RolesSection() {
  return (
    <section
      id="roles"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden"
      style={{ background: '#fafafa' }}
    >
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Who It's For"
            centered
            title={
              <>
                Built for every person
                <br />
                in the{' '}
                <span className="gradient-text">care circle.</span>
              </>
            }
            subtitle="One platform. Three distinct experiences. Each role gets exactly the tools they need — and nothing they don't."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROLES.map((role, i) => {
            const a = ACCENTS[i];
            return (
              <Reveal key={role.name} delay={i * 0.12}>
                <div
                  className="group relative bg-white rounded-[32px] p-8 md:p-10 h-full overflow-hidden cursor-default"
                  style={{
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-6px)';
                    el.style.boxShadow = `0 0 0 1px rgba(92,96,245,0.15), 0 24px 60px ${a.glow}`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'var(--shadow-card)';
                  }}
                >
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[32px]"
                    style={{ background: a.gradient }} />

                  {/* Avatar */}
                  <div className="relative w-fit mb-6">
                    <div
                      className="absolute -inset-2 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-sm"
                      style={{ background: a.glow }}
                    />
                    <div
                      className={`w-[60px] h-[60px] rounded-[18px] ${role.avatarBg} flex items-center justify-center text-[26px] group-hover:scale-108 transition-transform duration-300 relative`}
                    >
                      {role.avatar}
                    </div>
                  </div>

                  {/* Tag */}
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full border mb-3 ${a.badge}`}>
                    {role.tag}
                  </span>

                  <h3 className="font-[family-name:var(--font-bricolage)] text-[21px] font-black text-gray-900 mb-1.5 tracking-tight leading-tight">
                    {role.name}
                  </h3>
                  <p className="text-[13px] font-semibold text-gray-400 mb-3">{role.headline}</p>
                  <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-6">{role.desc}</p>

                  <ul className="flex flex-col gap-2">
                    {role.perks.map((perk, j) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2.5 text-[13px] text-gray-500 pb-2 border-b border-gray-100 last:border-0 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                        style={{ transitionDelay: `${j * 45}ms` }}
                      >
                        <span
                          className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] text-white shrink-0 font-bold"
                          style={{ background: a.gradient }}
                        >
                          ✓
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* Corner glow */}
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle,${a.glow} 0%,transparent 70%)` }}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
