import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

/** Static quantity control. Buttons get their click handlers in the cart phase. */
export default function QuantitySelector({ value = 1, label = 'Quantity', size = 'md', className }) {
  const box = size === 'sm' ? 'h-9' : 'h-11'
  const button = size === 'sm' ? 'size-9' : 'size-11'

  return (
    <fieldset className={cn('inline-flex items-center rounded-full border border-border-strong bg-white', box, className)}>
      <legend className="sr-only">{label}</legend>
      <button type="button" aria-label="Decrease quantity" className={cn('flex items-center justify-center rounded-full hover:bg-surface', button)}>
        <Minus className="size-4" />
      </button>
      <span className="min-w-8 text-center font-semibold" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="Increase quantity" className={cn('flex items-center justify-center rounded-full hover:bg-surface', button)}>
        <Plus className="size-4" />
      </button>
    </fieldset>
  )
}
