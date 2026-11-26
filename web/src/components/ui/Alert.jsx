import { CircleAlert, Info } from 'lucide-react'
import { cn } from '@/utils/cn'

const variants = {
  error: { icon: CircleAlert, className: 'bg-blush-100/60 text-blush-700 border-blush-200' },
  info: { icon: Info, className: 'bg-sage-50 text-sage-800 border-sage-200' },
}

/** Message box for forms. role="alert" makes screen readers read it as soon as it appears. */
export default function Alert({ variant = 'error', children, className }) {
  const { icon: Icon, className: colors } = variants[variant]
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} className={cn('flex gap-3 rounded-2xl border p-4 text-sm', colors, className)}>
      <Icon aria-hidden className="mt-0.5 size-4.5 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
