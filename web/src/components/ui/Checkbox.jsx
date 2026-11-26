import { useId } from 'react'
import { cn } from '@/utils/cn'

/**
 * <Checkbox label="Newborn" meta="20" defaultChecked />
 */
export default function Checkbox({ label, meta, className, id, ...props }) {
  const autoId = useId()
  const checkboxId = id ?? autoId

  return (
    <label htmlFor={checkboxId} className={cn('flex cursor-pointer items-center gap-3 py-1 text-[0.95rem]', className)}>
      <input
        id={checkboxId}
        type="checkbox"
        className="size-4.5 cursor-pointer rounded border-border-strong accent-sage-600"
        {...props}
      />
      <span className="flex-1">{label}</span>
      {meta !== undefined && <span className="text-sm text-subtle">{meta}</span>}
    </label>
  )
}
