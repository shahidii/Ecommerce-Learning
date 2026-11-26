import { Link } from 'react-router'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

/** Little Nest logo: an egg in a nest + the wordmark. */
export default function Logo({ className }) {
  return (
    <Link to={ROUTES.HOME} className={cn('inline-flex items-center gap-2.5 text-foreground', className)} aria-label="Little Nest home">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-primary" />
        <ellipse cx="16" cy="14.5" rx="6" ry="7.5" className="fill-milk" />
        <path d="M6.5 19.5c2.5 5 6 6.5 9.5 6.5s7-1.5 9.5-6.5" fill="none" className="stroke-oat-100" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="font-serif text-2xl font-semibold tracking-tight" style={{ fontVariationSettings: '"SOFT" 100' }}>
        Little Nest
      </span>
    </Link>
  )
}
