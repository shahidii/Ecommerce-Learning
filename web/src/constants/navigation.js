import { ROUTES, shopPath } from '@/routes/paths'

// Links used by the Navbar and Footer. Paths come from routes/paths.js.
export const mainNav = [
  { label: 'Shop', to: ROUTES.SHOP },
  { label: 'Categories', to: ROUTES.CATEGORIES },
  { label: 'Shop by age', to: '/#age' },
  { label: 'About', to: ROUTES.ABOUT },
]

export const footerNav = [
  {
    title: 'Shop',
    links: [
      { label: 'Organic clothing', to: shopPath({ category: 'organic-clothing' }) },
      { label: 'Feeding essentials', to: shopPath({ category: 'feeding-essentials' }) },
      { label: 'Sleep & nursery', to: shopPath({ category: 'sleep-nursery' }) },
      { label: 'Bath & skincare', to: shopPath({ category: 'bath-skincare' }) },
      { label: 'Toys & development', to: shopPath({ category: 'toys-development' }) },
    ],
  },
  {
    title: 'Your account',
    links: [
      { label: 'Log in', to: ROUTES.LOGIN },
      { label: 'Create an account', to: ROUTES.SIGNUP },
      { label: 'Wishlist', to: ROUTES.WISHLIST },
      { label: 'Cart', to: ROUTES.CART },
    ],
  },
  {
    title: 'Little Nest',
    links: [
      { label: 'Our story', to: ROUTES.ABOUT },
      { label: 'Shop by age', to: '/#age' },
      { label: 'New arrivals', to: shopPath({ sort: 'newest' }) },
    ],
  },
]
