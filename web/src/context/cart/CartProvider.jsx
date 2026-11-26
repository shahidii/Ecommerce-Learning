import { useEffect, useMemo, useReducer } from 'react'
import { FREE_SHIPPING_ABOVE, SHIPPING_FEE } from '@/constants/shop'
import { readJSON, writeJSON } from '@/utils/storage'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'

const STORAGE_KEY = 'little-nest.cart'

/** The shopping cart, saved in localStorage so it survives a reload. (Syncing with the API is a later phase.) */
export default function CartProvider({ children }) {
  // The 3rd argument runs once to build the first state: read the saved cart
  const [items, dispatch] = useReducer(cartReducer, [], () => readJSON(STORAGE_KEY, []))

  useEffect(() => {
    writeJSON(STORAGE_KEY, items)
  }, [items])

  const value = useMemo(() => {
    // Totals are calculated from the items, never stored separately (one source of truth)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const mrpTotal = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE

    return {
      items,
      itemCount,
      subtotal,
      savings: mrpTotal - subtotal,
      shipping,
      total: subtotal + shipping,
      amountToFreeShipping: Math.max(0, FREE_SHIPPING_ABOVE - subtotal),
      getQuantity: (id) => items.find((item) => item.product.id === id)?.quantity ?? 0,
      addToCart: (product, quantity = 1) => dispatch({ type: 'ADD', product, quantity }),
      setQuantity: (id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }
  }, [items])

  return <CartContext value={value}>{children}</CartContext>
}
