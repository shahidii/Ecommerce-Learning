import { MAX_QUANTITY_PER_ITEM } from '@/constants/shop'

// Only keep the product fields the cart needs (smaller localStorage, no stale nested data).
export function toCartProduct(product) {
  const { id, slug, title, thumbnail, price, mrp, stock, inStock, category } = product
  return { id, slug, title, thumbnail, price, mrp, stock, inStock, category: { name: category?.name, slug: category?.slug } }
}

const clampQuantity = (quantity, product) => Math.max(1, Math.min(quantity, MAX_QUANTITY_PER_ITEM, product.stock || MAX_QUANTITY_PER_ITEM))

/**
 * A reducer is a plain function: (currentState, action) → newState.
 * All cart changes go through here, so they are easy to follow and to test.
 * state = [{ product, quantity }]
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, quantity = 1 } = action
      const existing = state.find((item) => item.product.id === product.id)
      if (existing) {
        return state.map((item) => (item.product.id === product.id ? { ...item, quantity: clampQuantity(item.quantity + quantity, item.product) } : item))
      }
      const cartProduct = toCartProduct(product)
      return [...state, { product: cartProduct, quantity: clampQuantity(quantity, cartProduct) }]
    }

    case 'SET_QUANTITY':
      return state.map((item) => (item.product.id === action.id ? { ...item, quantity: clampQuantity(action.quantity, item.product) } : item))

    case 'REMOVE':
      return state.filter((item) => item.product.id !== action.id)

    case 'CLEAR':
      return []

    default:
      throw new Error(`Unknown cart action: ${action.type}`)
  }
}
