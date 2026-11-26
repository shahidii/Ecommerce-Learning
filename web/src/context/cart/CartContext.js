import { createContext } from 'react'

// The context object only. The state lives in CartProvider.jsx, and components read it with useCart().
export const CartContext = createContext(null)
