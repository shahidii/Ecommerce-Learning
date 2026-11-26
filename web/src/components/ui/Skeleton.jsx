import { cn } from '@/utils/cn'

/** Grey placeholder block shown while data loads: <Skeleton className="h-6 w-40" /> */
export default function Skeleton({ className }) {
  return <span aria-hidden className={cn('block animate-pulse rounded-xl bg-oat-200/70', className)} />
}
