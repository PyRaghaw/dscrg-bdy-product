'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneFrame } from './ui/PhoneFrame';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';
import { 
  Check, 
  Clock, 
  Heart, 
  Shield, 
  TrendingUp, 
  Lock, 
  Star, 
  Globe, 
  Award,
  Video,
  User,
  Users
} from 'lucide-react';

export function RolesSection() {
  const [activeRole, setActiveRole] = useState<'patient' | 'family' | 'caregiver' | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="roles"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden bg-[#fafafa]"
    >
      {/* ── CSS Styles for 3D Orbit, Trails, and Glassmorphism ── */}
      <style jsx global>{`
        :root {
          --roles-orbit-radius: 290px;
          --roles-phone-scale: 0.95;
        }
        @media (max-width: 1400px) {
          :root {
            --roles-orbit-radius: 260px;
            --roles-phone-scale: 0.88;
          }
        }
        @media (max-width: 1200px) {
          :root {
            --roles-orbit-radius: 220px;
            --roles-phone-scale: 0.78;
          }
        }
        @media (max-width: 1023px) {
          :root {
            --roles-orbit-radius: 260px;
            --roles-phone-scale: 0.85;
          }
        }
        @media (max-width: 639px) {
          :root {
            --roles-orbit-radius: 140px;
            --roles-phone-scale: 0.58;
          }
        }

        /* ── Mobile: flat fanned card layout instead of 3D orbit ── */
        @media (max-width: 639px) {
          /* Remove 3D perspective on mobile */
          .roles-scene-3d {
            perspective: none !important;
          }

          /* Flatten the ring container to a square that can hold the 3 phones */
          .roles-orbit-ring-3d {
            transform: none !important;
            width: 320px !important;
            height: 500px !important;
          }

          /* Hide the SVG ring lines on mobile */
          .roles-orbit-ring-3d > svg {
            display: none !important;
          }

          /* Hide the spinning ring */
          .roles-ring-spin {
            animation: none !important;
          }

          /* Phone 1 (Patient) — left, tilted, smaller, behind */
          .roles-orbit-anim-1 {
            animation: none !important;
            transform: translateX(-92px) scale(0.50) rotate(-7deg) !important;
            z-index: 5 !important;
          }

          /* Phone 2 (Family) — center, upright, slightly bigger, in front */
          .roles-orbit-anim-2 {
            animation: none !important;
            transform: translateY(-28px) scale(0.58) !important;
            z-index: 20 !important;
          }

          /* Phone 3 (Caregiver) — right, tilted, smaller, behind */
          .roles-orbit-anim-3 {
            animation: none !important;
            transform: translateX(92px) scale(0.50) rotate(7deg) !important;
            z-index: 5 !important;
          }
        }

        /* 3D Scene Wrapper */
        .roles-scene-3d {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .roles-orbit-ring-3d {
          transform-style: preserve-3d;
          transform: rotateX(36deg) rotateY(-5deg);
          width: 680px;
          height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .roles-orbit-ring-3d {
            width: 360px;
            height: 360px;
          }
        }

        /* Animation Play State controller */
        .roles-orbit-anim-1 {
          animation: roles-orbit-phone-1-keyframes 28s linear infinite;
          animation-play-state: var(--roles-orbit-play-state, running);
        }
        .roles-orbit-anim-2 {
          animation: roles-orbit-phone-2-keyframes 28s linear infinite;
          animation-play-state: var(--roles-orbit-play-state, running);
        }
        .roles-orbit-anim-3 {
          animation: roles-orbit-phone-3-keyframes 28s linear infinite;
          animation-play-state: var(--roles-orbit-play-state, running);
        }

        /* Orbit Keyframes using mathematically-exact counter-rotation to remain upright */
        @keyframes roles-orbit-phone-1-keyframes {
          0% {
            transform: rotateZ(0deg) translateX(var(--roles-orbit-radius)) rotateZ(0deg) rotateY(5deg) rotateX(-36deg);
          }
          100% {
            transform: rotateZ(360deg) translateX(var(--roles-orbit-radius)) rotateZ(-360deg) rotateY(5deg) rotateX(-36deg);
          }
        }
        @keyframes roles-orbit-phone-2-keyframes {
          0% {
            transform: rotateZ(120deg) translateX(var(--roles-orbit-radius)) rotateZ(-120deg) rotateY(5deg) rotateX(-36deg);
          }
          100% {
            transform: rotateZ(480deg) translateX(var(--roles-orbit-radius)) rotateZ(-480deg) rotateY(5deg) rotateX(-36deg);
          }
        }
        @keyframes roles-orbit-phone-3-keyframes {
          0% {
            transform: rotateZ(240deg) translateX(var(--roles-orbit-radius)) rotateZ(-240deg) rotateY(5deg) rotateX(-36deg);
          }
          100% {
            transform: rotateZ(600deg) translateX(var(--roles-orbit-radius)) rotateZ(-600deg) rotateY(5deg) rotateX(-36deg);
          }
        }

        /* Light Trails Flow Animation */
        @keyframes roles-dash-flow {
          to {
            stroke-dashoffset: -40;
          }
        }
        .roles-animate-dash-flow {
          animation: roles-dash-flow 4s linear infinite;
        }

        /* Ring Rotation */
        @keyframes roles-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .roles-ring-spin {
          transform-origin: 0px 0px;
          animation: roles-ring-spin 28s linear infinite;
          animation-play-state: var(--roles-orbit-play-state, running);
        }

        /* Soft Floating Card Animations */
        @keyframes roles-card-float-1-keyframes {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes roles-card-float-2-keyframes {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes roles-card-float-3-keyframes {
          0%, 100% { transform: translateY(0px) rotate(0.6deg); }
          50% { transform: translateY(-12px) rotate(-0.6deg); }
        }
        .roles-float-card-1 { animation: roles-card-float-1-keyframes 6s ease-in-out infinite; }
        .roles-float-card-2 { animation: roles-card-float-2-keyframes 7s ease-in-out infinite; }
        .roles-float-card-3 { animation: roles-card-float-3-keyframes 8s ease-in-out infinite; }

        /* Light-theme premium Frosted Glassmorphism */
        .roles-glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 
            0 4px 30px rgba(0, 0, 0, 0.02),
            0 1px 3px rgba(0, 0, 0, 0.01),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Subtle Volumetric Glows behind the 3D Orbit */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-radial from-[#5c60f5]/5 via-transparent to-transparent opacity-60 blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto z-10">
        
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <SectionHeader
            eyebrow="Who It's For"
            centered
            title={
              <>
                Built for every person
                <br />
                in the <span className="gradient-text">care circle.</span>
              </>
            }
            subtitle="One platform. Three distinct experiences. Each role gets exactly the tools they need, and nothing they don't."
          />
        </Reveal>

        <Reveal className="flex justify-center gap-2.5 mb-12" delay={0.1}>
          {[
            { id: 'patient', name: 'Alex (Patient)', icon: <User className="w-3.5 h-3.5" />, color: 'border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300' },
            { id: 'family', name: 'Sarah (Family)', icon: <Users className="w-3.5 h-3.5" />, color: 'border-purple-200 text-purple-600 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-300' },
            { id: 'caregiver', name: 'Dr. Miller (Caregiver)', icon: <Shield className="w-3.5 h-3.5" />, color: 'border-emerald-200 text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300' },
          ].map((role) => (
            <button
              key={role.id}
              onMouseEnter={() => {
                setActiveRole(role.id as any);
                setIsPaused(true);
              }}
              onMouseLeave={() => {
                setActiveRole(null);
                setIsPaused(false);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold rounded-full border transition-all duration-300 cursor-pointer shadow-sm ${
                activeRole === role.id 
                  ? 'scale-105 border-gray-900 bg-gray-900 text-white shadow-md' 
                  : role.color
              }`}
            >
              {role.icon}
              {role.name}
            </button>
          ))}
        </Reveal>

        {/* Full-Width Ecosystem Area */}
        <div 
          className="flex flex-col lg:relative lg:block items-center justify-center w-full min-h-[520px] sm:min-h-[640px] lg:min-h-[680px] overflow-visible"
          style={{ '--roles-orbit-play-state': isPaused ? 'paused' : 'running' } as React.CSSProperties}
        >
          
          {/* Centered 3D Orbit Ring Container */}
          <div className="relative z-10 flex items-center justify-center min-h-[420px] sm:min-h-[580px] lg:min-h-[680px] w-full max-w-[780px] mx-auto select-none">
            
            {/* 3D Scene */}
            <div className="roles-scene-3d relative w-full h-full flex items-center justify-center">
              
              {/* Inclined Orbit Ring */}
              <div className="roles-orbit-ring-3d relative">

                {/* SVG Connections and Trails */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" viewBox="-340 -340 680 680">
                  <defs>
                    <radialGradient id="roles-hub-gradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="60%" stopColor="#f5f3ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#eef2ff" stopOpacity="0" />
                    </radialGradient>

                    {/* Ring base gradient — much more saturated & opaque */}
                    <linearGradient id="roles-ring-path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                      <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.90" />
                      <stop offset="65%" stopColor="#5c60f5" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.70" />
                    </linearGradient>

                    {/* Soft outer glow ring — painted as a blurred fat circle */}
                    <filter id="roles-ring-glow">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>

                    <linearGradient id="roles-line-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="roles-line-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="roles-line-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* ── Spinning ring group — rotates at same speed as phone orbit ── */}
                  <g className="roles-ring-spin">
                  <circle
                    cx="0"
                    cy="0"
                    r="290"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="14"
                    opacity="0.18"
                    filter="url(#roles-ring-glow)"
                  />

                  {/* Main solid orbit ring */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="290" 
                    fill="none" 
                    stroke="url(#roles-ring-path-gradient)" 
                    strokeWidth="2"
                    opacity="1"
                  />

                  {/* Second slightly transparent ring for depth */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="290" 
                    fill="none" 
                    stroke="#a5b4fc" 
                    strokeWidth="1"
                    strokeDasharray="2 12"
                    opacity="0.5"
                  />

                  {/* Bright animated comet trail */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="290" 
                    fill="none" 
                    stroke="#5c60f5" 
                    strokeWidth="5"
                    strokeDasharray="28 200"
                    strokeLinecap="round"
                    className="roles-animate-dash-flow"
                    opacity="1"
                  />
                  {/* Secondary white comet core */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="290" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="2"
                    strokeDasharray="8 220"
                    strokeLinecap="round"
                    className="roles-animate-dash-flow"
                    opacity="0.9"
                  />

                  {/* Glow layer — To Patient (0deg) */}
                  <line x1="0" y1="0" x2="290" y2="0"
                    stroke="#3b82f6" strokeWidth="6" opacity="0.18" filter="url(#roles-ring-glow)" />
                  {/* To Patient — main dashed line */}
                  <line 
                    x1="0" y1="0" x2="290" y2="0" 
                    stroke="#3b82f6"
                    strokeWidth="2.5" 
                    strokeDasharray="6 7"
                    opacity="0.75"
                    className="roles-animate-dash-flow" 
                  />
                  
                  {/* Glow layer — To Family (120deg) */}
                  <line x1="0" y1="0" x2="-145" y2="251"
                    stroke="#8b5cf6" strokeWidth="6" opacity="0.18" filter="url(#roles-ring-glow)" />
                  {/* To Family — main dashed line */}
                  <line 
                    x1="0" y1="0" x2="-145" y2="251" 
                    stroke="#8b5cf6"
                    strokeWidth="2.5" 
                    strokeDasharray="6 7"
                    opacity="0.75"
                    className="roles-animate-dash-flow" 
                  />

                  {/* Glow layer — To Caregiver (240deg) */}
                  <line x1="0" y1="0" x2="-145" y2="-251"
                    stroke="#10b981" strokeWidth="6" opacity="0.18" filter="url(#roles-ring-glow)" />
                  {/* To Caregiver — main dashed line */}
                  <line 
                    x1="0" y1="0" x2="-145" y2="-251" 
                    stroke="#10b981"
                    strokeWidth="2.5" 
                    strokeDasharray="6 7"
                    opacity="0.75"
                    className="roles-animate-dash-flow" 
                  />

                  </g>
                </svg>

                {/* ────────────────── Phone 1: Patient Dashboard ────────────────── */}
                <div 
                  onMouseEnter={() => {
                    setActiveRole('patient');
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setActiveRole(null);
                    setIsPaused(false);
                  }}
                  className={`absolute left-1/2 top-1/2 -ml-[113px] -mt-[215px] roles-orbit-anim-1 transition-all duration-300 ${
                    activeRole === 'patient' ? 'scale-105 z-[150]' : 'scale-[var(--roles-phone-scale)] hover:z-[150]'
                  }`}
                >
                  <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl opacity-60 pointer-events-none transition-opacity duration-300" />
                  
                  <PhoneFrame size="side" premium={activeRole === 'patient'}>
                    <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between p-3.5 pb-5 text-slate-800">
                      
                      {/* Status spacer */}
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 px-1 pt-1.5">
                        <span>09:41</span>
                        <span>LTE 🔋</span>
                      </div>

                      {/* Screen */}
                      <div className="flex-1 flex flex-col justify-between mt-4 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[7px] uppercase tracking-wider text-blue-500 font-extrabold">Alex's Portal</span>
                            <h4 className="text-[12px] font-black leading-tight">My Recovery Plan</h4>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-[9px]">
                            👨‍⚕️
                          </div>
                        </div>

                        {/* AI mascot card */}
                        <div className="mt-2.5 p-2 bg-blue-500/8 border border-blue-500/15 rounded-xl flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] shadow-sm shrink-0">
                            🐻
                          </div>
                          <div className="text-left leading-tight">
                            <p className="text-[7px] text-blue-600 font-bold">Mr. Meddy AI</p>
                            <p className="text-[8px] text-slate-600 font-semibold">Ready for your afternoon dressing change?</p>
                          </div>
                        </div>

                        {/* Compliance tracking */}
                        <div className="mt-2.5 p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-center mb-1 text-[8px] font-bold">
                            <span className="text-slate-500">Daily Compliance</span>
                            <span className="text-blue-600">66% Complete</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '66%' }} />
                          </div>
                        </div>

                        {/* Checklist items */}
                        <div className="flex-1 flex flex-col gap-1.5 mt-2.5 overflow-hidden">
                          <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-100 shadow-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[8px]">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="text-[8.5px] font-bold text-slate-800 line-through opacity-60">Pa: 2x 500mg Paracetamol</span>
                            </div>
                            <span className="text-[7px] text-slate-400">8:00 AM</span>
                          </div>

                          <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 px-2.5 py-1.5 rounded-xl shadow-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border border-blue-300 bg-white flex items-center justify-center" />
                              <span className="text-[8.5px] font-bold text-slate-800">Clean & Change Surgical Dressings</span>
                            </div>
                            <span className="text-[7px] text-blue-500 font-extrabold">2:00 PM</span>
                          </div>

                          <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-100 shadow-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border border-slate-200 bg-white flex items-center justify-center" />
                              <span className="text-[8.5px] font-bold text-slate-500">Walk around room (10m)</span>
                            </div>
                            <span className="text-[7px] text-slate-400">6:00 PM</span>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[7px] font-bold text-slate-400">
                          <span>Day 3 of 10</span>
                          <span>HIPAA Safe 🔒</span>
                        </div>
                      </div>
                    </div>
                  </PhoneFrame>
                </div>

                {/* ────────────────── Phone 2: Family Dashboard ────────────────── */}
                <div 
                  onMouseEnter={() => {
                    setActiveRole('family');
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setActiveRole(null);
                    setIsPaused(false);
                  }}
                  className={`absolute left-1/2 top-1/2 -ml-[113px] -mt-[215px] roles-orbit-anim-2 transition-all duration-300 ${
                    activeRole === 'family' ? 'scale-105 z-[150]' : 'scale-[var(--roles-phone-scale)] hover:z-[150]'
                  }`}
                >
                  <div className="absolute -inset-10 rounded-full bg-purple-500/10 blur-3xl opacity-60 pointer-events-none transition-opacity duration-300" />

                  <PhoneFrame size="side" premium={activeRole === 'family'}>
                    <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between p-3.5 pb-5 text-slate-800">
                      
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 px-1 pt-1.5">
                        <span>09:41</span>
                        <span>LTE 🔋</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-between mt-4 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[7px] uppercase tracking-wider text-purple-600 font-extrabold">Family Tracker</span>
                            <h4 className="text-[12px] font-black leading-tight">Alex's Recovery</h4>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[9px] font-bold text-purple-600">
                            💝
                          </div>
                        </div>

                        {/* Event check */}
                        <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                          <span className="text-[14px]">✅</span>
                          <div className="text-left leading-tight">
                            <p className="text-[7px] text-emerald-600 font-bold">Latest Update</p>
                            <p className="text-[8.5px] text-slate-700 font-bold">Alex took morning meds on time.</p>
                          </div>
                        </div>

                        {/* Adherence circle */}
                        <div className="mt-2.5 p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                          <div className="text-left">
                            <span className="text-[7.5px] text-slate-400 uppercase tracking-wider font-extrabold block">Med Adherence</span>
                            <span className="text-[14px] font-black text-slate-800">96.8%</span>
                            <span className="text-[7px] text-emerald-500 font-extrabold block">Excellent Score 📈</span>
                          </div>
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-slate-100"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-purple-500"
                                strokeDasharray="96, 100"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <span className="absolute text-[8px] font-black">96%</span>
                          </div>
                        </div>

                        {/* Logs */}
                        <div className="flex-1 flex flex-col gap-1.5 mt-2.5 overflow-hidden">
                          <span className="text-[7px] text-slate-400 uppercase tracking-widest font-bold block text-left">Activity Feed</span>
                          
                          <div className="flex items-start gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-xs text-left">
                            <div className="w-4 h-4 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 text-[8px]">
                              🩺
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-800">Dressing change verified</p>
                              <p className="text-[7px] text-slate-400">12:30 PM by Nurse Practitioner</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-xs text-left">
                            <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-[8px]">
                              💊
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-800">Morning Ibuprofen logged</p>
                              <p className="text-[7px] text-slate-400">8:05 AM by Patient Alex</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 bg-purple-500 text-white rounded-xl py-1.5 text-[8.5px] font-extrabold shadow-sm hover:bg-purple-600 transition-colors">
                          💬 Text Care Team
                        </div>
                      </div>
                    </div>
                  </PhoneFrame>
                </div>

                {/* ────────────────── Phone 3: Caregiver Dashboard ────────────────── */}
                <div 
                  onMouseEnter={() => {
                    setActiveRole('caregiver');
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setActiveRole(null);
                    setIsPaused(false);
                  }}
                  className={`absolute left-1/2 top-1/2 -ml-[113px] -mt-[215px] roles-orbit-anim-3 transition-all duration-300 ${
                    activeRole === 'caregiver' ? 'scale-105 z-[150]' : 'scale-[var(--roles-phone-scale)] hover:z-[150]'
                  }`}
                >
                  <div className="absolute -inset-10 rounded-full bg-emerald-500/10 blur-3xl opacity-60 pointer-events-none transition-opacity duration-300" />

                  <PhoneFrame size="side" premium={activeRole === 'caregiver'}>
                    <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between p-3.5 pb-5 text-slate-800">
                      
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 px-1 pt-1.5">
                        <span>09:41</span>
                        <span>LTE 🔋</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-between mt-4 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[7px] uppercase tracking-wider text-emerald-600 font-extrabold">Clinician Console</span>
                            <h4 className="text-[12px] font-black leading-tight">Patient Care Queue</h4>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[9px] text-emerald-600">
                            🧑‍⚕️
                          </div>
                        </div>

                        {/* Patient info */}
                        <div className="mt-2.5 p-2 bg-white rounded-xl border border-slate-100 shadow-sm text-left">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-slate-800">Alex Johnson</span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-[6.5px] font-black text-emerald-700">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                              Stable
                            </span>
                          </div>
                          <p className="text-[7.5px] text-slate-400 leading-tight">Post-Op Day 3 · Inguinal Hernia Repair</p>
                        </div>

                        {/* Vitals */}
                        <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                          <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-left">
                            <span className="text-[6.5px] text-slate-400 uppercase font-extrabold block">Pain Level</span>
                            <span className="text-[10px] font-black text-slate-800">2 / 10</span>
                            <span className="text-[6px] text-emerald-500 font-bold block">Controlled</span>
                          </div>
                          <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-left">
                            <span className="text-[6.5px] text-slate-400 uppercase font-extrabold block">Compliance</span>
                            <span className="text-[10px] font-black text-slate-800">100%</span>
                            <span className="text-[6px] text-emerald-500 font-bold block">Fully Compliant</span>
                          </div>
                        </div>

                        {/* Logs queue */}
                        <div className="flex-1 flex flex-col gap-1.5 mt-2.5 overflow-hidden">
                          <span className="text-[7px] text-slate-400 uppercase tracking-widest font-bold block text-left">Clinical Reports</span>
                          
                          <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs text-left leading-tight">
                            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[7.5px] mb-0.5">
                              <span>🩹 Wound Photo:</span>
                              <span className="text-emerald-600">Normal healing</span>
                            </div>
                            <p className="text-[7px] text-slate-400">NP checked photo. Incision edges clean, no redness or exudate logged.</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-2 flex gap-1.5">
                          <div className="flex-1 bg-white border border-slate-200 text-slate-700 rounded-xl py-1 text-[8px] font-black shadow-2xs hover:bg-slate-50 cursor-pointer">
                            🗒️ Clinical Note
                          </div>
                          <div className="flex-1 bg-emerald-500 text-white rounded-xl py-1 text-[8px] font-black shadow-sm hover:bg-emerald-600 cursor-pointer">
                            📞 Call Patient
                          </div>
                        </div>
                      </div>
                    </div>
                  </PhoneFrame>
                </div>

                {/* ────────────────── Central Hub: "Connected Care" ────────────────── */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex flex-col items-center justify-center pointer-events-none"
                  style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, 0)' }}
                >
                  <div className="absolute w-28 h-28 rounded-full border border-blue-500/10 animate-ping" style={{ animationDuration: '3.5s' }} />
                  <div className="absolute w-36 h-36 rounded-full border border-purple-500/10 animate-ping" style={{ animationDuration: '5s' }} />
                  <div className="absolute w-44 h-44 rounded-full border border-emerald-500/10 animate-ping" style={{ animationDuration: '6.5s' }} />
                  
                  <div className="w-24 h-24 rounded-full border border-slate-200/80 bg-white/95 shadow-lg flex flex-col items-center justify-center p-3 text-center backdrop-blur-md">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5c60f5] to-[#7c3aed] flex items-center justify-center shadow-md mb-1.5 animate-pulse">
                      <Heart className="w-4 h-4 text-white fill-white/10" />
                    </div>
                    <span className="text-[8.5px] font-black uppercase tracking-wider bg-gradient-to-r from-[#5c60f5] to-[#7c3aed] bg-clip-text text-transparent">
                      Connected
                    </span>
                    <span className="text-[6.5px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Care Hub
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ────────────────── Responsive Floating/Stacked Glassmorphic Cards ────────────────── */}
          {/* Card Wrapper behaving as layout items on mobile/tablet, and absolute nodes on desktop */}
          <div className="w-full lg:contents flex flex-col md:flex-row gap-4 mt-8 lg:mt-0 justify-center px-4">
            
            {/* Card 1: Medication Reminder (floating left) */}
            <div className="lg:absolute lg:left-4 xl:left-12 lg:top-24 w-full md:w-[260px] lg:w-[210px] xl:w-[240px] z-[200] lg:roles-float-card-1 pointer-events-auto transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] rounded-2xl">
              <div className="roles-glass-card border-l-4 border-l-blue-500 p-3.5 rounded-2xl shadow-sm">
                <div className="flex items-start gap-2.5 text-left">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    💊
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-900 leading-tight">Patient Dashboard</h5>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Pa: 2 tablets at 12:00 PM</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[8.5px] font-extrabold text-blue-500 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      <Clock className="w-2.5 h-2.5" /> Pending Confirm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Adherence Score (floating bottom-left/middle) */}
            <div className="lg:absolute lg:left-12 xl:left-24 lg:bottom-12 w-full md:w-[260px] lg:w-[210px] xl:w-[240px] z-[200] lg:roles-float-card-2 pointer-events-auto transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(139,92,246,0.12)] rounded-2xl">
              <div className="roles-glass-card border-l-4 border-l-purple-500 p-3.5 rounded-2xl shadow-sm">
                <div className="flex items-start gap-2.5 text-left">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    📈
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-900 leading-tight">Adherence Score</h5>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Recovery Index: 96%</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[8.5px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      <TrendingUp className="w-2.5 h-2.5" /> +4.2% vs yesterday
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Caregiver Alert (floating right) */}
            <div className="lg:absolute lg:right-4 xl:right-12 lg:top-32 w-full md:w-[260px] lg:w-[210px] xl:w-[240px] z-[200] lg:roles-float-card-3 pointer-events-auto transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] rounded-2xl">
              <div className="roles-glass-card border-l-4 border-l-emerald-500 p-3.5 rounded-2xl shadow-sm">
                <div className="flex items-start gap-2.5 text-left">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    🚨
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-900 leading-tight">Caregiver Status</h5>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Dressing checked by Nurse</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[8.5px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      <Shield className="w-2.5 h-2.5" /> Healing Normally
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
