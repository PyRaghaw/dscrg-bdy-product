'use client';

type MrMeddyState = 'waving' | 'concerned' | 'pointing' | 'sleeping' | 'happy';

interface MrMeddyProps {
  state?: MrMeddyState;
  className?: string;
}

export function MrMeddy({ state = 'happy', className }: MrMeddyProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="92" rx="25" ry="4" fill="#cbd5e1" opacity="0.5" />

      <rect x="28" y="46" width="44" height="38" rx="18" fill="white" stroke="#e2e8f0" strokeWidth="2.5" />
      <ellipse cx="50" cy="65" rx="14" ry="12" fill="#f8fafc" />

      <circle cx="50" cy="38" r="24" fill="white" stroke="#e2e8f0" strokeWidth="2.5" />

      <circle cx="28" cy="18" r="8" fill="#5c60f5" />
      <circle cx="28" cy="18" r="4" fill="#eef2ff" />
      <circle cx="72" cy="18" r="8" fill="#5c60f5" />
      <circle cx="72" cy="18" r="4" fill="#eef2ff" />

      {state === 'sleeping' ? (
        <>
          <path d="M38 38 Q42 41 46 38" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M54 38 Q58 41 62 38" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : state === 'concerned' ? (
        <>
          <ellipse cx="41" cy="37" rx="2.5" ry="3.5" fill="#0f172a" />
          <ellipse cx="59" cy="37" rx="2.5" ry="3.5" fill="#0f172a" />
          <path d="M38 31 Q41 33 44 32" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M62 31 Q59 33 56 32" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="41" cy="37" r="3" fill="#0f172a" />
          <circle cx="59" cy="37" r="3" fill="#0f172a" />
          <circle cx="42" cy="36" r="1" fill="white" />
          <circle cx="60" cy="36" r="1" fill="white" />
        </>
      )}

      <circle cx="34" cy="43" r="3.5" fill="#fca5a5" opacity="0.6" />
      <circle cx="66" cy="43" r="3.5" fill="#fca5a5" opacity="0.6" />

      <ellipse cx="50" cy="41" rx="3" ry="2" fill="#5c60f5" />
      {state === 'concerned' ? (
        <path d="M48 46 Q50 44 52 46" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      ) : state === 'sleeping' ? (
        <circle cx="50" cy="47" r="1.5" fill="#475569" />
      ) : (
        <path d="M47 45 Q50 48 53 45" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      )}

      {state === 'waving' ? (
        <>
          <path d="M28 56 Q16 43 14 32" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="14" cy="32" r="4.5" fill="#5c60f5" />
          <path d="M72 56 Q82 64 80 72" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="80" cy="72" r="4.5" fill="#5c60f5" />
        </>
      ) : state === 'pointing' ? (
        <>
          <path d="M28 58 Q38 58 48 53" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="48" cy="53" r="4.5" fill="#5c60f5" />
          <path d="M72 56 Q82 64 80 72" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="80" cy="72" r="4.5" fill="#5c60f5" />
        </>
      ) : state === 'happy' ? (
        <>
          <path d="M28 54 Q15 44 18 34" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="18" cy="34" r="4.5" fill="#5c60f5" />
          <path d="M72 54 Q85 44 82 34" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="82" cy="34" r="4.5" fill="#5c60f5" />
        </>
      ) : (
        <>
          <path d="M28 56 Q18 64 20 72" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="20" cy="72" r="4.5" fill="#5c60f5" />
          <path d="M72 56 Q82 64 80 72" stroke="#5c60f5" strokeWidth="7" strokeLinecap="round" />
          <circle cx="80" cy="72" r="4.5" fill="#5c60f5" />
        </>
      )}

      <circle cx="36" cy="85" r="6" fill="#5c60f5" />
      <circle cx="64" cy="85" r="6" fill="#5c60f5" />
    </svg>
  );
}
