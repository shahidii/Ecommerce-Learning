import { Skeleton } from '@/components/ui'
import { cn } from '@/utils/cn'

/** Grey product cards in the same grid as ProductGrid, so the page doesn't jump when data arrives. */
export default function ProductGridSkeleton({ count = 8, columns = 4, className }) {
  const cols = { 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-3 lg:grid-cols-4' }[columns]

  return (
    <output aria-label="Loading products" className={cn('grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6', cols, className)}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="aspect-[4/5] rounded-3xl" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </output>
  )
}
