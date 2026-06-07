import { cn } from '@/lib/utils';

interface InfoChipProps {
  dotColor: string;
  label: string;
  sub: string;
  position: 'chip-tl' | 'chip-tr' | 'chip-bl' | 'chip-br';
  delay?: string;
  className?: string;
}

const positionMap = {
  'chip-tl': 'top-[-14px] left-[-80px] max-lg:hidden',
  'chip-tr': 'top-[60px] right-[-100px] max-lg:right-auto max-lg:left-[-90px] max-lg:top-5',
  'chip-bl': 'bottom-[140px] left-[-90px] max-lg:hidden',
  'chip-br': 'bottom-[80px] right-[-90px]',
};

export function InfoChip({ dotColor, label, sub, position, delay = '0s', className }: InfoChipProps) {
  return (
    <div
      className={cn(
        'absolute z-10 flex items-center gap-2.5 bg-white border border-black/[0.06] rounded-[14px] px-4 py-2.5 shadow-[var(--shadow-raise)] whitespace-nowrap animate-chip-float',
        positionMap[position],
        className
      )}
      style={{ animationDelay: delay }}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
      <div>
        <div className="text-xs font-semibold text-gray-900">{label}</div>
        <div className="text-[10px] text-gray-500">{sub}</div>
      </div>
    </div>
  );
}
