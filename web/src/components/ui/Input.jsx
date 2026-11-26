import { useId } from 'react'
import { cn } from '@/utils/cn'

/**
 * Text input with label, hint and error message.
 * <Input label="Email" type="email" placeholder="you@example.com" error="Please enter a valid email" />
 */
export default function Input({ label, hint, error, icon: Icon, className, id, ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-subtle" />}
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-foreground placeholder:text-subtle',
            'transition-colors outline-none focus:border-sage-500 focus:ring-3 focus:ring-sage-100',
            Icon && 'pl-11',
            error ? 'border-blush-600 focus:border-blush-600 focus:ring-blush-100' : 'border-border-strong',
          )}
          {...props}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-blush-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${inputId}-hint`} className="text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
