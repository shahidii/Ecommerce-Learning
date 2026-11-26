// Every URL in the app lives here. Pages and links import these instead of typing '/shop' by hand,
// so renaming a route is a one-line change.
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SEARCH: '/search',
  PRODUCT: '/products/:slug',
  CATEGORIES: '/categories',
  CART: '/cart',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
}

/** Builds "/shop?category=…&ageGroup=…", skipping empty values. */
export function shopPath(params = {}) {
  return withQuery(ROUTES.SHOP, params)
}

export const productPath = (slug) => `/products/${slug}`
export const searchPath = (q) => withQuery(ROUTES.SEARCH, { q })

function withQuery(path, params) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  }
  const queryString = query.toString()
  return queryString ? `${path}?${queryString}` : path
}
