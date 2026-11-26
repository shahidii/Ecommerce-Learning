import { SlidersHorizontal, SearchX, X } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { ageGroupsApi, categoriesApi, productsApi } from '@/api'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import FilterPanel from '@/components/product/FilterPanel'
import Pagination from '@/components/product/Pagination'
import ProductGrid from '@/components/product/ProductGrid'
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton'
import { Breadcrumbs, Button, Container, Select } from '@/components/ui'
import { PRODUCTS_PER_PAGE, SORT_OPTIONS } from '@/constants/shop'
import { useApi } from '@/hooks/useApi'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatPrice'

const FILTER_KEYS = ['category', 'ageGroup', 'minPrice', 'maxPrice', 'inStock']

/**
 * The URL is the single source of truth for filters:
 *   /shop?category=feeding-essentials&ageGroup=newborn&sort=price_asc&page=2
 * So filtered pages can be shared, bookmarked and reached with the Back button.
 */
export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    category: searchParams.get('category') ?? '',
    ageGroup: searchParams.get('ageGroup') ?? '',
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    inStock: searchParams.get('inStock') ?? '',
    sort: searchParams.get('sort') ?? 'newest',
    page: Number(searchParams.get('page') ?? 1),
  }

  // Lists for the filter panel (GET /categories, GET /age-groups)
  const { data: categories } = useApi(({ signal }) => categoriesApi.getCategories({ signal }))
  const { data: ageGroups } = useApi(({ signal }) => ageGroupsApi.getAgeGroups({ signal }))

  // The products: runs again whenever the query string changes
  const { data, error, isLoading, refetch } = useApi(
    ({ signal }) => productsApi.getProducts({ ...filters, limit: PRODUCTS_PER_PAGE }, { signal }),
    [searchParams.toString()],
  )

  const activeCategory = categories?.find((category) => category.slug === filters.category)
  const activeAge = ageGroups?.find((age) => age.slug === filters.ageGroup)
  const title = activeCategory?.name ?? (activeAge ? `For ${activeAge.name.toLowerCase()}s` : 'All products')
  usePageTitle(title)

  /** updateFilters({ category: 'bath-skincare' }) → changes the URL, and goes back to page 1 */
  const updateFilters = (changes) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      for (const [key, value] of Object.entries(changes)) {
        if (value) next.set(key, value)
        else next.delete(key)
      }
      next.delete('page')
      return next
    })
  }

  const clearFilters = () => setSearchParams(filters.sort === 'newest' ? {} : { sort: filters.sort })

  const chips = [
    activeCategory && { key: 'category', label: activeCategory.name },
    activeAge && { key: 'ageGroup', label: activeAge.name },
    filters.minPrice && { key: 'minPrice', label: `From ${formatPrice(filters.minPrice)}` },
    filters.maxPrice && { key: 'maxPrice', label: `Up to ${formatPrice(filters.maxPrice)}` },
    filters.inStock && { key: 'inStock', label: 'In stock' },
  ].filter(Boolean)

  const meta = data?.meta
  const first = meta ? (meta.page - 1) * meta.limit + 1 : 0
  const last = meta ? Math.min(meta.page * meta.limit, meta.total) : 0
  const hasFilters = FILTER_KEYS.some((key) => filters[key])

  const panelProps = { filters, categories: categories ?? [], ageGroups: ageGroups ?? [], onChange: updateFilters, onClear: clearFilters }

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Shop', to: activeCategory ? ROUTES.SHOP : undefined },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
        ]}
      />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-2 max-w-xl text-muted">
            {activeCategory?.description ?? activeAge?.description ?? 'Everything in the nest, for every stage from newborn to preschool.'}
          </p>
        </div>
        <Select
          label="Sort by"
          hideLabel
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(event) => updateFilters({ sort: event.target.value === 'newest' ? '' : event.target.value })}
          className="w-56"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <FilterPanel idPrefix="desktop" {...panelProps} />
        </aside>

        <div>
          <details className="mb-6 rounded-2xl border border-border bg-surface-soft lg:hidden">
            <summary className="flex cursor-pointer items-center gap-2 px-5 py-3.5 font-semibold">
              <SlidersHorizontal aria-hidden className="size-4" />
              Filters {chips.length > 0 && `(${chips.length})`}
            </summary>
            <div className="px-5 pb-5">
              <FilterPanel idPrefix="mobile" {...panelProps} />
            </div>
          </details>

          <div className="mb-6 flex min-h-8 flex-wrap items-center gap-2 text-sm" aria-live="polite">
            {meta && meta.total > 0 && (
              <span className="text-muted">
                Showing {first}–{last} of {meta.total} products
              </span>
            )}
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => updateFilters({ [chip.key]: '' })}
                aria-label={`Remove filter: ${chip.label}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft py-1 pr-2 pl-3 font-medium text-sage-800 hover:bg-sage-200"
              >
                {chip.label}
                <X aria-hidden className="size-3.5" />
              </button>
            ))}
          </div>

          {isLoading && !data && <ProductGridSkeleton count={PRODUCTS_PER_PAGE} columns={3} />}
          {error && <ErrorState error={error} onRetry={refetch} title="We couldn't load products" />}

          {data && data.products.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No products match these filters"
              description="Try another age or category, or widen the price range."
              action={hasFilters && <Button onClick={clearFilters}>Clear all filters</Button>}
            />
          )}

          {data && data.products.length > 0 && (
            <>
              {/* While the next page loads we keep the old grid, slightly faded */}
              <ProductGrid products={data.products} columns={3} aria-busy={isLoading} className={cn('transition-opacity', isLoading && 'opacity-50')} />
              <Pagination meta={meta} className="mt-14" />
            </>
          )}
        </div>
      </div>
    </Container>
  )
}
