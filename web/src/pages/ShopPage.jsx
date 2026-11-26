import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import FilterPanel from '@/components/product/FilterPanel'
import ProductGrid from '@/components/product/ProductGrid'
import { Breadcrumbs, Container, Select } from '@/components/ui'
import { products } from '@/data/products'
import { wishlistItems } from '@/data/wishlist'
import { cn } from '@/utils/cn'

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'popular', label: 'Most popular' },
  { value: 'rating', label: 'Top rated' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'discount', label: 'Biggest discount' },
]

const pageProducts = products.slice(0, 12)

export default function ShopPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '#home' }, { label: 'Shop' }]} />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl sm:text-5xl">All products</h1>
          <p className="mt-2 text-muted">Everything in the nest, for every stage from newborn to preschool.</p>
        </div>
        <Select label="Sort by" hideLabel options={sortOptions} defaultValue="newest" className="w-56" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        {/* Desktop: always visible */}
        <aside aria-label="Filters" className="hidden lg:block">
          <FilterPanel />
        </aside>

        <div>
          {/* Mobile: native <details> opens and closes without any JavaScript */}
          <details className="mb-6 rounded-2xl border border-border bg-surface-soft lg:hidden">
            <summary className="flex cursor-pointer items-center gap-2 px-5 py-3.5 font-semibold">
              <SlidersHorizontal aria-hidden className="size-4" />
              Filters
            </summary>
            <div className="px-5 pb-5">
              <FilterPanel />
            </div>
          </details>

          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted">Showing 1–12 of {products.length} products for</span>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft py-1 pr-2 pl-3 font-medium text-sage-800 hover:bg-sage-200">
              Newborn
              <X aria-label="Remove filter Newborn" className="size-3.5" />
            </button>
          </div>

          <ProductGrid products={pageProducts} wishlistIds={wishlistItems.map((item) => item.id)} columns={3} />

          <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-1.5">
            <span aria-hidden className="flex size-10 items-center justify-center rounded-full text-oat-300">
              <ChevronLeft className="size-5" />
            </span>
            {[1, 2, 3, 4].map((page) => (
              <a
                key={page}
                href={`#page-${page}`}
                aria-current={page === 1 ? 'page' : undefined}
                className={cn(
                  'flex size-10 items-center justify-center rounded-full text-sm font-semibold',
                  page === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-surface',
                )}
              >
                {page}
              </a>
            ))}
            <a href="#page-2" aria-label="Next page" className="flex size-10 items-center justify-center rounded-full hover:bg-surface">
              <ChevronRight className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </Container>
  )
}
