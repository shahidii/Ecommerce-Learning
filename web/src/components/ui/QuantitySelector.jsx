import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

/** Controlled quantity control: <QuantitySelector value={qty} onChange={setQty} max={product.stock} /> */
export default function QuantitySelector({ value = 1, onChange, min = 1, max = 10, label = 'Quantity', size = 'md', className }) {
  const box = size === 'sm' ? 'h-9' : 'h-11'
  const button = size === 'sm' ? 'size-9' : 'size-11'
  const buttonClass = cn(
    'flex items-center justify-center rounded-full hover:bg-surface disabled:cursor-not-allowed disabled:text-oat-300 disabled:hover:bg-transparent',
    button,
  )

  return (
    <fieldset className={cn('inline-flex items-center rounded-full border border-border-strong bg-white', box, className)}>
      <legend className="sr-only">{label}</legend>
      <button type="button" aria-label="Decrease quantity" className={buttonClass} disabled={value <= min} onClick={() => onChange?.(value - 1)}>
        <Minus className="size-4" />
      </button>
      <output className="min-w-8 text-center font-semibold" aria-live="polite">
        {value}
      </output>
      <button type="button" aria-label="Increase quantity" className={buttonClass} disabled={value >= max} onClick={() => onChange?.(value + 1)}>
        <Plus className="size-4" />
      </button>
    </fieldset>
  )
}
