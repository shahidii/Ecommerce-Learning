import { Link } from 'react-router'
import { cn } from '@/utils/cn'

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  secondary: 'bg-primary-soft text-sage-800 hover:bg-sage-200',
  outline: 'border border-border-strong bg-transparent text-foreground hover:border-bark-400 hover:bg-surface-soft',
  ghost: 'bg-transparent text-foreground hover:bg-surface',
  accent: 'bg-accent text-white hover:bg-blush-700',
  link: 'h-auto bg-transparent px-0 text-sage-700 underline-offset-4 hover:underline',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[0.95rem]',
  lg: 'h-13 px-8 text-base',
}

/**
 * <Button>Add to cart</Button>
 * <Button variant="outline" size="sm">Clear</Button>
 * <Button to="/shop">Shop now</Button>          ← renders a React Router <Link>
 * <Button href="https://…">Docs</Button>      ← renders a normal <a> (external links)
 */
export default function Button({ variant = 'primary', size = 'md', to, href, className, children, ...props }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
    'transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50',
    sizes[size],
    variants[variant],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
