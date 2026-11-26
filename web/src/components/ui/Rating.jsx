import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

/** <Rating value={4.6} count={2310} /> → ★★★★★ 4.6 (2,310) */
export default function Rating({ value, count, size = 'sm', className }) {
  const iconSize = size === 'sm' ? 'size-3.5' : 'size-4.5'

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(iconSize, star <= Math.round(value) ? 'fill-butter-400 text-butter-400' : 'fill-oat-200 text-oat-200')}
          />
        ))}
      </div>
      <span className={cn('font-semibold', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {value.toFixed(1)}
        <span className="sr-only"> out of 5 stars</span>
      </span>
      {count !== undefined && (
        <span className={cn('text-muted', size === 'sm' ? 'text-xs' : 'text-sm')}>({count.toLocaleString('en-IN')} reviews)</span>
      )}
    </div>
  )
}
