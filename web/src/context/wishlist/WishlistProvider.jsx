import { useCallback, useEffect, useMemo, useState } from 'react'
import { readJSON, writeJSON } from '@/utils/storage'
import { toCartProduct } from '../cart/cartReducer'
import { WishlistContext } from './WishlistContext'

const STORAGE_KEY = 'little-nest.wishlist'

/** Saved products, kept in localStorage. A simple list, so useState is enough (no reducer needed). */
export default function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => readJSON(STORAGE_KEY, []))

  useEffect(() => {
    writeJSON(STORAGE_KEY, items)
  }, [items])

  const isWishlisted = useCallback((id) => items.some((product) => product.id === id), [items])

  const toggleWishlist = useCallback((product) => {
    setItems((current) =>
      current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [toCartProduct(product), ...current],
    )
  }, [])

  const removeFromWishlist = useCallback((id) => setItems((current) => current.filter((item) => item.id !== id)), [])

  const value = useMemo(
    () => ({ items, count: items.length, isWishlisted, toggleWishlist, removeFromWishlist }),
    [items, isWishlisted, toggleWishlist, removeFromWishlist],
  )

  return <WishlistContext value={value}>{children}</WishlistContext>
}
