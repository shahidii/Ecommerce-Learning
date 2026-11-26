import { cn } from '@/utils/cn'

const variants = {
  sage: 'bg-primary-soft text-sage-800',
  blush: 'bg-accent text-white',
  soft: 'bg-accent-soft text-blush-700',
  neutral: 'bg-surface text-bark-800',
  outline: 'border border-border-strong text-muted',
}

/** <Badge variant="blush">-29%</Badge> */
export default function Badge({ variant = 'neutral', className, children }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
