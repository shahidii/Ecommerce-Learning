import { Link } from 'react-router'
import { cn } from '@/utils/cn'

/**
 * Round button that only shows an icon. `label` is required: screen readers read it.
 * <IconButton label="Open cart" count={3}><ShoppingBag /></IconButton>
 * <IconButton label="Cart" to="/cart"><ShoppingBag /></IconButton>   ← renders a <Link>
 */
export default function IconButton({ label, count, to, className, children, ...props }) {
  const Component = to ? Link : 'button'
  const typeProps = to ? { to } : { type: 'button' }

  return (
    <Component
      {...typeProps}
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
    </Component>
  )
}
