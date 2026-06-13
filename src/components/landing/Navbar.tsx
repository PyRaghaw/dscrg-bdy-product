'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#story',    label: 'How It Works' },
  { href: '#features', label: 'Features'     },
  { href: '#beary',    label: 'Meddy'         },
  { href: '#roles',    label: 'For You'       },
  { href: '#download', label: 'Download'      },
];

export function Navbar({ hasBar = true }: { hasBar?: boolean }) {
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 z-[200] transition-all duration-500 ${
        hasBar ? 'top-[42px]' : 'top-0'
      }`}
    >
      {/* Pill wrapper */}
      <div
        className={`mx-auto transition-all duration-500 ${
          scrolled
            ? 'max-w-[1120px] mt-3 px-2 rounded-[999px] bg-white/94 backdrop-blur-2xl border border-black/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
            : 'max-w-[1200px] px-5 md:px-12'
        }`}
      >
        <div className={`flex items-center justify-between gap-4 transition-all duration-500 ${scrolled ? 'h-[58px] px-4' : 'h-[68px]'}`}>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-[34px] h-[34px] shrink-0">
              <div className="absolute inset-[-4px] rounded-[14px] bg-brand/15 animate-ring-pulse" />
              <div className="relative w-full h-full rounded-[9px] flex items-center justify-center text-[15px] shadow-[0_4px_14px_rgba(92,96,245,0.35)]"
                style={{ background: 'linear-gradient(135deg,#5c60f5,#7c3aed)' }}>
                🏥
              </div>
            </div>
            <span className="font-[family-name:var(--font-bricolage)] text-[18px] font-black text-gray-900 whitespace-nowrap tracking-tight">
              VANI
            </span>
          </a>

          {/* Links */}
          <ul className="hidden xl:flex gap-0.5 list-none mx-auto">
            {NAV_LINKS.map(link => {
              const active = activeSection === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`relative block whitespace-nowrap text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                      active
                        ? 'text-brand bg-brand-light'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#"
              className="hidden sm:inline-flex text-[13px] font-medium text-gray-500 px-3.5 py-1.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              Sign In
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-extrabold text-white btn-shimmer shadow-[0_4px_16px_rgba(92,96,245,0.35)] hover:shadow-[0_6px_24px_rgba(92,96,245,0.5)] hover:-translate-y-px transition-all duration-200 shrink-0"
            >
              Get the App
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
