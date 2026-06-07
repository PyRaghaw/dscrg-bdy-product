'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = 'rgba(92, 96, 245, 0.45)', // Discharge Buddy premium brand violet with transparency
  trailCount = 3,
  sizes = [80, 140, 95],
  innerSizes = [25, 40, 30],
  innerColor = 'rgba(255, 255, 255, 0.75)',
  opacities = [0.8, 0.6, 0.7],
  shadowColor = 'rgba(92, 96, 245, 0.25)',
  shadowBlur = 8,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  filterId = 'blob',
  filterStdDeviation = 25,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 1
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { left, top } = updateOffset();
      
      let x = 0;
      let y = 0;
      
      if ('clientX' in e) {
        x = e.clientX;
        y = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        return;
      }

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase,
          overwrite: 'auto'
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    
    // Initial position in the center of the window
    if (typeof window !== 'undefined') {
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;
      blobsRef.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { x: startX, y: startY });
      });
    }

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [updateOffset, handleMove]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none w-full h-full overflow-hidden"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 select-none cursor-default"
        style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i] || 60,
              height: sizes[i] || 60,
              borderRadius: blobType === 'circle' ? '50%' : '0',
              backgroundColor: fillColor,
              opacity: opacities[i] !== undefined ? opacities[i] : 0.6,
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i] || 20,
                height: innerSizes[i] || 20,
                top: ((sizes[i] || 60) - (innerSizes[i] || 20)) / 2,
                left: ((sizes[i] || 60) - (innerSizes[i] || 20)) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
