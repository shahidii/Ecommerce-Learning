import { Heart, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import { Badge, Breadcrumbs, Button, Container, Price, QuantitySelector, Rating, SectionHeading } from '@/components/ui'
import { FREE_SHIPPING_ABOVE } from '@/data/cart'
import { getProductBySlug, products } from '@/data/products'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatPrice'

// Later: the slug comes from the URL (/products/:slug) and the product from GET /api/products/slug/:slug
const product = getProductBySlug('convertible-wooden-high-chair')
const related = products.filter((item) => item.category.slug === product.category.slug && item.id !== product.id).slice(0, 4)

export default function ProductDetailPage() {
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#home' },
            { label: product.category.name, href: `#category-${product.category.slug}` },
            { label: product.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square overflow-hidden rounded-pebble bg-surface">
              <img src={product.images[0]} alt={product.title} className="size-full object-cover" />
            </div>
            <ul className="grid grid-cols-4 gap-3" aria-label="Product photos">
              {product.images.map((image, index) => (
                <li key={image}>
                  <button
                    type="button"
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={index === 0}
                    className={cn(
                      'block aspect-square w-full overflow-hidden rounded-2xl bg-surface ring-offset-2 ring-offset-background',
                      index === 0 ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100',
                    )}
                  >
                    <img src={image} alt="" className="size-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            <p className="text-sm font-semibold text-sage-700">{product.brand}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl">{product.title}</h1>
            <Rating value={product.rating} count={product.reviewsCount} size="md" className="mt-4" />

            <Price price={product.price} mrp={product.mrp} size="lg" className="mt-6" />
            <p className="mt-1 text-sm text-muted">Inclusive of all taxes</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">Suits</span>
              {product.ageGroups.map((age) => (
                <Badge key={age.id} variant="sage">
                  {age.name} ({age.ageRange})
                </Badge>
              ))}
            </div>

            <p className={cn('mt-6 text-sm font-semibold', product.stock < 15 ? 'text-blush-700' : 'text-sage-700')}>
              {product.stock < 15 ? `Only ${product.stock} left in stock` : 'In stock'}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <QuantitySelector value={1} />
              <Button size="md" className="flex-1 sm:flex-none sm:px-10">
                <ShoppingBag aria-hidden className="size-4.5" />
                Add to cart
              </Button>
              <Button variant="outline" size="md" aria-label="Save to wishlist" className="px-3.5">
                <Heart aria-hidden className="size-5" />
              </Button>
            </div>

            <ul className="mt-8 flex flex-col gap-3 rounded-3xl bg-surface-soft p-5 text-sm">
              <li className="flex gap-3">
                <Truck aria-hidden className="size-5 shrink-0 text-sage-700" />
                Free delivery on orders above {formatPrice(FREE_SHIPPING_ABOVE)}. Arrives in 3–5 days.
              </li>
              <li className="flex gap-3">
                <RotateCcw aria-hidden className="size-5 shrink-0 text-sage-700" />
                Easy returns within 30 days.
              </li>
              <li className="flex gap-3">
                <ShieldCheck aria-hidden className="size-5 shrink-0 text-sage-700" />
                Safety tested to EN71 standards.
              </li>
            </ul>

            <div className="mt-10">
              <h2 className="text-2xl">About this product</h2>
              <p className="mt-3 text-muted">{product.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl">Specifications</h2>
              <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>

      <section className="pt-16">
        <Container>
          <SectionHeading title="You may also like" description={`More from ${product.category.name}.`} />
          <ProductGrid products={related} className="mt-8" />
        </Container>
      </section>
    </>
  )
}
