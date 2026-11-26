import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { cn } from '@/utils/cn'

/** Page numbers to show: 1 … 4 5 6 … 10 */
function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b)
  return sorted.flatMap((page, index) => (index > 0 && page - sorted[index - 1] > 1 ? ['…', page] : [page]))
}

/** Uses the API's `meta` ({ page, totalPages, hasNextPage, hasPrevPage }) and keeps the other URL params. */
export default function Pagination({ meta, className }) {
  const location = useLocation()
  if (!meta || meta.totalPages <= 1) return null

  const pageLink = (page) => {
    const params = new URLSearchParams(location.search)
    if (page === 1) params.delete('page')
    else params.set('page', page)
    const query = params.toString()
    return query ? `?${query}` : location.pathname
  }

  const arrowClass = 'flex size-10 items-center justify-center rounded-full'

  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-1.5', className)}>
      {meta.hasPrevPage ? (
        <Link to={pageLink(meta.page - 1)} aria-label="Previous page" className={cn(arrowClass, 'hover:bg-surface')}>
          <ChevronLeft className="size-5" />
        </Link>
      ) : (
        <span aria-hidden className={cn(arrowClass, 'text-oat-300')}>
          <ChevronLeft className="size-5" />
        </span>
      )}

      {getPages(meta.page, meta.totalPages).map((page, index) =>
        page === '…' ? (
          <span key={`gap-${index}`} aria-hidden className="px-1 text-muted">
            …
          </span>
        ) : (
          <Link
            key={page}
            to={pageLink(page)}
            aria-label={`Page ${page}`}
            aria-current={page === meta.page ? 'page' : undefined}
            className={cn(
              'flex size-10 items-center justify-center rounded-full text-sm font-semibold',
              page === meta.page ? 'bg-primary text-primary-foreground' : 'hover:bg-surface',
            )}
          >
            {page}
          </Link>
        ),
      )}

      {meta.hasNextPage ? (
        <Link to={pageLink(meta.page + 1)} aria-label="Next page" className={cn(arrowClass, 'hover:bg-surface')}>
          <ChevronRight className="size-5" />
        </Link>
      ) : (
        <span aria-hidden className={cn(arrowClass, 'text-oat-300')}>
          <ChevronRight className="size-5" />
        </span>
      )}
    </nav>
  )
}
