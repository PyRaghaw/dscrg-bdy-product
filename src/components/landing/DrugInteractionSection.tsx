'use client';

import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';
import DrugMixer from './DrugMixer';
import DotField from '@/components/ui/DotField';
import { ShieldCheck, Database, HeartHandshake, HelpCircle } from 'lucide-react';

export function DrugInteractionSection() {
  return (
    <section
      id="drug-checker"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden border-b border-slate-200"
    >
      {/* Explicit background backdrop to support negative z-index stack */}
      <div className="absolute inset-0 bg-white -z-30 pointer-events-none" />

      {/* Dynamic interactive DotField background (reacts to cursor hover/bulge) */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-[0.75]">
        <DotField
          dotRadius={5.2}
          dotSpacing={24}
          gradientFrom="rgba(16, 185, 129, 0.50)" // Emerald Green (50% opacity)
          gradientTo="rgba(92, 96, 245, 0.40)"   // Indigo (40% opacity)
          cursorRadius={280}
          bulgeStrength={55}
          waveAmplitude={0} // Disables automatic waving movement
          glowColor="transparent"
        />
      </div>

      {/* Premium background mesh textures & gradient spot glows */}
      <div className="absolute inset-0 dot-grid opacity-[0.15] pointer-events-none -z-10" />
      
      {/* Decorative light grid line overlays */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />
      
      {/* Medical Emerald and Indigo Blur spotlights */}
      <div 
        className="absolute -right-40 top-12 h-[550px] w-[550px] rounded-full blur-[140px] pointer-events-none opacity-40 -z-10"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -left-40 bottom-12 h-[550px] w-[550px] rounded-full blur-[140px] pointer-events-none opacity-30 -z-10"
        style={{ background: 'radial-gradient(circle, rgba(92, 96, 245, 0.08) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1200px] mx-auto z-10">
        
        {/* Layout Columns */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Feature Description */}
          <div className="flex flex-col gap-6 text-left">
            <Reveal>
              <SectionHeader
                eyebrow="Medication Safety"
                title={
                  <>
                    Instant safety checks.
                    <br />
                    <span className="text-emerald-600">Zero medication conflicts.</span>
                  </>
                }
              />
              
              {/* Glassmorphic card overlay specifically behind subtitle for absolute readability */}
              <div className="mt-4 p-4.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm max-w-[540px]">
                <p className="text-[13px] leading-relaxed text-slate-600 font-medium">
                  Avoid dangerous drug-to-drug interactions instantly. VANI automatically cross-references your current prescriptions against a comprehensive clinical safety database.
                </p>
              </div>
            </Reveal>

            {/* Core Tech Details (Glassmorphic Cards) */}
            <div className="mt-4 flex flex-col gap-4">
              <Reveal delay={0.08}>
                <div className="group flex items-start gap-4 p-5 rounded-[22px] bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(16,185,129,0.04)] hover:border-emerald-500/20 hover:from-white hover:to-emerald-50/[0.1]">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
                    <Database className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-bricolage)] font-black text-slate-800 text-[15px] leading-tight">
                      Comprehensive Clinical Database
                    </h4>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 mt-1.5 font-normal">
                      Our intelligence layer screens against known interactions, food overlaps, and duplication warnings compiled from FDA and global medical registries.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="group flex items-start gap-4 p-5 rounded-[22px] bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(92,96,245,0.04)] hover:border-brand/20 hover:from-white hover:to-brand/[0.02]">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-brand flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(92,96,245,0.15)]">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-bricolage)] font-black text-slate-800 text-[15px] leading-tight">
                      Three-Tier Severity Tagging
                    </h4>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 mt-1.5 font-normal">
                      Flags are categorized into Severe (emergency bypass), Moderate (requires scheduling modifications), and Mild (standard precaution) for easy tracking.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="group flex items-start gap-4 p-5 rounded-[22px] bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(168,85,247,0.04)] hover:border-purple-500/20 hover:from-white hover:to-purple-50/[0.1]">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(168,85,247,0.15)]">
                    <HeartHandshake className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-bricolage)] font-black text-slate-800 text-[15px] leading-tight">
                      Dose Spacing Advisor
                    </h4>
                    <p className="text-[12.5px] leading-relaxed text-slate-500 mt-1.5 font-normal">
                      When minor conflicts exist, VANI suggests customized daily dosage gaps (e.g. 4 hours spacing) to protect heart absorption rates and stomach linings.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Dynamic Testing Drawer Console (Glow Glass Dashboard Card) */}
          <Reveal delay={0.15} className="flex justify-center">
            <div className="w-full max-w-[450px] rounded-[36px] border border-slate-200/80 bg-white/90 backdrop-blur-md p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.05)] transition-all duration-500 relative">
              
              {/* Outer light glow rings */}
              <div className="absolute -inset-[1px] bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 rounded-[37px] -z-10 pointer-events-none opacity-50" />
              
              {/* Decorative clinical headers */}
              <div className="flex justify-between items-center mb-4.5 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Interaction Simulator</span>
                </div>
                <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-100/40 px-2.5 py-0.5 rounded-full text-[9px] font-black text-brand leading-none">
                  Clinical Verifier v1.4
                </div>
              </div>
              
              <div className="h-[430px] w-full">
                <DrugMixer />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
