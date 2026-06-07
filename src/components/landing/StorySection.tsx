'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Search } from 'lucide-react';
import { MeddyAppPhone } from './MeddyAppPhone';
import { SectionHeader } from './ui/SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=5200',
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.set('.story-scene', { opacity: 0, y: 34, filter: 'blur(8px)' });
        gsap.set('.story-scene-1', { opacity: 1, y: 0, filter: 'blur(0px)' });
        gsap.set('.story-ui', { opacity: 0, y: 80, scale: 0.88, rotate: 0, filter: 'blur(4px)' });
        gsap.set('.story-paper', { opacity: 1, y: 0, x: -20, scale: 1, rotate: -3, filter: 'blur(0px)' });

        tl.to('.story-paper', { x: -90, y: -20, rotate: -12, scale: 0.78, opacity: 0.52, duration: 1 })
          .to('.story-paper-secondary', { opacity: 1, x: 70, y: 36, rotate: 8, scale: 0.92, filter: 'blur(0px)', duration: 1 }, '<')
          .to('.story-scene-1', { opacity: 0, y: -34, filter: 'blur(8px)', duration: 0.8 }, '<')
          .to('.story-scene-2', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '<+0.2')

          .to('.story-paper, .story-paper-secondary', { opacity: 0, y: -60, scale: 0.62, filter: 'blur(8px)', duration: 0.8 }, '+=0.35')
          .to('.story-google-phone', { opacity: 1, y: 0, scale: 1, rotate: -4, filter: 'blur(0px)', duration: 1 }, '<')
          .to('.story-scene-2', { opacity: 0, y: -34, filter: 'blur(8px)', duration: 0.8 }, '<')
          .to('.story-scene-3', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '<+0.2')

          .to('.story-google-phone', { opacity: 0, x: -80, scale: 0.9, filter: 'blur(8px)', duration: 0.8 }, '+=0.35')
          .to('.story-app-import', { opacity: 1, x: -115, y: 6, scale: 0.86, rotate: -8, filter: 'blur(0px)', duration: 1 }, '<')
          .to('.story-app-scan', { opacity: 1, x: 65, y: -12, scale: 0.98, rotate: 4, filter: 'blur(0px)', duration: 1 }, '<+0.18')
          .to('.story-scene-3', { opacity: 0, y: -34, filter: 'blur(8px)', duration: 0.8 }, '<')
          .to('.story-scene-4', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '<+0.2')

          .to('.story-app-import', { opacity: 0.22, x: -180, y: 36, scale: 0.72, rotate: -13, filter: 'blur(4px)', duration: 0.8 }, '+=0.35')
          .to('.story-app-scan', { opacity: 0.24, x: -15, y: -30, scale: 0.76, rotate: -3, filter: 'blur(5px)', duration: 0.8 }, '<')
          .to('.story-app-meds', { opacity: 1, x: 85, y: 6, scale: 1, rotate: 5, filter: 'blur(0px)', duration: 1 }, '<')
          .to('.story-scene-4', { opacity: 0, y: -34, filter: 'blur(8px)', duration: 0.8 }, '<')
          .to('.story-scene-5', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '<+0.2')

          .to('.story-app-import, .story-app-scan', { opacity: 0, y: -70, scale: 0.62, filter: 'blur(8px)', duration: 0.7 }, '+=0.35')
          .to('.story-app-meds', { opacity: 0.3, x: -142, y: 26, scale: 0.74, rotate: -8, filter: 'blur(5px)', duration: 0.9 }, '<')
          .to('.story-app-timeline', { opacity: 1, x: 18, y: -12, scale: 0.93, rotate: 2, filter: 'blur(0px)', duration: 1 }, '<+0.08')
          .to('.story-app-chat', { opacity: 1, x: 175, y: 30, scale: 0.78, rotate: 10, filter: 'blur(0px)', duration: 1 }, '<+0.16')
          .to('.story-scene-5', { opacity: 0, y: -34, filter: 'blur(8px)', duration: 0.8 }, '<')
          .to('.story-scene-6', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '<+0.2');

        return () => tl.kill();
      });

      mm.add('(max-width: 767px)', () => {
        gsap.set('.story-scene, .story-ui', { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden border-y border-slate-200 bg-[#fafaf9] md:h-screen"
    >
      <div className="grid min-h-screen md:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 flex flex-col justify-center px-5 py-20 md:px-12 lg:px-20">
          <div className="mb-10 max-w-xl md:mb-14">
            <SectionHeader
              eyebrow="How It Works"
              title={
                <>
                  From prescription to
                  <br />
                  <span className="text-brand">full recovery</span> — in four steps.
                </>
              }
              subtitle="Scroll the flow. The hospital paperwork becomes a real app plan, then the phone mockups move through scan, medicine list, roadmap, and Mr. Meddy support."
            />
          </div>

          <div className="relative min-h-[310px] md:min-h-[360px]">
            {[
              {
                className: 'story-scene-1',
                tag: '01 / Discharge',
                title: "You're finally going home.",
                body: "But instead of peace, you're handed a folder full of confusing prescription details, follow-up dates, and generic rules.",
              },
              {
                className: 'story-scene-2',
                tag: '02 / Paper chaos',
                title: 'Everything important is buried.',
                body: 'Medicines, timings, diet instructions, and red flags are scattered across documents when you are least ready to decode them.',
              },
              {
                className: 'story-scene-3',
                tag: '03 / 3 AM panic',
                title: '"Is this pain normal?"',
                body: 'Google gives worst-case answers. What patients need is guidance based on their own discharge summary, not random search results.',
              },
              {
                className: 'story-scene-4',
                tag: '04 / Scan',
                title: 'Snap the paper. AI reads the plan.',
                body: 'The app imports the discharge summary, scans the clinical text, and turns messy instructions into structured recovery data.',
              },
              {
                className: 'story-scene-5',
                tag: '05 / Organize',
                title: 'Medicines become a daily schedule.',
                body: 'Doses, timing, progress, and reminders are converted into a clean mobile hub that patients can actually follow.',
              },
              {
                className: 'story-scene-6',
                tag: '06 / Recover',
                title: 'Roadmap plus Mr. Meddy support.',
                body: 'Patients see the day-by-day recovery path and can ask Mr. Meddy questions when anxiety hits.',
              },
            ].map((scene) => (
              <div
                key={scene.className}
                className={`story-scene ${scene.className} absolute left-0 top-0 max-w-xl md:pr-6`}
              >
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-brand">
                  {scene.tag}
                </span>
                <h3 className="font-[family-name:var(--font-bricolage)] text-[clamp(32px,4.2vw,58px)] font-black leading-[1.02] tracking-tight text-slate-950">
                  {scene.title}
                </h3>
                <p className="mt-5 text-[clamp(15px,1.35vw,19px)] font-light leading-relaxed text-slate-600">
                  {scene.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-gradient-to-bl from-slate-100 to-white md:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_28%,rgba(92,96,245,0.13),transparent_26%),radial-gradient(circle_at_70%_68%,rgba(132,204,150,0.14),transparent_24%)]" />
          <div className="relative h-[680px] w-[680px]">
            <DischargePaper className="story-ui story-paper absolute left-[170px] top-[86px] z-20" />
            <DischargePaper className="story-ui story-paper-secondary absolute left-[240px] top-[142px] z-10" compact />
            <GooglePanicPhone className="story-ui story-google-phone absolute left-[195px] top-[48px] z-30" />

            <div className="story-ui story-app-import absolute left-[210px] top-[40px] z-20">
              <MeddyAppPhone activeScreen="import" autoPlay={false} showMascotCard={false} className="[&>div]:!animate-none" />
            </div>
            <div className="story-ui story-app-scan absolute left-[210px] top-[40px] z-30">
              <MeddyAppPhone activeScreen="scan" autoPlay={false} showMascotCard={false} className="[&>div]:!animate-none" />
            </div>
            <div className="story-ui story-app-meds absolute left-[210px] top-[40px] z-40">
              <MeddyAppPhone activeScreen="meds" autoPlay={false} showMascotCard={false} className="[&>div]:!animate-none" />
            </div>
            <div className="story-ui story-app-timeline absolute left-[210px] top-[40px] z-30">
              <MeddyAppPhone activeScreen="timeline" autoPlay={false} showMascotCard={false} className="[&>div]:!animate-none" />
            </div>
            <div className="story-ui story-app-chat absolute left-[210px] top-[40px] z-20">
              <MeddyAppPhone activeScreen="chat" autoPlay={false} showMascotCard={false} className="[&>div]:!animate-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 px-5 pb-20 md:hidden">
          {(['import', 'scan', 'meds', 'timeline'] as const).map((screen) => (
            <MeddyAppPhone key={screen} activeScreen={screen} autoPlay={false} showMascotCard={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DischargePaper({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      className={`${className ?? ''} h-[500px] w-[350px] rounded-sm border border-slate-200 bg-white p-8 shadow-2xl`}
    >
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
          <FileText className="h-6 w-6 text-brand" />
        </div>
        <div>
          <div className="text-lg font-black text-slate-900">Discharge Summary</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Post-operative care</div>
        </div>
      </div>

      <div className="space-y-3">
        {[100, 82, 94, 68].map((width) => (
          <div key={width} className="h-2.5 rounded-full bg-slate-200" style={{ width: `${width}%` }} />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-red-100 bg-red-50 p-4">
        <div className="mb-3 text-sm font-black text-red-600">Medication Instructions</div>
        <div className="space-y-2">
          {[94, 74, 86].map((width) => (
            <div key={width} className="h-2 rounded-full bg-red-200" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>

      {!compact && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-2 h-2 w-16 rounded-full bg-slate-300" />
            <div className="h-16 rounded-lg bg-slate-100" />
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-2 h-2 w-20 rounded-full bg-slate-300" />
            <div className="h-16 rounded-lg bg-slate-100" />
          </div>
        </div>
      )}

      <div className="mt-auto flex justify-between pt-10">
        <div>
          <div className="font-serif text-xl text-slate-800">Dr. Mehta</div>
          <div className="mt-1 h-px w-32 bg-slate-900" />
          <div className="mt-1 text-[8px] text-slate-500">Attending Physician</div>
        </div>
        <div className="flex h-8 items-end gap-[2px] opacity-60">
          {[1, 3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 2].map((w, i) => (
            <div key={`${w}-${i}`} className="h-full bg-slate-900" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GooglePanicPhone({ className }: { className?: string }) {
  return (
    <div
      className={`${className ?? ''} flex h-[600px] w-[300px] flex-col overflow-hidden rounded-[3rem] border-[12px] border-slate-900 bg-white px-4 pb-6 pt-12 shadow-2xl`}
    >
      <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
      <div className="mb-6 flex w-full items-center gap-2 rounded-full bg-slate-100 px-4 py-3">
        <Search className="h-4 w-4 text-slate-500" />
        <div className="text-sm text-slate-700">sharp chest pain after surgery...</div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {[
          ['WebMD', '10 Signs of a Fatal Complication'],
          ['Healthline', 'When to go to the ER immediately'],
          ['Forum', 'I had the same pain and panicked'],
        ].map(([source, title]) => (
          <div key={source} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-1 text-xs text-slate-400">{source}</div>
            <div className="mb-2 font-bold text-blue-600">{title}</div>
            <div className="h-2 w-full rounded bg-slate-200" />
            <div className="mt-2 h-2 w-3/4 rounded bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-400">!</div>
          <div className="text-xs font-bold text-white">Panic loop</div>
        </div>
        <div className="text-xs leading-relaxed text-slate-300">Generic search results are not your recovery plan.</div>
      </div>
    </div>
  );
}
