import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import RouteErrorPage from '@/pages/RouteErrorPage'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'
import { ROUTES } from './paths'

// Code splitting: each page becomes its own JS file, downloaded the first time it's visited.
// Home (and the small error pages) are imported normally because almost everyone lands there first.
const ShopPage = lazy(() => import('@/pages/ShopPage'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const WishlistPage = lazy(() => import('@/pages/WishlistPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SignupPage = lazy(() => import('@/pages/SignupPage'))

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        // A crash in any page shows RouteErrorPage inside the layout (Navbar and Footer stay)
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ROUTES.SHOP, element: <ShopPage /> },
          { path: ROUTES.SEARCH, element: <SearchPage /> },
          { path: ROUTES.PRODUCT, element: <ProductDetailPage /> },
          { path: ROUTES.CATEGORIES, element: <CategoriesPage /> },
          { path: ROUTES.CART, element: <CartPage /> },
          { path: ROUTES.WISHLIST, element: <WishlistPage /> },
          { path: ROUTES.ABOUT, element: <AboutPage /> },

          // Logged-in users only
          { element: <ProtectedRoute />, children: [{ path: ROUTES.PROFILE, element: <ProfilePage /> }] },

          // Guests only
          {
            element: <GuestRoute />,
            children: [
              { path: ROUTES.LOGIN, element: <LoginPage /> },
              { path: ROUTES.SIGNUP, element: <SignupPage /> },
            ],
          },

          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
