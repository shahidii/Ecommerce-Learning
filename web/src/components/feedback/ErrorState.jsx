import { CloudOff, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/utils/cn'

/**
 * Shown when an API call fails. `error` is our ApiError, so `error.message` is already user friendly
 * ("Something went wrong from our side…", "We couldn't reach Little Nest…", "Product not found").
 */
export default function ErrorState({ error, onRetry, title = "This didn't load", compact = false, className }) {
  return (
    <div role="alert" className={cn('stitched flex flex-col items-center rounded-3xl text-center', compact ? 'px-5 py-8' : 'px-6 py-14', className)}>
      <CloudOff aria-hidden className="size-9 text-blush-600" />
      <p className="mt-4 font-serif text-xl">{title}</p>
      <p className="mt-1 max-w-md text-sm text-muted">{error?.message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
          <RotateCw aria-hidden className="size-4" />
          Try again
        </Button>
      )}
    </div>
  )
}
