'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';
import { GlobePreview } from './GlobePreview';

export function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Single shutter moving from covering the section (0%) to fully up (-100%)
  const shutterY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={containerRef} className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden bg-white">
      {/* Glassmorphism Shutter Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-[100] backdrop-blur-xl bg-white/40 border-b border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-end justify-center pb-8"
        style={{ y: shutterY }}
      >
        <div className="w-32 h-[3px] bg-white/60 rounded-full shadow-sm" />
      </motion.div>

      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto space-y-12">
        {/* Top: Problem text centered above the card */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="The Problem"
              title={
                <>
                  The system sends patients home
                  <br />
                  <span className="gradient-text">completely unprepared.</span>
                </>
              }
              subtitle="Hospitals spend thousands on care. Then hand patients a 12-page packet they can't understand and wish them luck. The result is entirely predictable."
            />
          </div>
        </Reveal>

        {/* Bottom: Full-width Globe card */}
        <Reveal delay={0.2}>
          <GlobePreview />
        </Reveal>
      </div>
    </section>
  );
}
