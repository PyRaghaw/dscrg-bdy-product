'use client';

import { AI_MODELS } from '@/lib/landing-data';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

const careNodes = [
  { role: 'Daughter', initials: 'DU', x: 22, y: 28, color: '#ec4899', note: 'gets missed-dose alerts' },
  { role: 'Caregiver', initials: 'CG', x: 77, y: 24, color: '#22c55e', note: 'tracks daily adherence' },
  { role: 'Doctor', initials: 'DR', x: 83, y: 68, color: '#38bdf8', note: 'reviews risk flags' },
  { role: 'Mom', initials: 'MO', x: 28, y: 76, color: '#f59e0b', note: 'sees plain instructions' },
  { role: 'Dad', initials: 'DA', x: 50, y: 14, color: '#a78bfa', note: 'shares recovery timeline' },
];

export function AISection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-[clamp(80px,10vw,130px)] md:px-12"
      style={{ background: 'linear-gradient(165deg,#06060e 0%,#0d0b1e 55%,#070710 100%)' }}
    >
      <div className="absolute inset-0 dot-grid-dark opacity-100 pointer-events-none" />
      <div
        className="absolute -left-32 top-0 h-[700px] w-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(92,96,245,0.14) 0%,transparent 70%)' }}
      />
      <div
        className="absolute -right-20 bottom-0 h-[520px] w-[520px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.10) 0%,transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-[1220px] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <Reveal>
          <SectionHeader
            eyebrow="Connected Care"
            dark
            title={
              <>
                One recovery plan.
                <br />
                Everyone who matters
                <br />
                <span className="gradient-text">connected live.</span>
              </>
            }
            subtitle="VANI links the patient, daughter, caregiver, doctor, mom, and dad through one AI-assisted recovery network. Every alert, medicine, symptom, and timeline update moves to the right person."
          />

          <div className="mt-9 flex flex-wrap gap-2">
            {AI_MODELS.slice(0, 5).map((tag, i) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-1.5 font-mono text-[12px] font-semibold text-emerald-200 transition-all duration-200 hover:border-brand/40 hover:bg-brand/15 hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
                  style={{ backgroundColor: careNodes[i]?.color ?? '#5c60f5' }}
                />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 grid max-w-[520px] grid-cols-2 gap-3">
            {[
              ['24/7', 'family-visible status'],
              ['98%', 'prescription parsing accuracy'],
              ['Live', 'doctor risk escalation'],
              ['1 tap', 'caregiver check-in'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                <div className="font-[family-name:var(--font-bricolage)] text-2xl font-black text-white">{value}</div>
                <div className="mt-1 text-[12px] leading-snug text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} direction="right">
          <FamilyCareNetwork />
        </Reveal>
      </div>
    </section>
  );
}

function FamilyCareNetwork() {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-white/10 bg-black/45 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(92,96,245,0.24),transparent_54%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:28px_28px]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="careLine" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#5c60f5" stopOpacity="0.08" />
            <stop offset="0.5" stopColor="#a78bfa" stopOpacity="0.82" />
            <stop offset="1" stopColor="#22c55e" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {careNodes.map((node) => (
          <line
            key={node.role}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="url(#careLine)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            className="care-line-flow"
          />
        ))}
        <path
          d="M22 28 C48 8, 74 14, 77 24 C96 38, 92 64, 83 68 C70 94, 42 94, 28 76 C8 60, 10 38, 22 28"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.45"
          strokeDasharray="2 2"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/40 bg-brand/15 shadow-[0_0_70px_rgba(92,96,245,0.36)] backdrop-blur-xl">
        <div className="absolute inset-3 rounded-full border border-white/10" />
        <div className="absolute inset-0 rounded-full animate-avatar-pulse" />
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[20px] shadow-lg">🏥</div>
          <div className="font-[family-name:var(--font-bricolage)] text-sm font-black text-white">Patient Plan</div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/45">AI hub</div>
        </div>
      </div>

      {careNodes.map((node) => (
        <div
          key={node.role}
          className="group absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg,${node.color},#5c60f5)` }}
          >
            <span className="absolute inset-[-8px] rounded-full opacity-30 blur-md" style={{ backgroundColor: node.color }} />
            <span className="relative font-[family-name:var(--font-bricolage)] text-lg font-black">{node.initials}</span>
          </div>
          <div className="mt-3 min-w-[150px] rounded-2xl border border-white/10 bg-white/[0.075] px-3 py-2 text-center backdrop-blur-xl transition-all duration-300 group-hover:bg-white/[0.12]">
            <div className="font-[family-name:var(--font-bricolage)] text-[13px] font-black text-white">{node.role}</div>
            <div className="mt-0.5 text-[10px] leading-snug text-white/45">{node.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
