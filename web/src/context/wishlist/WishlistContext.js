import { createContext } from 'react'

// The context object only. The state lives in WishlistProvider.jsx, and components read it with useWishlist().
export const WishlistContext = createContext(null)
