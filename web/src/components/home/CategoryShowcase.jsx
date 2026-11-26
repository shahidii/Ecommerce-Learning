import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { categoriesApi } from '@/api'
import ErrorState from '@/components/feedback/ErrorState'
import { Button, Container, SectionHeading, Skeleton } from '@/components/ui'
import { useApi } from '@/hooks/useApi'
import { ROUTES, shopPath } from '@/routes/paths'
import { cn } from '@/utils/cn'

export default function CategoryShowcase() {
  // GET /api/categories
  const { data: categories, error, isLoading, refetch } = useApi(({ signal }) => categoriesApi.getCategories({ signal }))

  return (
    <section id="categories" className="py-20">
      <Container>
        <SectionHeading
          title="Little essentials"
          description="Five corners of the nursery, each filled with things we would choose for our own children."
          action={
            <Button variant="link" to={ROUTES.CATEGORIES}>
              All categories
            </Button>
          }
        />

        {error && <ErrorState error={error} onRetry={refetch} compact className="mt-10" />}

        <ul aria-busy={isLoading} className="mt-10 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[17rem]">
          {isLoading &&
            Array.from({ length: 5 }, (_, index) => (
              <li key={index} className={cn(index === 0 && 'sm:col-span-2 sm:row-span-2')}>
                <Skeleton className="size-full rounded-pebble" />
              </li>
            ))}
          {categories?.map((category, index) => (
            <li key={category.id} className={cn(index === 0 && 'sm:col-span-2 sm:row-span-2')}>
              <Link
                to={shopPath({ category: category.slug })}
                aria-label={`${category.name}, ${category.productCount} products`}
                className="group relative block size-full overflow-hidden rounded-pebble bg-surface"
              >
                <img src={category.image} alt="" loading="lazy" className="size-full object-cover" />
                <span className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white/95 py-2 pr-2 pl-5 shadow-soft">
                  <span className="flex flex-col leading-tight">
                    <span className="font-semibold">{category.name}</span>
                    <span className="text-xs text-muted">{category.productCount} products</span>
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-sage-800 transition-colors group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight aria-hidden className="size-4.5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
