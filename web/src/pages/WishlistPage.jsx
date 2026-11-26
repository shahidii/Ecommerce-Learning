import { Bell, ShoppingBag, X } from 'lucide-react'
import { Badge, Breadcrumbs, Button, Container, Price } from '@/components/ui'
import { wishlistItems } from '@/data/wishlist'
import { cn } from '@/utils/cn'

export default function WishlistPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '#home' }, { label: 'Wishlist' }]} />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl">Your wishlist</h1>
          <p className="mt-2 text-muted">{wishlistItems.length} saved items. We'll keep them here for you.</p>
        </div>
        <Button variant="secondary">
          <ShoppingBag aria-hidden className="size-4.5" />
          Move all to cart
        </Button>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {wishlistItems.map((product) => (
          <li key={product.id} className="flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
              <img src={product.thumbnail} alt={product.title} loading="lazy" className={cn('size-full object-cover', !product.inStock && 'opacity-60')} />
              {!product.inStock && <Badge className="absolute top-3 left-3">Out of stock</Badge>}
              <button
                type="button"
                aria-label={`Remove ${product.title} from wishlist`}
                className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-soft hover:text-blush-700"
              >
                <X className="size-4.5" />
              </button>
            </div>
            <h2 className="mt-3.5 px-1 font-sans text-[0.95rem] leading-snug font-semibold">
              <a href="#product" className="line-clamp-2 hover:underline">
                {product.title}
              </a>
            </h2>
            <Price price={product.price} mrp={product.mrp} size="sm" className="mt-1.5 px-1" />
            {product.inStock ? (
              <Button size="sm" className="mt-4 w-full">
                Move to cart
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="mt-4 w-full">
                <Bell aria-hidden className="size-4" />
                Notify me when back
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Container>
  )
}
