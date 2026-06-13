'use client';

const COLS = {
  Product: ['How It Works', 'Features', 'Beary', 'For Patients', 'For Caregivers', 'Download'],
  Company: ['About Us', 'Blog', 'GitHub', 'Press Kit', 'Solution Challenge 2026'],
  Legal:   ['Privacy Policy', 'Terms of Service', 'HIPAA Notice', 'Contact Us'],
};

const SOCIALS = [
  {
    label: 'GitHub',
    href: '#',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'X / Twitter',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

export function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 px-5 md:px-12 overflow-hidden"
      style={{ background: '#06060e' }}
    >
      {/* Glow top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[600px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(92,96,245,0.45),transparent)' }}
      />
      {/* Ambient orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none blur-[120px]"
        style={{ background: 'radial-gradient(ellipse,rgba(92,96,245,0.06) 0%,transparent 70%)' }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-[14px] shrink-0"
                style={{ background: 'linear-gradient(135deg,#5c60f5,#7c3aed)', boxShadow: '0 4px 16px rgba(92,96,245,0.4)' }}
              >
                🏥
              </div>
              <span className="font-[family-name:var(--font-bricolage)] text-[18px] font-black text-white tracking-tight">
                VANI
              </span>
            </a>
            <p className="text-[13px] text-white/35 leading-[1.75] max-w-[230px] mb-7">
              Turning hospital discharge confusion into a clear, AI-powered recovery journey. Built for humans.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-brand/20 hover:border-brand/40 transition-all duration-200"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.18em] mb-5">{title}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-white/45 hover:text-white/90 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-[12px] text-white/20">© 2026 VANI · All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[12px] text-white/20">
            Made with <span className="text-rose-500/80">♥</span> for Google Solution Challenge 2026 🏆
          </p>
        </div>
      </div>
    </footer>
  );
}
