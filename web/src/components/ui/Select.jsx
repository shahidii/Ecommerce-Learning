import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * <Select label="Sort by" options={[{ value: 'newest', label: 'Newest' }]} />
 */
export default function Select({ label, options = [], className, id, hideLabel = false, ...props }) {
  const autoId = useId()
  const selectId = id ?? autoId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={selectId} className={cn('text-sm font-semibold', hideLabel && 'sr-only')}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className="h-11 w-full appearance-none rounded-full border border-border-strong bg-white pr-10 pl-4 text-sm font-medium text-foreground outline-none focus:border-sage-500 focus:ring-3 focus:ring-sage-100"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
      </div>
    </div>
  )
}
