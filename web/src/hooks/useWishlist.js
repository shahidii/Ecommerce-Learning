import { useContext } from 'react'
import { WishlistContext } from '@/context/wishlist/WishlistContext'

/** const { … } = useWishlist()   (must be used inside <WishlistProvider>) */
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return context
}
