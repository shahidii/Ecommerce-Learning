import { useState } from 'react'
import { Check, Heart, PackageSearch, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { useParams } from 'react-router'
import { productsApi } from '@/api'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import ProductGrid from '@/components/product/ProductGrid'
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton'
import { Badge, Breadcrumbs, Button, Container, Price, QuantitySelector, Rating, SectionHeading, Skeleton } from '@/components/ui'
import { FREE_SHIPPING_ABOVE, MAX_QUANTITY_PER_ITEM } from '@/constants/shop'
import { useApi } from '@/hooks/useApi'
import { useCart } from '@/hooks/useCart'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { ROUTES, shopPath } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatPrice'

/** /products/:slug  → GET /api/products/slug/:slug, then GET /api/products/:id/related */
export default function ProductDetailPage() {
  const { slug } = useParams()
  const { data: product, error, isLoading, refetch } = useApi(({ signal }) => productsApi.getProductBySlug(slug, { signal }), [slug])

  // The second request needs the product id, so it waits until the first one is done
  const related = useApi(({ signal }) => productsApi.getRelatedProducts(product.id, 4, { signal }), [product?.id], { enabled: Boolean(product) })

  usePageTitle(product?.title ?? (error ? 'Product not found' : 'Loading…'))

  if (error?.isNotFound) {
    return (
      <Container className="py-16">
        <h1 className="sr-only">Product not found</h1>
        <EmptyState
          icon={PackageSearch}
          title="We couldn't find this product"
          description="It may have sold out for good or the link is old. Have a look at what's new instead."
          action={<Button to={ROUTES.SHOP}>Browse the shop</Button>}
        />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-16">
        <h1 className="sr-only">Product</h1>
        <ErrorState error={error} onRetry={refetch} title="We couldn't load this product" />
      </Container>
    )
  }

  // Show the skeleton when loading for the first time OR when moving to another product (old data has another slug)
  if (isLoading || !product || product.slug !== slug) return <ProductDetailSkeleton />

  return (
    <>
      {/* key: a new product gets a fresh component, so the photo and quantity reset by themselves */}
      <ProductDetails key={product.id} product={product} />

      <section className="pt-16">
        <Container>
          <SectionHeading title="You may also like" description={`More from ${product.category.name}.`} />
          <div className="mt-8">
            {related.isLoading && <ProductGridSkeleton count={4} />}
            {related.error && <ErrorState error={related.error} onRetry={related.refetch} compact />}
            {related.data && <ProductGrid products={related.data} />}
          </div>
        </Container>
      </section>
    </>
  )
}

function ProductDetails({ product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, getQuantity } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const images = product.images?.length ? product.images : [product.thumbnail]
  const inCart = getQuantity(product.id)
  const saved = isWishlisted(product.id)
  const maxQuantity = Math.min(product.stock, MAX_QUANTITY_PER_ITEM)

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: product.category.name, to: shopPath({ category: product.category.slug }) },
          { label: product.title },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden rounded-pebble bg-surface">
            <img src={images[activeImage]} alt={product.title} className="size-full object-cover" />
          </div>
          <ul className="grid grid-cols-4 gap-3" aria-label="Product photos">
            {images.map((image, index) => (
              <li key={image}>
                <button
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-pressed={index === activeImage}
                  className={cn(
                    'block aspect-square w-full overflow-hidden rounded-2xl bg-surface ring-offset-2 ring-offset-background',
                    index === activeImage ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100',
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
            {!product.inStock ? 'Out of stock' : product.stock < 15 ? `Only ${product.stock} left in stock` : 'In stock'}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} max={maxQuantity} />
            <Button size="md" className="flex-1 sm:flex-none sm:px-10" disabled={!product.inStock} onClick={() => addToCart(product, quantity)}>
              <ShoppingBag aria-hidden className="size-4.5" />
              Add to cart
            </Button>
            <Button
              variant="outline"
              size="md"
              aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-pressed={saved}
              className="px-3.5"
              onClick={() => toggleWishlist(product)}
            >
              <Heart aria-hidden className={cn('size-5', saved && 'fill-accent text-accent')} />
            </Button>
          </div>

          {inCart > 0 && (
            <output className="mt-3 flex items-center gap-2 text-sm text-sage-800">
              <Check aria-hidden className="size-4" />
              {inCart} in your cart.
              <Button variant="link" to={ROUTES.CART} className="text-sm">
                View cart
              </Button>
            </output>
          )}

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
              {product.specifications?.map((spec) => (
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
  )
}

function ProductDetailSkeleton() {
  return (
    <Container className="py-10">
      <output aria-label="Loading product" className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-square rounded-pebble" />
        <div className="flex flex-col gap-4 lg:pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-9 w-48" />
          <Skeleton className="mt-6 h-11 w-full max-w-md rounded-full" />
          <Skeleton className="mt-6 h-32 w-full rounded-3xl" />
        </div>
      </output>
    </Container>
  )
}
