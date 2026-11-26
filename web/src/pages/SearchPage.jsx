import { Search, SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { productsApi } from '@/api'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import Pagination from '@/components/product/Pagination'
import ProductGrid from '@/components/product/ProductGrid'
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton'
import { Button, Container } from '@/components/ui'
import { PRODUCTS_PER_PAGE } from '@/constants/shop'
import { useApi } from '@/hooks/useApi'
import { useDebounce } from '@/hooks/useDebounce'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

const SUGGESTIONS = ['swaddle', 'bottle', 'teddy', 'organic cotton', 'wooden', 'newborn']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  // The input writes straight to the URL (?q=…), so the Navbar search and this box share one value.
  // The API call uses the DEBOUNCED text: it waits until typing stops for 400 ms.
  const text = searchParams.get('q') ?? ''
  const q = useDebounce(text.trim(), 400)
  const page = Number(searchParams.get('page') ?? 1)

  const setText = (value) => setSearchParams(value ? { q: value } : {}, { replace: true })

  const { data, error, isLoading, refetch } = useApi(({ signal }) => productsApi.searchProducts(q, { page, limit: PRODUCTS_PER_PAGE }, { signal }), [q, page], {
    enabled: q.length > 0,
  })

  usePageTitle(q ? `Search: ${q}` : 'Search')

  return (
    <Container className="py-10">
      <h1 className="text-4xl sm:text-5xl">{q ? <>Results for “{q}”</> : 'Search the nest'}</h1>

      <search className="mt-6 max-w-xl">
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="search-page-input" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-subtle" />
            <input
              id="search-page-input"
              type="search"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Try “swaddle” or “wooden toys”"
              className="h-14 w-full rounded-full border border-border-strong bg-white pr-5 pl-13 text-base outline-none focus:border-sage-500 focus:ring-3 focus:ring-sage-100"
            />
          </div>
        </form>
      </search>

      {!q && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Popular:</span>
          {SUGGESTIONS.map((word) => (
            <button key={word} type="button" onClick={() => setText(word)} className="rounded-full bg-surface px-3.5 py-1.5 font-medium hover:bg-oat-200">
              {word}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        {q && isLoading && !data && <ProductGridSkeleton count={8} />}
        {q && error && <ErrorState error={error} onRetry={refetch} title="Search didn't work" />}

        {q && data && (
          <>
            <p className="mb-6 text-sm text-muted" aria-live="polite">
              {data.meta.total} {data.meta.total === 1 ? 'product' : 'products'} found
            </p>
            {data.products.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title={`Nothing for “${q}” yet`}
                description="Check the spelling, try a shorter word, or browse by category."
                action={<Button to={ROUTES.CATEGORIES}>Browse categories</Button>}
              />
            ) : (
              <>
                <ProductGrid products={data.products} aria-busy={isLoading} className={cn('transition-opacity', isLoading && 'opacity-50')} />
                <Pagination meta={data.meta} className="mt-14" />
              </>
            )}
          </>
        )}
      </div>
    </Container>
  )
}
