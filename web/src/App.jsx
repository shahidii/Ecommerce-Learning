import { useState } from 'react'
import PagePreviewBar from '@/components/dev/PagePreviewBar'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import AboutPage from '@/pages/AboutPage'
import CartPage from '@/pages/CartPage'
import CategoriesPage from '@/pages/CategoriesPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import ProfilePage from '@/pages/ProfilePage'
import ShopPage from '@/pages/ShopPage'
import SignupPage from '@/pages/SignupPage'
import WishlistPage from '@/pages/WishlistPage'

// Phase 6: every page is plain UI with dummy data.
// We switch pages with useState only to preview them; React Router replaces this in the routing phase.
const pages = {
  home: { label: 'Home', component: HomePage },
  shop: { label: 'Shop', component: ShopPage },
  product: { label: 'Product', component: ProductDetailPage },
  categories: { label: 'Categories', component: CategoriesPage },
  cart: { label: 'Cart', component: CartPage },
  wishlist: { label: 'Wishlist', component: WishlistPage },
  profile: { label: 'Profile', component: ProfilePage },
  about: { label: 'About', component: AboutPage },
  login: { label: 'Login', component: LoginPage },
  signup: { label: 'Signup', component: SignupPage },
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const Page = pages[currentPage].component

  const showPage = (key) => {
    setCurrentPage(key)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft">
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="pb-10">
        <Page />
      </main>
      <Footer />
      <PagePreviewBar pages={pages} current={currentPage} onChange={showPage} />
    </>
  )
}
