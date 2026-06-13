import { cn } from '@/lib/utils';
import { HoverRevealHeading } from './HoverRevealHeading';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-2xl', centered && 'text-center mx-auto', className)}>
      {/* Eyebrow — refined pill */}
      <div
        className={cn(
          'inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] mb-5 px-3 py-1.5 rounded-full',
          dark
            ? 'bg-brand/15 text-brand-light border border-brand/25'
            : 'bg-brand-light text-brand border border-brand/20'
        )}
      >
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse-dot shrink-0',
            dark ? 'bg-brand-light' : 'bg-brand'
          )}
        />
        {eyebrow}
      </div>

      {/* Headline */}
      <HoverRevealHeading
        as="h2"
        className={cn(
          'font-[family-name:var(--font-bricolage)] text-[clamp(32px,4vw,56px)] font-black leading-[1.06] tracking-[-0.035em]',
          dark ? 'text-white' : 'text-gray-900'
        )}
        dark={dark}
        imageSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop"
      >
        {title}
      </HoverRevealHeading>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-[clamp(15px,1.5vw,18px)] leading-[1.75] font-light',
            centered && 'mx-auto',
            dark ? 'text-white/55' : 'text-gray-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
