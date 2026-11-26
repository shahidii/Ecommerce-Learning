import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { NavLink } from 'react-router'
import { ROUTES, productPath, searchPath, shopPath } from '@/routes/paths'
import { cn } from '@/utils/cn'

/**
 * DEVELOPMENT ONLY: one click to any page while building and teaching.
 * It uses real router links, so the URL changes and Back works.
 * RootLayout only loads it when `import.meta.env.DEV` is true, so it is not in the production build.
 */
const previewPages = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Shop', to: ROUTES.SHOP },
  { label: 'Filtered shop', to: shopPath({ category: 'feeding-essentials', ageGroup: 'newborn' }) },
  { label: 'Product', to: productPath('convertible-wooden-high-chair') },
  { label: 'Categories', to: ROUTES.CATEGORIES },
  { label: 'Search', to: searchPath('teddy') },
  { label: 'Cart', to: ROUTES.CART },
  { label: 'Wishlist', to: ROUTES.WISHLIST },
  { label: 'Profile', to: ROUTES.PROFILE }, // redirects to Login when logged out (ProtectedRoute)
  { label: 'About', to: ROUTES.ABOUT },
  { label: 'Login', to: ROUTES.LOGIN }, // redirects away when logged in (GuestRoute)
  { label: 'Signup', to: ROUTES.SIGNUP },
  { label: '404', to: '/this-page-does-not-exist' },
]

export default function PagePreviewBar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Spacer so the fixed bar never hides the bottom of the footer */}
      <div aria-hidden className="h-20" />

      <nav
        aria-label="Page preview"
        className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-1 overflow-x-auto rounded-full border border-bark-800 bg-bark-900 p-1.5 text-sm shadow-soft"
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Hide page preview' : 'Show page preview'}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 font-medium whitespace-nowrap text-bark-300 hover:bg-bark-800 hover:text-oat-100"
        >
          {isOpen ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
          Preview
        </button>

        {isOpen &&
          previewPages.map((page) => (
            <NavLink
              key={page.label}
              to={page.to}
              end
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-1.5 font-medium whitespace-nowrap transition-colors',
                  isActive ? 'bg-milk text-bark-900' : 'text-oat-100 hover:bg-bark-800',
                )
              }
            >
              {page.label}
            </NavLink>
          ))}
      </nav>
    </>
  )
}
