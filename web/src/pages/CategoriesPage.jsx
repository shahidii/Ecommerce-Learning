import GrowthChart from '@/components/home/GrowthChart'
import { Breadcrumbs, Button, Container } from '@/components/ui'
import { categories } from '@/data/categories'
import { products } from '@/data/products'

const previewFor = (slug) => products.filter((product) => product.category.slug === slug).slice(0, 3)

export default function CategoriesPage() {
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '#home' }, { label: 'Categories' }]} />
        <h1 className="mt-6 text-4xl sm:text-5xl">Shop by category</h1>
        <p className="mt-3 max-w-xl text-muted">Five collections for the nursery, the kitchen, bath time and play.</p>

        <ul className="mt-12 flex flex-col gap-6">
          {categories.map((category) => (
            <li key={category.id}>
              <article className="grid overflow-hidden rounded-pebble bg-surface-soft md:grid-cols-[22rem_1fr]">
                <img src={category.image} alt="" loading="lazy" className="aspect-[4/3] size-full object-cover md:aspect-auto" />
                <div className="flex flex-col p-7 sm:p-9">
                  <p className="text-sm text-muted">{category.productCount} products</p>
                  <h2 className="mt-1 text-3xl">{category.name}</h2>
                  <p className="mt-3 max-w-lg text-muted">{category.description}</p>

                  <ul className="mt-6 flex gap-3" aria-label={`Popular in ${category.name}`}>
                    {previewFor(category.slug).map((product) => (
                      <li key={product.id} className="w-20 sm:w-24">
                        <img src={product.thumbnail} alt={product.title} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
                      </li>
                    ))}
                  </ul>

                  <Button href={`#category-${category.slug}`} variant="secondary" className="mt-7 self-start">
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
