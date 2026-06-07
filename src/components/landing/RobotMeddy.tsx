'use client';

import { cn } from '@/lib/utils';

interface RobotMeddyProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

const sizeMap = {
  sm: 'w-14 h-14',
  md: 'w-32 h-32',
  lg: 'w-56 h-56',
  hero: 'w-[260px] h-[260px] md:w-[360px] md:h-[360px]',
};

export function RobotMeddy({ className, size = 'md' }: RobotMeddyProps) {
  return (
    <div className={cn('relative select-none', sizeMap[size], className)}>
      <div className="absolute inset-[8%] rounded-full bg-brand/20 blur-3xl animate-glow-pulse" />
      <svg className="relative h-full w-full drop-shadow-[0_28px_60px_rgba(92,96,245,0.28)]" viewBox="0 0 240 240" fill="none">
        <defs>
          <linearGradient id="robotBody" x1="44" y1="30" x2="184" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#cfcfd6" />
            <stop offset="1" stopColor="#7b7788" />
          </linearGradient>
          <linearGradient id="robotPurple" x1="46" y1="46" x2="214" y2="212" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d8c3ff" />
            <stop offset="0.45" stopColor="#a779f2" />
            <stop offset="1" stopColor="#6f55e8" />
          </linearGradient>
          <linearGradient id="robotFace" x1="72" y1="60" x2="178" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4b4658" />
            <stop offset="1" stopColor="#171724" />
          </linearGradient>
          <radialGradient id="robotShine" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(86 42) rotate(51) scale(130 92)">
            <stop stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.46" stopColor="#ffffff" stopOpacity="0.24" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="120" cy="220" rx="64" ry="11" fill="#6f55e8" opacity="0.16" />

        <path d="M52 113C34 109 24 92 31 77C38 62 56 59 69 70L76 91L69 108C65 112 59 114 52 113Z" fill="url(#robotPurple)" />
        <path d="M188 113C206 109 216 92 209 77C202 62 184 59 171 70L164 91L171 108C175 112 181 114 188 113Z" fill="url(#robotPurple)" />
        <ellipse cx="47" cy="84" rx="13" ry="25" transform="rotate(-18 47 84)" fill="#b992fa" />
        <ellipse cx="193" cy="84" rx="13" ry="25" transform="rotate(18 193 84)" fill="#b992fa" />

        <rect x="52" y="36" width="136" height="96" rx="34" fill="url(#robotBody)" />
        <rect x="69" y="55" width="102" height="61" rx="20" fill="url(#robotFace)" />
        <path d="M52 49C63 33 88 27 123 31C94 34 70 48 60 72C57 79 55 92 54 104C45 82 43 63 52 49Z" fill="url(#robotShine)" opacity="0.7" />

        <path d="M84 77C91 67 103 67 110 77" stroke="#d6c4ff" strokeWidth="9" strokeLinecap="round" />
        <path d="M130 77C137 67 149 67 156 77" stroke="#d6c4ff" strokeWidth="9" strokeLinecap="round" />
        <path d="M75 60L69 60L69 66" stroke="#dac8ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M165 60L171 60L171 66" stroke="#dac8ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M75 109L69 109L69 103" stroke="#dac8ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M165 109L171 109L171 103" stroke="#dac8ff" strokeWidth="4" strokeLinecap="round" />

        <path d="M76 133C83 155 98 169 120 169C142 169 157 155 164 133L150 205C146 219 134 227 120 227C106 227 94 219 90 205L76 133Z" fill="url(#robotBody)" />
        <path d="M84 139C101 151 139 151 156 139L146 184C136 195 104 195 94 184L84 139Z" fill="url(#robotPurple)" opacity="0.92" />
        <ellipse cx="121" cy="154" rx="43" ry="18" fill="#d7c4ff" opacity="0.55" />

        <path d="M82 149C66 153 48 170 45 190" stroke="#2d2a33" strokeWidth="7" strokeLinecap="round" />
        <path d="M158 149C174 153 192 170 195 190" stroke="#2d2a33" strokeWidth="7" strokeLinecap="round" />
        <circle cx="45" cy="190" r="9" fill="#1f1f27" />
        <circle cx="195" cy="190" r="9" fill="#1f1f27" />
        <circle cx="166" cy="180" r="20" fill="url(#robotBody)" stroke="#30303a" strokeWidth="5" />
        <circle cx="166" cy="180" r="9" fill="#f8fafc" stroke="#777986" strokeWidth="3" />

        <path d="M50 144C38 152 32 171 35 188" stroke="url(#robotPurple)" strokeWidth="20" strokeLinecap="round" />
        <path d="M190 144C202 152 208 171 205 188" stroke="url(#robotPurple)" strokeWidth="20" strokeLinecap="round" />
        <path d="M42 190C39 205 47 214 61 209" stroke="url(#robotBody)" strokeWidth="19" strokeLinecap="round" />
        <path d="M198 190C201 205 193 214 179 209" stroke="url(#robotBody)" strokeWidth="19" strokeLinecap="round" />
      </svg>
    </div>
  );
}
