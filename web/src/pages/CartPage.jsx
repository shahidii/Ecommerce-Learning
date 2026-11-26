import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import EmptyState from '@/components/feedback/EmptyState'
import { Breadcrumbs, Button, Container, Price, QuantitySelector } from '@/components/ui'
import { FREE_SHIPPING_ABOVE, MAX_QUANTITY_PER_ITEM } from '@/constants/shop'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { ROUTES, productPath } from '@/routes/paths'
import { formatPrice } from '@/utils/formatPrice'

export default function CartPage() {
  usePageTitle('Cart')
  const { items, itemCount, subtotal, savings, shipping, total, amountToFreeShipping, setQuantity, removeFromCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  const moveToWishlist = (product) => {
    if (!isWishlisted(product.id)) toggleWishlist(product)
    removeFromCart(product.id)
  }

  if (items.length === 0) {
    return (
      <Container className="py-10">
        <Breadcrumbs items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Cart' }]} />
        <h1 className="mt-6 text-4xl sm:text-5xl">Your cart</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add a few favourites and they'll wait for you here, even if you close the tab."
          action={<Button to={ROUTES.SHOP}>Start shopping</Button>}
          className="mt-10"
        />
      </Container>
    )
  }

  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_ABOVE) * 100))

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Cart' }]} />
      <h1 className="mt-6 text-4xl sm:text-5xl">Your cart</h1>
      <p className="mt-2 text-muted">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem]">
        <section aria-label="Cart items">
          <div className="mb-6 rounded-2xl bg-primary-soft p-4 text-sm text-sage-800">
            <p className="font-semibold">{shipping === 0 ? 'Your order ships free.' : `Add ${formatPrice(amountToFreeShipping)} more for free delivery.`}</p>
            <progress
              value={progress}
              max={100}
              aria-label="Progress to free delivery"
              className="mt-2.5 block h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary"
            />
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 py-6 sm:gap-6">
                <img src={product.thumbnail} alt="" className="size-24 shrink-0 rounded-2xl object-cover sm:size-32" />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                    <div>
                      <h2 className="font-sans text-base font-semibold">
                        <Link to={productPath(product.slug)} className="hover:underline">
                          {product.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted">{product.category?.name}</p>
                    </div>
                    <Price price={product.price * quantity} mrp={product.mrp * quantity} size="sm" showDiscount={false} />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                    <QuantitySelector
                      value={quantity}
                      onChange={(next) => setQuantity(product.id, next)}
                      max={Math.min(product.stock || MAX_QUANTITY_PER_ITEM, MAX_QUANTITY_PER_ITEM)}
                      size="sm"
                      label={`Quantity of ${product.title}`}
                    />
                    <button
                      type="button"
                      onClick={() => moveToWishlist(product)}
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
                    >
                      <Heart aria-hidden className="size-4" />
                      Move to wishlist
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-blush-700"
                    >
                      <Trash2 aria-hidden className="size-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Button variant="link" to={ROUTES.SHOP} className="mt-6">
            Continue shopping
          </Button>
        </section>

        <aside aria-label="Order summary" className="h-fit rounded-pebble bg-surface p-7 lg:sticky lg:top-28">
          <h2 className="text-2xl">Order summary</h2>
          <dl className="mt-6 flex flex-col gap-3 text-[0.95rem]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal ({itemCount} items)</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">You save</dt>
              <dd className="font-medium text-sage-700">−{formatPrice(savings)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-border-strong pt-4 text-lg">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">{formatPrice(total)}</dd>
            </div>
          </dl>

          {isAuthenticated ? (
            <>
              <Button size="lg" className="mt-6 w-full" disabled>
                Checkout
              </Button>
              <p className="mt-3 text-center text-xs text-muted">Checkout and orders are built in a later phase.</p>
            </>
          ) : (
            <>
              <Button size="lg" className="mt-6 w-full" to={ROUTES.LOGIN} state={{ from: { pathname: ROUTES.CART } }}>
                Log in to check out
              </Button>
              <p className="mt-3 text-center text-xs text-muted">Your cart stays saved while you log in.</p>
            </>
          )}
        </aside>
      </div>
    </Container>
  )
}
