'use client';

import { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, RotateCcw, Sparkles } from 'lucide-react';

interface Pill {
  id: string;
  name: string;
  shortName: string;
  colorClass: string;
  selectedColorClass: string;
  textColor: string;
  type: string;
}

const DRUGS: Pill[] = [
  { 
    id: 'asp', 
    name: 'Aspirin', 
    shortName: 'ASP', 
    colorClass: 'bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 border-slate-200', 
    selectedColorClass: 'bg-slate-100 border-slate-400 ring-4 ring-slate-100',
    textColor: 'text-slate-700', 
    type: 'Blood Thinner' 
  },
  { 
    id: 'ibu', 
    name: 'Ibuprofen', 
    shortName: 'IBU', 
    colorClass: 'bg-rose-50 hover:bg-rose-100 hover:border-rose-300 text-rose-800 border-rose-100', 
    selectedColorClass: 'bg-rose-100/80 border-rose-400 ring-4 ring-rose-100',
    textColor: 'text-rose-700', 
    type: 'NSAID Painkiller' 
  },
  { 
    id: 'wrf', 
    name: 'Warfarin', 
    shortName: 'WRF', 
    colorClass: 'bg-sky-50 hover:bg-sky-100 hover:border-sky-300 text-sky-800 border-sky-100', 
    selectedColorClass: 'bg-sky-100/80 border-sky-400 ring-4 ring-sky-100',
    textColor: 'text-sky-700', 
    type: 'Anticoagulant' 
  },
  { 
    id: 'amx', 
    name: 'Amoxicillin', 
    shortName: 'AMX', 
    colorClass: 'bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-800 border-emerald-100', 
    selectedColorClass: 'bg-emerald-100/80 border-emerald-400 ring-4 ring-emerald-100',
    textColor: 'text-emerald-700', 
    type: 'Antibiotic' 
  },
];

export default function DrugMixer() {
  const [selected, setSelected] = useState<Pill[]>([]);

  const handlePillClick = (pill: Pill, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected.find(p => p.id === pill.id)) {
      setSelected(selected.filter(p => p.id !== pill.id));
      return;
    }
    if (selected.length >= 2) {
      setSelected([selected[0], pill]);
    } else {
      setSelected([...selected, pill]);
    }
  };

  const resetMixer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
  };

  // Compute interaction
  let status: 'idle' | 'safe' | 'moderate' | 'severe' = 'idle';
  let message = 'Select two medications from the drawer above to check potential interactions.';
  let title = 'System Awaiting Input';

  if (selected.length === 1) {
    status = 'idle';
    message = `Selected ${selected[0].name}. Select a second medication to evaluate compatibility.`;
    title = 'Awaiting Medication';
  } else if (selected.length === 2) {
    const ids = selected.map(p => p.id);
    
    if (ids.includes('asp') && ids.includes('wrf')) {
      status = 'severe';
      title = 'Severe Interaction Warning';
      message = 'High Risk of Internal Bleeding. Combining a platelet inhibitor (Aspirin) and a clinical anticoagulant (Warfarin) increases hematoma & bleeding risk significantly.';
    }
    else if (ids.includes('ibu') && ids.includes('asp')) {
      status = 'moderate';
      title = 'Moderate Overlap Identified';
      message = 'NSAID Competency Conflict. Ibuprofen can block the cardioprotective antiplatelet efficacy of low-dose Aspirin. Consider spacing doses by at least 4 hours.';
    }
    else if (ids.includes('amx') && ids.includes('wrf')) {
      status = 'moderate';
      title = 'Clinical Monitoring Advised';
      message = 'INR Alteration Risk. Amoxicillin can alter gut microflora, leading to increased absorption of Warfarin. Monitor coagulation times closely during therapy.';
    }
    else if (ids.includes('ibu') && ids.includes('wrf')) {
      status = 'severe';
      title = 'Severe Interaction Warning';
      message = 'Gastrointestinal Bleed Risk. NSAIDs like Ibuprofen cause mucosal stomach irritation, which when combined with Warfarin blood thinning, creates a severe hazard.';
    }
    else {
      status = 'safe';
      title = 'No Interaction Found';
      message = 'No contraindications detected between these medications. They are safe to take together under standard prescribed therapeutic dosages.';
    }
  }

  // Visual helper styles
  const getVisualStyles = () => {
    switch (status) {
      case 'severe':
        return {
          cardBg: 'bg-rose-50/90 border-rose-200/70 text-rose-800 shadow-md shadow-rose-500/[0.03]',
          liquidFill: 'from-rose-500 to-red-600 shadow-lg shadow-rose-500/30',
          icon: <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 animate-bounce" />,
          titleColor: 'text-rose-950 font-black',
          descColor: 'text-rose-700/95',
          bubbleColor: 'bg-rose-300'
        };
      case 'moderate':
        return {
          cardBg: 'bg-amber-50/90 border-amber-200/70 text-amber-800 shadow-md shadow-amber-500/[0.03]',
          liquidFill: 'from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 animate-pulse" />,
          titleColor: 'text-amber-950 font-black',
          descColor: 'text-amber-700/95',
          bubbleColor: 'bg-amber-300'
        };
      case 'safe':
        return {
          cardBg: 'bg-emerald-50/90 border-emerald-200/70 text-emerald-800 shadow-md shadow-emerald-500/[0.03]',
          liquidFill: 'from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
          titleColor: 'text-emerald-950 font-black',
          descColor: 'text-emerald-700/95',
          bubbleColor: 'bg-emerald-300'
        };
      default:
        return {
          cardBg: 'bg-slate-50/80 border-slate-200/60 text-slate-500',
          liquidFill: 'from-brand/40 to-indigo-500/40',
          icon: <Sparkles className="w-4 h-4 text-slate-400 flex-shrink-0" />,
          titleColor: 'text-slate-800 font-extrabold',
          descColor: 'text-slate-500',
          bubbleColor: 'bg-indigo-300'
        };
    }
  };

  const currentStyles = getVisualStyles();
  const Y = selected.length === 1 ? 62 : 35;
  const reactionClass = 
    status === 'severe' ? 'reaction-severe' :
    status === 'moderate' ? 'reaction-moderate' :
    status === 'safe' ? 'reaction-safe' : 'reaction-idle';

  return (
    <div className="flex flex-col h-full w-full justify-between relative select-none font-sans">
      
      {/* Shelf of Pills */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Select Medications</span>
          {selected.length > 0 && (
            <button
              onClick={resetMixer}
              className="text-[10px] text-brand hover:text-brand/80 font-black flex items-center gap-1 cursor-pointer uppercase transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Clear Console
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DRUGS.map(pill => {
            const isSelected = selected.some(p => p.id === pill.id);
            return (
              <button
                key={pill.id}
                onClick={(e) => handlePillClick(pill, e)}
                className={`group flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer active:scale-95 ${
                  isSelected ? pill.selectedColorClass : pill.colorClass
                }`}
              >
                {/* Pill Shape visual indicator */}
                <div className="relative w-12 h-6 flex items-center justify-center rounded-full bg-white border border-slate-300 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-y-0 left-0 w-1/2 rounded-l-full bg-slate-100/50 border-r border-slate-200" />
                  <span className="relative text-[9px] font-black tracking-tight text-slate-700 z-10">
                    {pill.shortName}
                  </span>
                </div>
                
                <div className="mt-2 text-center">
                  <span className="block text-[11px] font-black text-slate-900 leading-none">{pill.name}</span>
                  <span className="block text-[8px] text-slate-400 font-semibold mt-0.5 leading-none">{pill.type}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Laboratory Mixer Beaker Visual */}
      <div className={`my-5 flex flex-col md:flex-row items-center justify-center gap-6 p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${reactionClass} ${
        status === 'severe' 
          ? 'border-rose-200 bg-rose-50/20 shadow-inner animate-[alert-pulse-red_2s_infinite_ease-in-out]' 
          : status === 'moderate' 
          ? 'border-amber-200 bg-amber-50/20' 
          : status === 'safe' 
          ? 'border-emerald-200 bg-emerald-50/15' 
          : 'border-slate-200 bg-slate-50/50'
      }`}>
        
        {/* Erlenmeyer Flask Laboratory SVG */}
        <div className="relative w-24 h-28 flex items-end justify-center flex-shrink-0">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Define the mask shape of the inside of the flask */}
              <mask id="flaskMask">
                {/* We fill it with white, which makes the liquid visible inside it */}
                <path 
                  d="M 45 12 L 45 35 L 20 85 C 16 93, 22 95, 30 95 L 70 95 C 78 95, 84 93, 80 85 L 55 35 L 55 12 Z" 
                  fill="white" 
                />
              </mask>
              
              {/* Define the gradient fills for status */}
              <linearGradient id="liquidSevere" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="liquidModerate" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="liquidSafe" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="liquidIdle" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* RENDER LIQUID inside the flask, clipped by the mask */}
            {selected.length > 0 && (
              <g mask="url(#flaskMask)">
                {/* Back wave layer */}
                <path 
                  d={`M -100,${Y} C -75,${Y+3} -50,${Y-3} -25,${Y} C 0,${Y+3} 25,${Y-3} 50,${Y} C 75,${Y+3} 100,${Y-3} 125,${Y} C 150,${Y+3} 175,${Y-3} 200,${Y} L 200,110 L -100,110 Z`}
                  fill={
                    status === 'severe' 
                      ? 'url(#liquidSevere)' 
                      : status === 'moderate' 
                      ? 'url(#liquidModerate)' 
                      : status === 'safe' 
                      ? 'url(#liquidSafe)' 
                      : 'url(#liquidIdle)'
                  }
                  opacity="0.55"
                  className="wave-back transition-all duration-700 ease-in-out"
                />
                
                {/* Front wave layer */}
                <path 
                  d={`M -100,${Y} C -75,${Y-4} -50,${Y+4} -25,${Y} C 0,${Y-4} 25,${Y+4} 50,${Y} C 75,${Y-4} 100,${Y+4} 125,${Y} C 150,${Y-4} 175,${Y+4} 200,${Y} L 200,110 L -100,110 Z`}
                  fill={
                    status === 'severe' 
                      ? 'url(#liquidSevere)' 
                      : status === 'moderate' 
                      ? 'url(#liquidModerate)' 
                      : status === 'safe' 
                      ? 'url(#liquidSafe)' 
                      : 'url(#liquidIdle)'
                  }
                  className="wave-front transition-all duration-700 ease-in-out"
                />

                {/* Bubbles animation inside flask mask */}
                {selected.length === 2 && (
                  <>
                    <circle cx="30" cy="55" r="2.5" className="animate-bubble-1 fill-white/50 animate-pulse" />
                    <circle cx="70" cy="48" r="1.5" className="animate-bubble-2 fill-white/50 animate-pulse" />
                    <circle cx="48" cy="62" r="2" className="animate-bubble-3 fill-white/50 animate-pulse" />
                    <circle cx="58" cy="42" r="3" className="animate-bubble-4 fill-white/50 animate-pulse" />
                    <circle cx="38" cy="50" r="1.8" className="animate-bubble-5 fill-white/40 animate-pulse" />
                    <circle cx="64" cy="58" r="2.2" className="animate-bubble-6 fill-white/40 animate-pulse" />
                    <circle cx="52" cy="45" r="1.2" className="animate-bubble-7 fill-white/40 animate-pulse" />
                    <circle cx="42" cy="38" r="2.8" className="animate-bubble-8 fill-white/40 animate-pulse" />
                  </>
                )}
              </g>
            )}

            {/* Flask Glass body outline */}
            <path 
              d="M 42 12 L 58 12 M 45 12 L 45 35 L 20 85 C 16 93, 22 95, 30 95 L 70 95 C 78 95, 84 93, 80 85 L 55 35 L 55 12" 
              stroke="#64748b" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="transparent" 
            />

            {/* Steam/smoke indicator from flask mouth */}
            {selected.length === 2 && (status === 'severe' || status === 'moderate') && (
              <g className="steam-group">
                <path d="M 47,8 Q 44,4 47,0" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none" className="animate-steam-1" />
                <path d="M 51,8 Q 54,4 51,0" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none" className="animate-steam-2" />
                <path d="M 49,8 Q 47,4 50,0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none" className="animate-steam-3" />
              </g>
            )}
          </svg>

          {/* Dropped meds float tags inside liquid */}
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-5 gap-1.5 pointer-events-none z-10">
            {selected.map((p, idx) => (
              <span 
                key={p.id} 
                className="px-2 py-0.5 rounded-full text-[8px] font-black leading-none bg-white text-slate-800 shadow-md border border-slate-200"
                style={{ 
                  transform: `translateY(${idx * 2}px) rotate(${idx === 0 ? -12 : 8}deg)`,
                  animation: 'dropPill 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' 
                }}
              >
                {p.shortName}
              </span>
            ))}
          </div>
        </div>

        {/* Reaction details and stats */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
          <span className="text-[9px] uppercase font-extrabold tracking-widest text-slate-400">Reaction Chamber</span>
          <div className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${
              status === 'severe' ? 'bg-rose-500 animate-ping' : status === 'moderate' ? 'bg-amber-400' : status === 'safe' ? 'bg-emerald-500' : 'bg-slate-300'
            }`} />
            <span className="text-[13px] font-extrabold text-slate-800 leading-none">
              {selected.length === 0 ? 'Beaker Empty' : selected.length === 1 ? '1 Medication Active' : 'Analysis Complete'}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 max-w-[280px]">
            {selected.length === 0 
              ? 'Add items to evaluate interaction index, enzyme inhibition, and coagulation conflicts.' 
              : selected.length === 1 
              ? `Awaiting second selection to cross-evaluate with ${selected[0].name}.`
              : 'Cross-comparison report populated in the diagnosis cards below.'}
          </p>
        </div>
      </div>

      {/* Clinical Diagnosis Card Details */}
      <div className={`p-4.5 rounded-2xl border transition-all duration-500 ease-out ${currentStyles.cardBg}`}>
        <div className="flex items-center gap-2">
          {currentStyles.icon}
          <h4 className={`text-[13px] tracking-tight ${currentStyles.titleColor}`}>
            {title}
          </h4>
        </div>
        <p className={`text-[12px] leading-relaxed font-medium mt-2.5 ${currentStyles.descColor}`}>
          {message}
        </p>
      </div>

      {/* Custom styled CSS animations */}
      <style>{`
        @keyframes alert-pulse-red {
          0%, 100% {
            box-shadow: inset 0 0 15px rgba(244, 63, 94, 0.03);
            border-color: rgba(244, 63, 94, 0.15);
          }
          50% {
            box-shadow: inset 0 0 30px rgba(244, 63, 94, 0.1);
            border-color: rgba(244, 63, 94, 0.45);
          }
        }
        @keyframes wave-slide-front {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
        @keyframes wave-slide-back {
          0% { transform: translateX(-25px); }
          100% { transform: translateX(25px); }
        }
        .wave-front {
          animation: wave-slide-front var(--wave-speed-front, 3s) linear infinite;
        }
        .wave-back {
          animation: wave-slide-back var(--wave-speed-back, 4.5s) linear infinite;
        }

        /* Speed modifiers for reaction states */
        .reaction-severe {
          --wave-speed-front: 1.2s;
          --wave-speed-back: 1.8s;
          --bubble-speed-1: 0.9s;
          --bubble-speed-2: 0.7s;
          --bubble-speed-3: 1.0s;
          --bubble-speed-4: 0.8s;
        }
        .reaction-moderate {
          --wave-speed-front: 2.2s;
          --wave-speed-back: 3.2s;
          --bubble-speed-1: 1.6s;
          --bubble-speed-2: 1.3s;
          --bubble-speed-3: 1.8s;
          --bubble-speed-4: 1.5s;
        }
        .reaction-safe {
          --wave-speed-front: 3.5s;
          --wave-speed-back: 5.0s;
          --bubble-speed-1: 2.4s;
          --bubble-speed-2: 2.0s;
          --bubble-speed-3: 2.7s;
          --bubble-speed-4: 2.2s;
        }
        .reaction-idle {
          --wave-speed-front: 5.0s;
          --wave-speed-back: 7.0s;
          --bubble-speed-1: 3.0s;
          --bubble-speed-2: 2.6s;
          --bubble-speed-3: 3.4s;
          --bubble-speed-4: 2.9s;
        }

        @keyframes dropPill {
          0% {
            transform: translateY(-40px) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes riseBubble {
          0% {
            transform: translateY(30px);
            opacity: 0.1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-25px);
            opacity: 0;
          }
        }
        .animate-bubble-1 {
          animation: riseBubble var(--bubble-speed-1, 2.2s) infinite ease-in-out;
        }
        .animate-bubble-2 {
          animation: riseBubble var(--bubble-speed-2, 1.8s) infinite ease-in-out;
          animation-delay: 0.4s;
        }
        .animate-bubble-3 {
          animation: riseBubble var(--bubble-speed-3, 2.5s) infinite ease-in-out;
          animation-delay: 0.8s;
        }
        .animate-bubble-4 {
          animation: riseBubble var(--bubble-speed-4, 2.0s) infinite ease-in-out;
          animation-delay: 1.2s;
        }
        .animate-bubble-5 {
          animation: riseBubble var(--bubble-speed-1, 2.2s) infinite ease-in-out;
          animation-delay: 0.2s;
        }
        .animate-bubble-6 {
          animation: riseBubble var(--bubble-speed-2, 1.8s) infinite ease-in-out;
          animation-delay: 0.6s;
        }
        .animate-bubble-7 {
          animation: riseBubble var(--bubble-speed-3, 2.5s) infinite ease-in-out;
          animation-delay: 1.0s;
        }
        .animate-bubble-8 {
          animation: riseBubble var(--bubble-speed-4, 2.0s) infinite ease-in-out;
          animation-delay: 1.4s;
        }

        @keyframes steam-rise {
          0% {
            transform: translateY(10px) scale(0.8);
            opacity: 0;
          }
          30% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-15px) scale(1.3);
            opacity: 0;
          }
        }
        .animate-steam-1 {
          animation: steam-rise 1.4s infinite ease-out;
        }
        .animate-steam-2 {
          animation: steam-rise 1.7s infinite ease-out;
          animation-delay: 0.3s;
        }
        .animate-steam-3 {
          animation: steam-rise 1.1s infinite ease-out;
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
