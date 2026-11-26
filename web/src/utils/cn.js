import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combine class names safely:
//   cn('px-4 py-2', isActive && 'bg-primary', className)
// clsx removes false/undefined values, twMerge resolves conflicts ('px-4' + 'px-6' → 'px-6').
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
