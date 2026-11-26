import { Check, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import { Badge, Price, Rating } from '@/components/ui'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { productPath } from '@/routes/paths'
import { cn } from '@/utils/cn'

/**
 * One product in a grid. Uses the API product shape:
 * { id, slug, title, thumbnail, price, mrp, discountPercentage, rating, reviewsCount, inStock, ageGroups, … }
 */
export default function ProductCard({ product, className }) {
  const { addToCart, getQuantity } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const saved = isWishlisted(product.id)
  const inCart = getQuantity(product.id) > 0
  const ages = product.ageGroups?.map((age) => age.name).join(', ')

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className={cn('size-full object-cover', !product.inStock && 'opacity-60 grayscale-[40%]')}
        />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {!product.inStock && <Badge variant="neutral">Out of stock</Badge>}
          {product.inStock && product.discountPercentage >= 30 && <Badge variant="blush">{product.discountPercentage}% off</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
          aria-pressed={saved}
          className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-bark-800 shadow-soft hover:text-accent"
        >
          <Heart className={cn('size-5', saved && 'fill-accent text-accent')} />
        </button>
      </div>

      <div className="mt-3.5 flex flex-1 flex-col gap-1.5 px-1">
        {ages && <p className="text-xs text-muted">{ages}</p>}
        <h3 className="font-sans text-[0.95rem] leading-snug font-semibold">
          {/* after:absolute after:inset-0 stretches this link over the whole card */}
          <Link to={productPath(product.slug)} className="line-clamp-2 after:absolute after:inset-0 hover:underline">
            {product.title}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviewsCount} />

        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <Price price={product.price} mrp={product.mrp} size="sm" showDiscount={false} />
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            aria-label={inCart ? `Add another ${product.title} to cart` : `Add ${product.title} to cart`}
            className={cn(
              'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:bg-surface disabled:text-subtle',
              inCart ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-primary-soft text-sage-800 hover:bg-primary hover:text-white',
            )}
          >
            {inCart ? <Check className="size-4.5" /> : <ShoppingBag className="size-4.5" />}
          </button>
        </div>
      </div>
    </article>
  )
}
