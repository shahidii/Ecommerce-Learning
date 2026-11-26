import { categoriesApi } from '@/api'
import ErrorState from '@/components/feedback/ErrorState'
import GrowthChart from '@/components/home/GrowthChart'
import { Breadcrumbs, Button, Container, Skeleton } from '@/components/ui'
import { useApi } from '@/hooks/useApi'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES, productPath, shopPath } from '@/routes/paths'
import { Link } from 'react-router'

/** Three product photos for one category: GET /api/categories/:slug/products?limit=3&sort=popular */
function CategoryPreview({ category }) {
  const { data } = useApi(({ signal }) => categoriesApi.getCategoryProducts(category.slug, { limit: 3, sort: 'popular' }, { signal }), [category.slug])

  return (
    <ul className="mt-6 flex gap-3" aria-label={`Popular in ${category.name}`}>
      {data
        ? data.products.map((product) => (
            <li key={product.id} className="w-20 sm:w-24">
              <Link to={productPath(product.slug)} className="block overflow-hidden rounded-2xl">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform hover:scale-105"
                />
              </Link>
            </li>
          ))
        : Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="w-20 sm:w-24">
              <Skeleton className="aspect-square rounded-2xl" />
            </li>
          ))}
    </ul>
  )
}

export default function CategoriesPage() {
  usePageTitle('Categories')
  const { data: categories, error, isLoading, refetch } = useApi(({ signal }) => categoriesApi.getCategories({ signal }))

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Categories' }]} />
        <h1 className="mt-6 text-4xl sm:text-5xl">Shop by category</h1>
        <p className="mt-3 max-w-xl text-muted">Five collections for the nursery, the kitchen, bath time and play.</p>

        {error && <ErrorState error={error} onRetry={refetch} className="mt-12" />}

        <ul className="mt-12 flex flex-col gap-6" aria-busy={isLoading}>
          {isLoading &&
            Array.from({ length: 3 }, (_, index) => (
              <li key={index}>
                <Skeleton className="h-72 rounded-pebble" />
              </li>
            ))}

          {categories?.map((category) => (
            <li key={category.id}>
              <article className="grid overflow-hidden rounded-pebble bg-surface-soft md:grid-cols-[22rem_1fr]">
                <img src={category.image} alt="" loading="lazy" className="aspect-[4/3] size-full object-cover md:aspect-auto" />
                <div className="flex flex-col p-7 sm:p-9">
                  <p className="text-sm text-muted">{category.productCount} products</p>
                  <h2 className="mt-1 text-3xl">{category.name}</h2>
                  <p className="mt-3 max-w-lg text-muted">{category.description}</p>
                  <CategoryPreview category={category} />
                  <Button to={shopPath({ category: category.slug })} variant="secondary" className="mt-7 self-start">
                    Browse {category.name.toLowerCase()}
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <div className="mt-16">
        <GrowthChart />
      </div>
    </>
  )
}
