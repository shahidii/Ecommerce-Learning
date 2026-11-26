import AuthProvider from './auth/AuthProvider'
import CartProvider from './cart/CartProvider'
import WishlistProvider from './wishlist/WishlistProvider'

/** Every global provider in one place, so main.jsx stays short. */
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
