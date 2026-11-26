import { cn } from '@/utils/cn'

/** Small loading circle. Decorative: pair it with text or an aria-label on the parent. */
export default function Spinner({ className }) {
  return <span aria-hidden className={cn('inline-block size-5 animate-spin rounded-full border-2 border-current border-r-transparent', className)} />
}
