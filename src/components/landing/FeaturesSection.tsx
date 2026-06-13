'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';
import ShapeGrid from '@/components/ui/ShapeGrid';
import dynamic from 'next/dynamic';

const DEFAULT_PARTICLE_COUNT = 14;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '92, 96, 245'; // Brand Indigo Glow: rgb(92, 96, 245)
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 0.75);
    box-shadow: 0 0 5px rgba(${color}, 0.4);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

interface ParticleCardProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties & Record<string, string>;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<any[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<any>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.35,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.04;
        const magnetY = (y - centerY) * 0.04;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.25) 0%, rgba(${glowColor}, 0.08) 35%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.05) 0%,
        rgba(${glowColor}, 0.02) 25%,
        rgba(${glowColor}, 0.005) 55%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = !!mouseInside;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

interface BentoCardGridProps {
  children?: React.ReactNode;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

const BentoCardGrid = ({ children, gridRef }: BentoCardGridProps) => (
  <div
    className="bento-section grid gap-4 p-3 max-w-[76rem] select-none relative mx-auto"
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

interface CustomBentoCard {
  label: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  screenshot?: string;
  layoutClass: string;
  isWide: boolean;
  bullets?: string[];
  imagePosition?: string;
}

export function MagicBento({
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  // Feature cards list in exact user-defined serial order
  const cardData: CustomBentoCard[] = [
    {
      label: "AI Scanner",
      title: "Smart OCR Scanner",
      description: "Instantly digitize prescriptions and summaries into digital schedules.",
      icon: "📷",
      iconBg: "bg-purple-50",
      screenshot: "/screenshots/scan.jpg",
      layoutClass: "col-span-1",
      isWide: false,
      imagePosition: "center 38%"
    },
    {
      label: "Voice Assistant",
      title: "Voice-First Assistant",
      description: "Speak naturally to log medicines or query first-aid in multi-languages.",
      bullets: [
        "Hindi, English & 12+ languages",
        "Hands-free logs & quick checks",
        "Natural, low-latency audio feed"
      ],
      icon: "🎙️",
      iconBg: "bg-indigo-50",
      screenshot: "/screenshots/voice-first.png",
      layoutClass: "col-span-1 lg:col-span-2",
      isWide: true,
      imagePosition: "center 80%"
    },
    {
      label: "Safety Checker",
      title: "Drug Interaction Checker",
      description: "Check your medications for conflicts and dangerous drug combinations instantly.",
      bullets: [
        "Cross-references multi-drug lists",
        "Identifies mild, moderate & severe interactions",
        "Provides doctor spacing guidance summaries"
      ],
      icon: "🛡️",
      iconBg: "bg-emerald-50",
      screenshot: "/screenshots/drug-interaction.png",
      layoutClass: "col-span-1 lg:col-span-2",
      isWide: true,
      imagePosition: "center top"
    },
    {
      label: "Risk Monitor",
      title: "Live Risk Monitor",
      description: "Tracks symptoms and vital logs in real-time with risk warnings.",
      icon: "🚨",
      iconBg: "bg-rose-50",
      screenshot: "/screenshots/symptoms.jpg",
      layoutClass: "col-span-1",
      isWide: false,
      imagePosition: "center 28%"
    },
    {
      label: "Emergency Hub",
      title: "Smart SOS Emergency",
      description: "Rapid tap, voice triggers, or shakes notify caregivers with location.",
      icon: "🆘",
      iconBg: "bg-red-50",
      screenshot: "/screenshots/smart-sos.png",
      layoutClass: "col-span-1",
      isWide: false,
      imagePosition: "center 38%"
    },
    {
      label: "Offline SOS",
      title: "Offline Emergency Mode",
      description: "First-aid guidance and peer location sharing function fully off-grid.",
      bullets: [
        "Local peer mesh connections",
        "Pre-downloaded offline maps",
        "First-aid database lookups"
      ],
      icon: "📴",
      iconBg: "bg-emerald-50",
      screenshot: "/screenshots/offline-emergency.png",
      layoutClass: "col-span-1 lg:col-span-2",
      isWide: true,
      imagePosition: "center 32%"
    }
  ];

  return (
    <>
      <style jsx global>{`
        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 240px;
          --glow-color: ${glowColor};
          --border-color: rgba(0, 0, 0, 0.05);
          --background-card: #ffffff;
          --text-title: #0f172a;
          --text-desc: #475569;
          --white: #0f172a;
          --purple-primary: rgba(92, 96, 245, 1);
          --purple-glow: rgba(92, 96, 245, 0.1);
          --purple-border: rgba(92, 96, 245, 0.18);
        }
        
        .card-responsive {
          grid-template-columns: 1fr;
          width: 100%;
          margin: 0 auto;
        }
        
        @media (min-width: 640px) {
          .card-responsive {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .card-responsive {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1.5px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(${glowColor}, calc(var(--glow-intensity) * 0.45)) 0%,
              rgba(${glowColor}, calc(var(--glow-intensity) * 0.18)) 45%,
              transparent 80%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        
        .card--border-glow:hover::after {
          opacity: 1;
        }
        
        .card--border-glow:hover {
          border-color: rgba(92, 96, 245, 0.16);
          box-shadow: 0 12px 30px rgba(92, 96, 245, 0.04), 0 0 20px rgba(${glowColor}, 0.02);
        }
        
        .particle::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: rgba(${glowColor}, 0.15);
          border-radius: 50%;
          z-index: -1;
        }
        
        .particle-container:hover {
          box-shadow: 0 4px 20px rgba(92, 96, 245, 0.06), 0 0 30px rgba(${glowColor}, 0.05);
        }
        
        .text-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .text-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .border-beam-container {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 5;
          padding: 1.5px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          overflow: hidden;
        }
        .border-beam-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 50%, rgba(92, 96, 245, 0.85) 80%, rgba(16, 185, 129, 0.95) 95%, transparent 100%);
          transform: translate(-50%, -50%) rotate(0deg);
          transform-origin: center;
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: border-beam-spin 3s linear infinite;
        }
        .card:hover .border-beam-spinner {
          opacity: 1;
        }
        @keyframes border-beam-spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .card-inner-lift {
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card:hover .card-inner-lift {
          transform: translateY(-4px);
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[76rem] mx-auto">
          {cardData.map((card, index) => {
            const baseClassName = `card flex flex-col justify-between relative h-[360px] w-full max-w-full p-6 rounded-[28px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 group ${card.layoutClass} ${
              enableBorderGlow ? 'card--border-glow' : ''
            }`;

            const cardStyle = {
              backgroundColor: 'var(--background-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-title)',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px'
            } as React.CSSProperties & Record<string, string>;

            const CardContainer = ({ children: childNodes }: { children: React.ReactNode }) => {
              if (enableStars) {
                return (
                  <ParticleCard
                    className={baseClassName}
                    style={cardStyle}
                    disableAnimations={shouldDisableAnimations}
                    particleCount={particleCount}
                    glowColor={glowColor}
                    enableTilt={enableTilt}
                    clickEffect={clickEffect}
                    enableMagnetism={enableMagnetism}
                  >
                    {childNodes}
                  </ParticleCard>
                );
              }
              return (
                <div
                  className={baseClassName}
                  style={cardStyle}
                  ref={el => {
                    if (!el) return;
                    if ((el as any)._hasListeners) return;
                    (el as any)._hasListeners = true;

                    const handleMouseMove = (e: MouseEvent) => {
                      if (shouldDisableAnimations) return;

                      const rect = el.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;

                      if (enableTilt) {
                        const rotateX = ((y - centerY) / centerY) * -8;
                        const rotateY = ((x - centerX) / centerX) * 8;

                        gsap.to(el, {
                          rotateX,
                          rotateY,
                          duration: 0.1,
                          ease: 'power2.out',
                          transformPerspective: 1000
                        });
                      }

                      if (enableMagnetism) {
                        const magnetX = (x - centerX) * 0.04;
                        const magnetY = (y - centerY) * 0.04;

                        gsap.to(el, {
                          x: magnetX,
                          y: magnetY,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }
                    };

                    const handleMouseLeave = () => {
                      if (shouldDisableAnimations) return;

                      if (enableTilt) {
                        gsap.to(el, {
                          rotateX: 0,
                          rotateY: 0,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }

                      if (enableMagnetism) {
                        gsap.to(el, {
                          x: 0,
                          y: 0,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }
                    };

                    const handleClick = (e: MouseEvent) => {
                      if (!clickEffect || shouldDisableAnimations) return;

                      const rect = el.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;

                      const maxDistance = Math.max(
                        Math.hypot(x, y),
                        Math.hypot(x - rect.width, y),
                        Math.hypot(x, y - rect.height),
                        Math.hypot(x - rect.width, y - rect.height)
                      );

                      const ripple = document.createElement('div');
                      ripple.style.cssText = `
                        position: absolute;
                        width: ${maxDistance * 2}px;
                        height: ${maxDistance * 2}px;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(${glowColor}, 0.25) 0%, rgba(${glowColor}, 0.08) 35%, transparent 70%);
                        left: ${x - maxDistance}px;
                        top: ${y - maxDistance}px;
                        pointer-events: none;
                        z-index: 1000;
                      `;

                      el.appendChild(ripple);

                      gsap.fromTo(
                        ripple,
                        {
                          scale: 0,
                          opacity: 1
                        },
                        {
                          scale: 1,
                          opacity: 0,
                          duration: 0.8,
                          ease: 'power2.out',
                          onComplete: () => ripple.remove()
                        }
                      );
                    };

                    el.addEventListener('mousemove', handleMouseMove);
                    el.addEventListener('mouseleave', handleMouseLeave);
                    el.addEventListener('click', handleClick);
                  }}
                >
                  {childNodes}
                </div>
              );
            };

            return (
              <CardContainer key={index}>
                {/* Glowing Border Beam */}
                <div className="border-beam-container">
                  <div className="border-beam-spinner" />
                </div>
                
                {/* Content Lift Wrapper */}
                <div className="card-inner-lift w-full h-full flex flex-col justify-between relative z-10">
                  {card.isWide ? (
                    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-5 h-full w-full">
                      {/* Left content */}
                      <div className="flex flex-col justify-between h-full text-left">
                        <div>
                          <div className="card__header flex justify-between gap-3 relative items-center z-10 w-full mb-4">
                            <span className="card__label text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand bg-brand-light border border-brand/15 px-2.5 py-0.5 rounded-full">
                              {card.label}
                            </span>
                            <div className={`w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${card.iconBg}`}>
                              {card.icon}
                            </div>
                          </div>
                          <h3 className="card__title font-[family-name:var(--font-bricolage)] font-black text-slate-900 text-[17px] m-0 mb-2 tracking-tight leading-tight">
                            {card.title}
                          </h3>
                          <p className="card__description text-[12.5px] leading-relaxed text-slate-500 mt-2">
                            {card.description}
                          </p>
                        </div>

                        {/* Bullets List */}
                        {card.bullets && (
                          <ul className="mt-3.5 space-y-1.5 mb-2">
                            {card.bullets.map((bullet, i) => (
                              <li key={i} className="text-[11.5px] text-slate-600 flex items-start gap-1.5 font-normal leading-relaxed">
                                <span className="text-brand font-bold">✓</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {/* Right screenshot */}
                      {card.screenshot && (
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-full rounded-[18px] border border-slate-100 overflow-hidden bg-slate-50 pointer-events-none">
                          <img
                            src={card.screenshot}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            style={{ objectPosition: card.imagePosition || 'center top' }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-between h-full w-full text-left">
                      <div>
                        <div className="card__header flex justify-between gap-3 relative items-center z-10 w-full mb-3">
                          <span className="card__label text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand bg-brand-light border border-brand/15 px-2.5 py-0.5 rounded-full">
                            {card.label}
                          </span>
                          <div className={`w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${card.iconBg}`}>
                            {card.icon}
                          </div>
                        </div>
                        <h3 className="card__title font-[family-name:var(--font-bricolage)] font-black text-slate-900 text-[17px] m-0 mb-1.5 tracking-tight leading-tight">
                          {card.title}
                        </h3>
                        <p className="card__description text-[12.5px] leading-relaxed text-slate-500">
                          {card.description}
                        </p>

                        {/* Bullets List */}
                        {card.bullets && (
                          <ul className="mt-3 space-y-1">
                            {card.bullets.map((bullet, i) => (
                              <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 font-normal leading-relaxed">
                                <span className="text-brand font-bold">✓</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {card.screenshot && (
                        <div className={`relative w-full rounded-[18px] border border-slate-100 overflow-hidden bg-slate-50 pointer-events-none mt-3 ${card.bullets ? 'h-[120px]' : 'h-[190px]'}`}>
                          <img
                            src={card.screenshot}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            style={{ objectPosition: card.imagePosition || 'center top' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContainer>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
}




export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden"
    >
      {/* Explicit white background at the very bottom (-z-30) */}
      <div className="absolute inset-0 bg-white -z-30 pointer-events-none" />

      {/* Honeycomb grid at -z-20 (on top of bg-white but behind gradients and content) */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-[0.6]">
        <ShapeGrid
          shape="hexagon"
          squareSize={38}
          borderColor="rgba(92, 96, 245, 0.28)"
          hoverFillColor="rgba(92, 96, 245, 0.08)"
          speed={0.18}
          direction="diagonal"
        />
      </div>

      {/* Subtle glassmorphism backdrop blur (diffuses the honeycomb grid underneath) */}
      <div className="absolute inset-0 backdrop-blur-[3px] bg-white/10 pointer-events-none" style={{ zIndex: -15 }} />

      {/* Gradient fade: white top → transparent → white bottom (prevents harsh hex bleed into bento) */}
      <div className="absolute inset-x-0 top-0 h-32 -z-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 -z-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto z-10">

        {/* Header: Title left | Impact stats right */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center mb-16 md:mb-20">

          {/* Left — Title block */}
          <Reveal className="text-left">
            <SectionHeader
              eyebrow="Core Features"
              title={
                <>
                  Six features. One platform.
                  <br />
                  <span className="text-brand">Whole-journey recovery.</span>
                </>
              }
              subtitle="Every feature was designed around a real patient need, not a boardroom checklist. Nothing is there for show."
            />
          </Reveal>

          {/* Right — Floating impact stat cards */}
          <Reveal delay={0.1} className="flex flex-col gap-4">

            {/* Primary highlight card */}
            <div className="rounded-2xl bg-brand text-white px-6 py-5 shadow-lg shadow-brand/20 flex items-center gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl">🧠</div>
              <div>
                <p className="text-[26px] font-black font-[family-name:var(--font-bricolage)] leading-none">Zero missed doses</p>
                <p className="text-[12px] text-white/75 mt-0.5 font-medium">AI schedules, reminds & tracks every medication automatically</p>
              </div>
            </div>

            {/* Two smaller stat pills */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm shadow-slate-100 flex flex-col gap-1">
                <span className="text-[22px] font-black font-[family-name:var(--font-bricolage)] text-slate-900 leading-none">100%</span>
                <span className="text-[11px] text-slate-500 font-medium leading-snug">prescription-scan accuracy</span>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm shadow-slate-100 flex flex-col gap-1">
                <span className="text-[22px] font-black font-[family-name:var(--font-bricolage)] text-brand leading-none">14+</span>
                <span className="text-[11px] text-slate-500 font-medium leading-snug">languages supported</span>
              </div>
            </div>

            {/* Feature chip row */}
            <div className="flex flex-wrap gap-2 mt-1">
              {['AI Prescription Scan', 'Voice Assistant', 'Live GPS Dispatch', 'Drug Interaction Check', 'Risk Monitor', 'Smart SOS'].map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-[11px] font-semibold text-brand">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <MagicBento />
        </Reveal>
      </div>
    </section>
  );
}
