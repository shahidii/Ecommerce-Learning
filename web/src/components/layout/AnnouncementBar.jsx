import { RotateCcw, Truck } from 'lucide-react'
import { FREE_SHIPPING_ABOVE } from '@/constants/shop'
import { formatPrice } from '@/utils/formatPrice'

export default function AnnouncementBar() {
  return (
    <div className="bg-sage-100 text-sm text-sage-800">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-8 gap-y-1 px-4 py-2 max-sm:flex-col">
        <p className="flex items-center gap-2">
          <Truck aria-hidden className="size-4" />
          Free delivery on orders above {formatPrice(FREE_SHIPPING_ABOVE)}
        </p>
        <p className="flex items-center gap-2 max-sm:hidden">
          <RotateCcw aria-hidden className="size-4" />
          Easy returns within 30 days
        </p>
      </div>
    </div>
  )
}
