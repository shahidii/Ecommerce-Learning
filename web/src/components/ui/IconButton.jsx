import { cn } from '@/utils/cn'

/**
 * Round button that only shows an icon. `label` is required: screen readers read it.
 * <IconButton label="Open cart" count={3}><ShoppingBag /></IconButton>
 */
export default function IconButton({ label, count, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={count ? `${label} (${count})` : label}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-full text-foreground',
        'transition-colors hover:bg-surface [&_svg]:size-5',
        className,
      )}
      {...props}
    >
      {children}
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[0.7rem] font-bold text-primary-foreground">
          {count}
        </span>
      )}
    </button>
  )
}
