import { productsApi } from '@/api'
import ErrorState from '@/components/feedback/ErrorState'
import ProductGrid from '@/components/product/ProductGrid'
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton'
import { Button, Container, SectionHeading } from '@/components/ui'
import { useApi } from '@/hooks/useApi'
import { ROUTES } from '@/routes/paths'

export default function FeaturedProducts() {
  // GET /api/products?featured=true&limit=8
  const { data, error, isLoading, refetch } = useApi(({ signal }) => productsApi.getProducts({ featured: true, limit: 8, sort: 'popular' }, { signal }))

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Parents' favourites"
          description="The pieces parents reorder, gift and recommend most."
          action={
            <Button variant="outline" size="sm" to={ROUTES.SHOP}>
              Shop all products
            </Button>
          }
        />
        <div className="mt-10">
          {isLoading && <ProductGridSkeleton count={8} />}
          {error && <ErrorState error={error} onRetry={refetch} />}
          {data && <ProductGrid products={data.products} />}
        </div>
      </Container>
    </section>
  )
}
