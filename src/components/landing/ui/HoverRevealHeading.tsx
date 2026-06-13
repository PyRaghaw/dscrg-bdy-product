'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HoverRevealHeadingProps {
  children: React.ReactNode;
  /** kept in signature for backwards-compat but no longer used */
  imageSrc?: string;
  className?: string;
  as?: any;
  dark?: boolean;
}

export function HoverRevealHeading({
  children,
  className,
  as: Component = 'div',
  dark = false,
}: HoverRevealHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Radius of the spotlight reveal circle in px
  const R = 90;

  return (
    <Component
      ref={containerRef}
      className={cn('relative group w-full cursor-default select-none grid grid-cols-1 grid-rows-1', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Base text — fully visible and high-contrast ── */}
      <span
        className={cn(
          'col-start-1 row-start-1 relative z-10 block w-full transition-colors duration-300',
          dark ? 'text-white' : 'text-slate-950',
        )}
      >
        {children}
      </span>

      {/*
       * ── Spotlight Reveal Overlay ──
       *
       * How it works:
       *   1. Renders the exact same text inside a circular clip-path in the same grid cell.
       *   2. CSS grid alignment prevents any sub-pixel offsets or layout breaks.
       *   3. Highlights the text inside the circle with brand colors.
       */}
      {isHovered && (
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 pointer-events-none z-20 block overflow-visible select-none"
          style={{
            clipPath: `circle(${R}px at ${mousePos.x}px ${mousePos.y}px)`,
            willChange: 'clip-path',
          }}
        >
          {/* Highlighted accent text */}
          <span
            className={cn(
              'block w-full',
              dark ? 'text-brand-light' : 'text-brand',
            )}
          >
            {children}
          </span>
        </span>
      )}
    </Component>
  );
}

