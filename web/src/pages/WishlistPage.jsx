import { Heart, ShoppingBag, X } from 'lucide-react'
import { Link } from 'react-router'
import EmptyState from '@/components/feedback/EmptyState'
import { Badge, Breadcrumbs, Button, Container, Price } from '@/components/ui'
import { useCart } from '@/hooks/useCart'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { ROUTES, productPath } from '@/routes/paths'
import { cn } from '@/utils/cn'

export default function WishlistPage() {
  usePageTitle('Wishlist')
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const moveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }
  const inStockItems = items.filter((product) => product.inStock)

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Wishlist' }]} />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl">Your wishlist</h1>
          {items.length > 0 && <p className="mt-2 text-muted">{items.length} saved items. We'll keep them here for you.</p>}
        </div>
        {inStockItems.length > 1 && (
          <Button variant="secondary" onClick={() => inStockItems.forEach(moveToCart)}>
            <ShoppingBag aria-hidden className="size-4.5" />
            Move all to cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          description="Tap the heart on any product to keep it here for later."
          action={<Button to={ROUTES.SHOP}>Find something lovely</Button>}
          className="mt-10"
        />
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <li key={product.id} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
                <img src={product.thumbnail} alt="" loading="lazy" className={cn('size-full object-cover', !product.inStock && 'opacity-60')} />
                {!product.inStock && <Badge className="absolute top-3 left-3">Out of stock</Badge>}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Remove ${product.title} from wishlist`}
                  className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-soft hover:text-blush-700"
                >
                  <X className="size-4.5" />
                </button>
              </div>
              <h2 className="mt-3.5 px-1 font-sans text-[0.95rem] leading-snug font-semibold">
                <Link to={productPath(product.slug)} className="line-clamp-2 hover:underline">
                  {product.title}
                </Link>
              </h2>
              <Price price={product.price} mrp={product.mrp} size="sm" className="mt-1.5 px-1" />
              <Button size="sm" className="mt-4 w-full" disabled={!product.inStock} onClick={() => moveToCart(product)}>
                {product.inStock ? 'Move to cart' : 'Out of stock'}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
