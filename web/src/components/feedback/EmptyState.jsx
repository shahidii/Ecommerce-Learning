import { cn } from '@/utils/cn'

/** Nothing to show yet: say what's missing and give one clear next step. */
export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('stitched flex flex-col items-center rounded-3xl px-6 py-14 text-center', className)}>
      {Icon && <Icon aria-hidden className="size-10 text-sage-500" />}
      <p className="mt-4 font-serif text-2xl">{title}</p>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
