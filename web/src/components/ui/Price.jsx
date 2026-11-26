import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatPrice'

/** <Price price={499} mrp={699} /> → ₹499  ~~₹699~~  29% off */
export default function Price({ price, mrp, size = 'md', showDiscount = true, className }) {
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  const priceSize = { sm: 'text-base', md: 'text-lg', lg: 'text-3xl' }[size]

  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className={cn('font-bold text-foreground', priceSize)}>{formatPrice(price)}</span>
      {discount > 0 && (
        <>
          <span className="text-sm text-subtle line-through">
            <span className="sr-only">Original price </span>
            {formatPrice(mrp)}
          </span>
          {showDiscount && <span className="text-sm font-semibold text-sage-700">{discount}% off</span>}
        </>
      )}
    </div>
  )
}
