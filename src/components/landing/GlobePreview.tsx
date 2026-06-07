'use client';

import { motion } from 'framer-motion';
import { Globe3D, type GlobeMarker } from '@/components/ui/3d-globe';
import { PhoneFrame } from './ui/PhoneFrame';

const avatar = (initials: string, bg: string, fg = '#ffffff') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
          <stop offset="100%" stop-color="#020617" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#g)"/>
      <circle cx="48" cy="34" r="17" fill="${fg}" opacity=".92"/>
      <path d="M20 82c4-20 18-31 28-31s24 11 28 31" fill="${fg}" opacity=".9"/>
      <text x="48" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#fff">${initials}</text>
    </svg>
  `)}`;

const careMarkers: GlobeMarker[] = [
  {
    lat: 28.6139,
    lng: 77.209,
    src: avatar('AD', '#ec4899'),
    label: 'Asha • Daughter',
    detail: 'Delhi • missed-dose alerts and SOS access',
    color: '#f472b6',
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: avatar('NK', '#2563eb'),
    label: 'Nikhil • Caregiver',
    detail: 'London • live medication and symptom sync',
    color: '#60a5fa',
  },
  {
    lat: 19.076,
    lng: 72.8777,
    src: avatar('DM', '#059669'),
    label: 'Dr. Meera • Nurse',
    detail: 'Mumbai • AI shift briefing ready',
    color: '#34d399',
  },
  {
    lat: 40.7128,
    lng: -74.006,
    src: avatar('RP', '#7c3aed'),
    label: 'Ravi • Patient',
    detail: 'New York • recovery score improving',
    color: '#a78bfa',
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: avatar('MY', '#f59e0b'),
    label: 'Maya • Family',
    detail: 'Tokyo • family dashboard active',
    color: '#fbbf24',
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: avatar('CB', '#06b6d4'),
    label: 'Care Bridge • Hospital',
    detail: 'Sydney • discharge plan shared',
    color: '#22d3ee',
  },
];

const networkStats = [
  ['92%', 'adherence'],
  ['14', 'live plans'],
  ['3m', 'avg alert'],
] as const;

export function GlobePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex w-full max-w-[420px] items-center justify-center"
    >
      <div className="absolute inset-x-0 top-8 h-24 rounded-full bg-brand/10 blur-3xl" />
      <PhoneFrame
        className="w-[326px] md:w-[350px]"
        float="main"
        premium
        title="Recovery Globe"
        subtitle="Daughter, caregiver, and hospital network"
      >
        <div className="relative h-[520px] w-full overflow-hidden bg-[linear-gradient(160deg,#020617_0%,#07111f_38%,#10233d_72%,#04111f_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.24),transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.07),transparent_28%,rgba(16,185,129,0.1)_100%)]" />
          <div className="absolute inset-x-4 top-[86px] z-10 grid grid-cols-3 gap-2">
            {networkStats.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] px-2.5 py-2 text-white shadow-xl backdrop-blur-xl">
                <p className="font-[family-name:var(--font-bricolage)] text-[17px] font-bold leading-none">{value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-300">{label}</p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-[106px] left-4 z-10 w-[142px] rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2.5 text-emerald-50 shadow-xl backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-100/80">Next dose</p>
            <p className="mt-1 text-sm font-semibold">Metformin • 8:30 PM</p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-10 rounded-[28px] border border-white/10 bg-black/35 p-3.5 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-sky-100/80">Family sync</p>
                <p className="mt-1 text-[13px] leading-snug text-white/90">
                  Asha, Nikhil, and Dr. Meera are connected in real time.
                </p>
              </div>
              <div className="flex -space-x-2">
                {careMarkers.slice(0, 3).map((marker) => (
                  <img
                    key={marker.label}
                    src={marker.src}
                    alt={marker.label}
                    className="h-8 w-8 rounded-full border-2 border-slate-950 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-x-[-46px] bottom-[18px] top-[108px]">
            <Globe3D
              markers={careMarkers}
              config={{
                atmosphereColor: '#38bdf8',
                atmosphereIntensity: 20,
                bumpScale: 5,
                autoRotateSpeed: 0.16,
              }}
              className="h-full w-full"
            />
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  );
}
