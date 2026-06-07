'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  Camera,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Home,
  Sparkles,
  Upload,
  Volume2,
} from 'lucide-react';
import { PhoneFrame } from './ui/PhoneFrame';
import { RobotMeddy } from './RobotMeddy';

export const meddyScreens = ['import', 'scan', 'meds', 'timeline', 'chat'] as const;
export type DemoScreen = (typeof meddyScreens)[number];

const labels: Record<DemoScreen, string> = {
  import: 'Import',
  scan: 'Analyze',
  meds: 'Care',
  timeline: 'Roadmap',
  chat: 'Meddy AI',
};

interface MeddyAppPhoneProps {
  activeScreen?: DemoScreen;
  autoPlay?: boolean;
  showMascotCard?: boolean;
  className?: string;
}

export function MeddyAppPhone({
  activeScreen,
  autoPlay = true,
  showMascotCard = true,
  className,
}: MeddyAppPhoneProps) {
  const [internalScreen, setInternalScreen] = useState<DemoScreen>(activeScreen ?? 'meds');
  const currentScreen = activeScreen ?? internalScreen;

  useEffect(() => {
    if (!autoPlay || activeScreen) return undefined;

    const timer = window.setInterval(() => {
      setInternalScreen((current) => meddyScreens[(meddyScreens.indexOf(current) + 1) % meddyScreens.length]);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [activeScreen, autoPlay]);

  return (
    <div className={`relative flex justify-center ${className ?? ''}`}>
      {showMascotCard && (
        <div className="absolute -left-6 top-10 z-20 hidden w-[108px] -rotate-6 rounded-2xl border border-brand/15 bg-white/95 p-3 shadow-[var(--shadow-card)] backdrop-blur md:block">
          <RobotMeddy size="sm" className="mx-auto" />
          <p className="mt-1 text-center font-[family-name:var(--font-bricolage)] text-[12px] font-bold text-gray-900">
            Mr. Meddy
          </p>
        </div>
      )}

      <PhoneFrame size="main" float="main" premium className="w-[286px] sm:w-[304px]">
        <div className="relative min-h-[540px] overflow-hidden bg-brand-light pt-10 text-slate-900">
          <div className="relative z-30 flex items-center justify-between px-5 pb-2 text-[10px] font-bold text-slate-500">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <span>LTE</span>
              <div className="flex h-2 w-4 rounded-[3px] border border-slate-400 p-[1px]">
                <span className="flex-1 rounded-[2px] bg-slate-500" />
              </div>
            </div>
          </div>

          <PhoneScreen active={currentScreen} name="import">
            <ImportScreen />
          </PhoneScreen>
          <PhoneScreen active={currentScreen} name="scan">
            <ScanScreen />
          </PhoneScreen>
          <PhoneScreen active={currentScreen} name="meds">
            <MedsScreen />
          </PhoneScreen>
          <PhoneScreen active={currentScreen} name="timeline">
            <TimelineScreen />
          </PhoneScreen>
          <PhoneScreen active={currentScreen} name="chat">
            <ChatScreen />
          </PhoneScreen>

          <div className="absolute bottom-3 left-4 right-4 z-40 grid grid-cols-5 gap-1 rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-lg backdrop-blur">
            {meddyScreens.map((screen) => (
              <button
                key={screen}
                type="button"
                onClick={() => setInternalScreen(screen)}
                className={`rounded-xl px-1 py-1.5 text-[8px] font-black transition-colors ${
                  currentScreen === screen ? 'bg-brand text-white' : 'text-slate-400 hover:bg-brand-light hover:text-brand'
                }`}
              >
                {labels[screen]}
              </button>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

function PhoneScreen({
  active,
  name,
  children,
}: {
  active: DemoScreen;
  name: DemoScreen;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 pt-[68px] transition-all duration-500 ${
        active === name ? 'z-20 translate-y-0 opacity-100' : 'z-10 translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
}

function ImportScreen() {
  return (
    <div className="flex h-full flex-col justify-between px-4 pb-20 text-center">
      <div>
        <span className="rounded-full bg-brand/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-brand">
          Smart Intake
        </span>
        <h3 className="mt-2 font-[family-name:var(--font-bricolage)] text-base font-black">Import Project Plan</h3>
        <p className="text-[10px] text-slate-500">Upload specification to digest.</p>
      </div>

      <div className="my-auto flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-indigo-200 bg-white/80 p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
          <Upload className="h-5 w-5 text-brand" />
        </div>
        <div>
          <span className="block text-[11px] font-black text-slate-800">discharge_plan.pdf</span>
          <span className="font-mono text-[8px] text-slate-400">PDF Document · 2.4 MB</span>
        </div>
        <div className="w-full rounded-xl bg-brand px-3 py-2 text-[10px] font-black text-white shadow-md shadow-brand/15">
          Build care plan
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-indigo-50 bg-white/95 p-2 text-left shadow-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
          <FileText className="h-3.5 w-3.5 text-emerald-600" />
        </div>
        <div className="text-[9px] leading-tight text-slate-500">Secure, encrypted recovery workspace.</div>
      </div>
    </div>
  );
}

function ScanScreen() {
  return (
    <div className="flex h-full flex-col justify-between bg-white px-4 pb-20 text-center">
      <div className="pt-4">
        <div className="relative mx-auto mb-3 h-12 w-12">
          <div className="absolute inset-0 animate-ping rounded-full border border-brand/40" />
          <div className="flex h-full w-full items-center justify-center rounded-full bg-brand/10">
            <Sparkles className="h-5 w-5 text-brand" />
          </div>
        </div>
        <h3 className="font-mono text-[10px] font-black uppercase tracking-widest text-brand">Analyzing Summary</h3>
        <p className="mt-1 text-[9px] text-slate-400">Reading discharge notes and medicines...</p>
      </div>

      <div className="relative flex h-[180px] flex-col gap-2 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4">
        {[100, 86, 72, 64, 94, 78].map((width, index) => (
          <span
            key={index}
            className="h-3 rounded-full bg-slate-200"
            style={{ width: `${width}%`, animation: 'pulse 1.8s ease-in-out infinite' }}
          />
        ))}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_18px_rgba(92,96,245,0.8)]" />
      </div>

      <div className="font-mono text-[9px] text-slate-400">PARSING CARE PLAN...</div>
    </div>
  );
}

function MedsScreen() {
  return (
    <div className="flex h-full flex-col justify-between bg-brand-light pb-20">
      <div className="rounded-b-[28px] bg-brand px-4 pb-4 pt-3 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-[family-name:var(--font-bricolage)] text-[15px] font-black">My Recovery</h4>
            <span className="mt-1 block text-[9px] text-white/75">1 of 3 care tasks done</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Camera className="h-4 w-4" />
          </div>
        </div>

        <div className="relative mt-3 flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 text-slate-800 shadow-sm">
          <span className="max-w-[150px] text-left text-[11px] font-bold leading-tight">Mr. Meddy checked your recovery plan.</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-light">
            <Volume2 className="h-3 w-3 text-brand" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-16 w-16">
            <RobotMeddy size="sm" className="h-full w-full" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-1/3 rounded-full bg-white" />
          </div>
          <span className="font-mono text-[8px] font-bold">33%</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex rounded-xl bg-brand-dark/10 p-1">
          {['Today', 'Medicines', 'Family'].map((tab, index) => (
            <div
              key={tab}
              className={`flex-1 rounded-lg py-1 text-center text-[9px] font-black ${
                index === 0 ? 'bg-white text-brand shadow-sm' : 'text-slate-500'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 px-4 pt-3 text-center">
        {['Morning', 'Noon', 'Afternoon', 'Night'].map((time, index) => (
          <div key={time} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index === 0 ? 'bg-brand text-white' : 'border border-slate-100 bg-white text-slate-400'
              }`}
            >
              {index === 0 ? <Check className="h-4 w-4" /> : <Clock className="h-3.5 w-3.5" />}
            </div>
            <span className={`text-[7px] font-bold ${index === 0 ? 'text-brand' : 'text-slate-400'}`}>{time}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 py-3">
        {[
          ['Pa', 'Paracetamol · 500mg', 'Morning and bedtime', true],
          ['Dr', 'Dressing change', 'Clean wound at 6 PM', false],
          ['Fo', 'Follow-up call', 'Doctor check-in tomorrow', false],
        ].map(([abbr, name, time, done]) => (
          <div key={name as string} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-left">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-light text-[10px] font-black text-brand">
                {abbr}
              </div>
              <div>
                <span className="block text-[9px] font-black text-slate-800">{name}</span>
                <span className="text-[7px] text-slate-400">{time}</span>
              </div>
            </div>
            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}>
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="meds" />
    </div>
  );
}

function TimelineScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pb-20">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="flex items-center gap-2 font-[family-name:var(--font-bricolage)] text-sm font-black text-slate-900">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Roadmap
        </h4>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-600">Day 2 Active</span>
      </div>

      <div className="relative flex flex-1 flex-col gap-4 pl-5">
        <div className="absolute bottom-2 left-[6px] top-2 w-0.5 bg-slate-100" />
        <div className="absolute left-[6px] top-2 h-[46%] w-0.5 bg-brand" />
        {[
          ['Day 1', 'Clear fluids and rest', 'Keep activity light and track dizziness.', true],
          ['Day 3', 'Soft food transition', 'Start soft meals if symptoms stay stable.', false],
          ['Day 7', 'Clinic follow-up', 'Doctor reviews incision and medication response.', false],
        ].map(([day, title, desc, active]) => (
          <div key={day as string} className="relative text-left">
            <span
              className={`absolute -left-[22px] top-2 h-2.5 w-2.5 rounded-full ${
                active ? 'bg-brand ring-4 ring-brand/10' : 'bg-slate-300'
              }`}
            />
            <div className={`rounded-2xl border border-slate-100 bg-slate-50 p-3 ${active ? '' : 'opacity-60'}`}>
              <span className={`block text-[9px] font-black ${active ? 'text-brand' : 'text-slate-600'}`}>
                {day}: {title}
              </span>
              <p className="mt-1 text-[8px] leading-relaxed text-slate-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex h-full flex-col justify-between bg-brand-light pb-20">
      <div className="flex items-center justify-between border-b border-slate-200/60 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-light">
            <ChevronRight className="h-3 w-3 rotate-180 text-brand" />
          </div>
          <div className="text-left">
            <h4 className="text-[12px] font-black leading-none text-slate-900">Mr. Meddy</h4>
            <span className="font-mono text-[8px] font-bold text-brand">Online</span>
          </div>
        </div>
        <RobotMeddy size="sm" className="h-9 w-9" />
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-[9px] font-bold text-white shadow-sm">
          Can I sleep on my left side?
        </div>
        <div className="relative max-w-[92%] rounded-2xl rounded-tl-sm border border-slate-100 bg-white p-3 text-left text-[9px] leading-relaxed text-slate-700 shadow-md">
          <Volume2 className="absolute right-2 top-2 h-3.5 w-3.5 text-brand/75" />
          <p className="pr-5 font-bold text-slate-800">{"I checked your discharge summary."}</p>
          <p className="mt-2">
            For the first few days, sleep on your back unless your doctor gave different instructions. If pain increases, call your care team.
          </p>
          <p className="mt-2 border-t border-slate-100 pt-2 font-bold">Want me to notify your daughter?</p>
        </div>
        {['Notify family', 'Check medicine schedule'].map((option) => (
          <div key={option} className="rounded-2xl border border-slate-100 bg-white/95 px-3 py-2 text-left text-[9px] font-black text-slate-800 shadow-sm">
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: 'meds' }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between rounded-b-[40px] border-t border-slate-100 bg-white px-6 py-2">
      <NavItem icon={<Home className="h-3.5 w-3.5" />} label="Home" active={false} />
      <NavItem icon={<Activity className="h-3.5 w-3.5" />} label="Care" active={active === 'meds'} />
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-black text-white shadow-md shadow-brand/20">
        +
      </div>
      <NavItem icon={<Clock className="h-3.5 w-3.5" />} label="Plan" active={false} />
      <NavItem icon={<Sparkles className="h-3.5 w-3.5" />} label="Meddy" active={false} />
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-0.5 ${active ? 'text-brand' : 'text-slate-400'}`}>
      {icon}
      <span className="text-[6px] font-bold">{label}</span>
    </div>
  );
}
