import { cn } from '@/utils/cn'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 4, className, ...props }) {
  const cols = {
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-3 lg:grid-cols-4',
  }[columns]

  return (
    <ul className={cn('grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6', cols, className)} {...props}>
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} className="w-full" />
        </li>
      ))}
    </ul>
  )
}
