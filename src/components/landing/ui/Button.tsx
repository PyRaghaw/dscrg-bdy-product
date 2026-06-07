import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost' | 'outline-lg' | 'primary-lg';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'text-sm font-semibold text-white btn-shimmer px-5 py-2.5 rounded-[9px] transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(92,96,245,0.35)]',
  ghost:
    'text-sm font-medium text-gray-500 border border-gray-300 px-4 py-2 rounded-[9px] hover:text-gray-900 hover:border-gray-500 transition-all',
  'primary-lg':
    'inline-flex items-center gap-2.5 text-base font-semibold text-white btn-shimmer px-9 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(92,96,245,0.3)] hover:shadow-[0_8px_40px_rgba(92,96,245,0.45)]',
  'outline-lg':
    'inline-flex items-center gap-2.5 text-base font-semibold text-gray-900 bg-white border-[1.5px] border-gray-200 px-9 py-3.5 rounded-xl hover:border-brand hover:text-brand hover:bg-brand-light/50 transition-all hover:-translate-y-px shadow-[var(--shadow-card)]',
};

export function Button({ href, onClick, variant = 'primary', children, className }: ButtonProps) {
  const cls = cn(variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
