import { Link } from 'react-router'
import { ageGroupsApi } from '@/api'
import ErrorState from '@/components/feedback/ErrorState'
import { Container, SectionHeading, Skeleton } from '@/components/ui'
import { useApi } from '@/hooks/useApi'
import { shopPath } from '@/routes/paths'

/**
 * "Shop by age" drawn as a growth chart: a measuring tape with one stop per stage.
 * Horizontal on tablets/desktop, vertical on phones.
 */
export default function GrowthChart() {
  // GET /api/age-groups
  const { data: ageGroups, error, isLoading, refetch } = useApi(({ signal }) => ageGroupsApi.getAgeGroups({ signal }))

  return (
    <section id="age" className="bg-surface py-20">
      <Container>
        <SectionHeading title="Shop by age" description="From the first cuddle to the first day at preschool. Pick a stage to see what fits right now." />

        {error && <ErrorState error={error} onRetry={refetch} compact className="mt-10" />}

        {isLoading && (
          <output aria-label="Loading age groups" className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex items-start gap-6 md:flex-col md:items-center">
                <Skeleton className="size-20 shrink-0 rounded-full md:size-36" />
                <div className="flex w-full flex-col gap-2 md:items-center">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}
          </output>
        )}

        {ageGroups && (
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* The tape: ticks every 12px, a longer tick every 60px */}
            <li
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-10 w-3 md:top-[4.5rem] md:right-0 md:bottom-auto md:left-0 md:h-3 md:w-auto"
            >
              <div className="absolute inset-y-0 left-0 w-px bg-bark-300 md:inset-x-0 md:top-0 md:h-px md:w-auto" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,var(--color-bark-300)_0_1px,transparent_1px_12px)] [mask-image:linear-gradient(to_right,black_40%,transparent_40%)] md:bg-[repeating-linear-gradient(to_right,var(--color-bark-300)_0_1px,transparent_1px_12px)] md:[mask-image:linear-gradient(to_bottom,black_45%,transparent_45%)]" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,var(--color-bark-400)_0_1.5px,transparent_1.5px_60px)] md:bg-[repeating-linear-gradient(to_right,var(--color-bark-400)_0_1.5px,transparent_1.5px_60px)]" />
            </li>

            {ageGroups.map((age) => (
              <li key={age.id} className="relative flex items-start gap-6 md:flex-col md:items-center md:gap-5 md:text-center">
                <img src={age.image} alt="" loading="lazy" className="relative size-20 shrink-0 rounded-full object-cover ring-[6px] ring-surface md:size-36" />
                <div className="pt-2 md:pt-0">
                  <p className="text-sm font-semibold text-sage-700">{age.ageRange}</p>
                  <h3 className="mt-1 text-2xl">{age.name}</h3>
                  <p className="mt-2 max-w-60 text-sm text-muted">{age.description}</p>
                  <Link
                    to={shopPath({ ageGroup: age.slug })}
                    className="mt-3 inline-block text-sm font-semibold text-foreground underline decoration-sage-300 decoration-2 underline-offset-4 hover:decoration-sage-600"
                  >
                    See {age.productCount} products
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  )
}
