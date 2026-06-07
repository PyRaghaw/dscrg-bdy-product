'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { MeddyAppPhone } from './MeddyAppPhone';
import { RobotMeddy } from './RobotMeddy';
import ShapeGrid from '@/components/ui/ShapeGrid';

const fly = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const, delay },
});

export function Hero() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* ── Animated mesh background ── */}
      <div className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 15% 30%, rgba(92,96,245,0.11) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 70% at 85% 15%, rgba(124,58,237,0.09) 0%, transparent 55%),' +
            'radial-gradient(ellipse 80% 80% at 50% 110%, rgba(99,102,241,0.06) 0%, transparent 60%),' +
            '#ffffff',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 10s ease infinite',
        }}
      />
      
      {/* Dynamic Interactive ShapeGrid Background */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <ShapeGrid 
          shape="hexagon" 
          squareSize={48} 
          borderColor="rgba(92, 96, 245, 0.12)" 
          hoverFillColor="rgba(92, 96, 245, 0.08)"
          speed={0.4}
          direction="diagonal"
          hoverTrailAmount={6}
        />
      </div>

      {/* Premium Side & Bottom Border lines with Gradient Glows */}
      <div className="absolute inset-y-0 left-4 md:left-12 h-full w-px bg-neutral-200/50 pointer-events-none">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-[#5c60f5] to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-4 md:right-12 h-full w-px bg-neutral-200/50 pointer-events-none">
        <div className="absolute top-20 h-40 w-px bg-gradient-to-b from-transparent via-[#5c60f5] to-transparent" />
      </div>
      <div className="absolute inset-x-4 md:inset-x-12 bottom-0 h-px bg-neutral-200/50 pointer-events-none">
        <div className="absolute left-1/4 h-px w-80 bg-gradient-to-r from-transparent via-[#5c60f5] to-transparent" />
      </div>

      <section className="pt-[160px] pb-0 px-5 md:px-12 max-w-[1260px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center min-h-screen relative z-10">

        {/* Left — copy */}
        <div className="pb-16 lg:pb-24 max-lg:text-center">

          {/* Eyebrow */}
          <motion.div
            {...fly(0)}
            className="relative gradient-border inline-flex items-center gap-2 bg-brand-light text-brand text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot shrink-0" />
            AI-Powered Post-Discharge Care
          </motion.div>

          {/* Headline with split word animation */}
          <h1 className="font-[family-name:var(--font-bricolage)] text-[clamp(46px,5.8vw,80px)] font-black leading-[1.0] tracking-[-0.045em] text-gray-900 mb-6">
            {"Recovery starts"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            <br />
            {"where hospitals"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (index + 2) * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            <br />
            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.5,
                ease: "easeInOut",
              }}
              className="gradient-text inline-block"
            >
              stop.
            </motion.span>
          </h1>

          {/* Sub */}
          <motion.p
            {...fly(0.16)}
            className="text-[clamp(16px,1.5vw,20px)] text-gray-500 leading-[1.7] font-light mb-10 max-w-[500px] max-lg:mx-auto"
          >
            Discharge Buddy turns confusing hospital paperwork into a clear,
            AI-monitored recovery plan — with smart reminders, real-time family
            alerts, and a companion that celebrates every win.
          </motion.p>

          {/* CTA row */}
          <motion.div
            {...fly(0.24)}
            className="flex gap-3 flex-wrap max-lg:justify-center mb-10"
          >
            <Button href="#download" variant="primary-lg">
              📲 Download Free · No credit card
            </Button>
            <Button href="#story" variant="outline-lg">
              See how it works →
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            {...fly(0.32)}
            className="flex items-center gap-5 max-lg:justify-center flex-wrap"
          >
            {[
              { icon: '🔒', text: 'HIPAA-ready' },
              { icon: '⭐', text: 'Free forever' },
              { icon: '🌐', text: 'Works offline' },
              { icon: '🏆', text: 'Google Solution Challenge 2026' },
            ].map((b, i) => (
              <div key={b.text} className="flex items-center gap-5">
                {i > 0 && <div className="w-px h-3.5 bg-gray-200 max-lg:hidden" />}
                <div className="flex items-center gap-1.5 text-[12px] text-gray-400 font-medium">
                  <span className="text-[13px]">{b.icon}</span>
                  {b.text}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center pb-12 lg:pb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute -right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
          >
            <RobotMeddy size="lg" className="animate-mascot-drift" />
          </motion.div>
          <MeddyAppPhone />
        </motion.div>
      </section>
    </div>
  );
}
