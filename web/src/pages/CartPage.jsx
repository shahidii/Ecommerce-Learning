import { Heart, Tag, Trash2 } from 'lucide-react'
import { Breadcrumbs, Button, Container, Input, Price, QuantitySelector } from '@/components/ui'
import { cartItems, FREE_SHIPPING_ABOVE, SHIPPING_FEE } from '@/data/cart'
import { formatPrice } from '@/utils/formatPrice'

// Totals are simple maths on the dummy cart (later this moves into a cart hook)
const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
const mrpTotal = cartItems.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0)
const savings = mrpTotal - subtotal
const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE
const total = subtotal + shipping
const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_ABOVE) * 100))

export default function CartPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '#home' }, { label: 'Cart' }]} />
      <h1 className="mt-6 text-4xl sm:text-5xl">Your cart</h1>
      <p className="mt-2 text-muted">{itemCount} items</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem]">
        <section aria-label="Cart items">
          <div className="mb-6 rounded-2xl bg-primary-soft p-4 text-sm text-sage-800">
            <p className="font-semibold">
              {shipping === 0 ? 'Your order ships free.' : `Add ${formatPrice(FREE_SHIPPING_ABOVE - subtotal)} more for free delivery.`}
            </p>
            <progress
              value={progress}
              max={100}
              aria-label="Progress to free delivery"
              className="mt-2.5 block h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary"
            />
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 py-6 sm:gap-6">
                <img src={product.thumbnail} alt={product.title} className="size-24 shrink-0 rounded-2xl object-cover sm:size-32" />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                    <div>
                      <h2 className="font-sans text-base font-semibold">
                        <a href="#product" className="hover:underline">
                          {product.title}
                        </a>
                      </h2>
                      <p className="text-sm text-muted">{product.category.name}</p>
                    </div>
                    <Price price={product.price * quantity} mrp={product.mrp * quantity} size="sm" showDiscount={false} />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                    <QuantitySelector value={quantity} size="sm" label={`Quantity of ${product.title}`} />
                    <button type="button" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
                      <Heart aria-hidden className="size-4" />
                      Move to wishlist
                    </button>
                    <button type="button" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-blush-700">
                      <Trash2 aria-hidden className="size-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Button variant="link" href="#shop" className="mt-6">
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

          <form className="mt-6 flex items-end gap-2" onSubmit={(event) => event.preventDefault()}>
            <Input label="Promo code" placeholder="e.g. NEST10" icon={Tag} className="flex-1" />
            <Button type="submit" variant="outline" className="h-12">
              Apply
            </Button>
          </form>

          <Button size="lg" className="mt-6 w-full">
            Checkout
          </Button>
          <p className="mt-3 text-center text-xs text-muted">Taxes included. Delivery in 3–5 days.</p>
        </aside>
      </div>
    </Container>
  )
}
