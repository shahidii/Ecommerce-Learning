import { Spinner } from '@/components/ui'

/** Full-page loading state, used while a lazy page or the logged-in user loads. */
export default function PageLoader({ label = 'Loading…' }) {
  return (
    <output className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted">
      <Spinner className="size-7 text-sage-600" />
      <p className="text-sm">{label}</p>
    </output>
  )
}
