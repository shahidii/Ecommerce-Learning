import { useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { IconButton, Logo } from '@/components/ui'
import { mainNav } from '@/constants/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { ROUTES, searchPath } from '@/routes/paths'
import { cn } from '@/utils/cn'

function SearchField({ id, className, onSearch }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleSubmit = (event) => {
    event.preventDefault()
    const q = new FormData(event.currentTarget).get('q').toString().trim()
    if (!q) return
    navigate(searchPath(q))
    onSearch?.()
  }

  return (
    // <search> is the HTML element for search areas (screen readers announce it as "search")
    <search className={className}>
      <form onSubmit={handleSubmit}>
        <label htmlFor={id} className="sr-only">
          Search products
        </label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle" />
          <input
            id={id}
            name="q"
            type="search"
            // key: when the URL's ?q= changes, React re-creates the input with the new default value
            key={searchParams.get('q') ?? ''}
            defaultValue={searchParams.get('q') ?? ''}
            placeholder="Search bottles, swaddles, toys…"
            className="h-10 w-full rounded-full border border-border bg-surface-soft pr-4 pl-10 text-sm outline-none placeholder:text-subtle focus:border-sage-500 focus:bg-white focus:ring-3 focus:ring-sage-100"
          />
        </div>
      </form>
    </search>
  )
}

const desktopLinkClass = ({ isActive }) =>
  cn('text-[0.95rem] font-medium transition-colors hover:text-sage-700', isActive ? 'text-sage-700 underline decoration-2 underline-offset-8' : 'text-bark-800')

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const { itemCount } = useCart()
  const { count: wishlistCount } = useWishlist()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <IconButton
          label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </IconButton>

        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((link) => (
              <li key={link.label}>
                {/* NavLink knows if its route is active and gives us isActive for styling + aria-current */}
                <NavLink to={link.to} className={link.to.includes('#') ? desktopLinkClass({ isActive: false }) : desktopLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SearchField id="site-search" className="mr-2 hidden w-64 md:block xl:w-80" />
          <IconButton label="Wishlist" to={ROUTES.WISHLIST} count={wishlistCount} className="max-sm:hidden">
            <Heart />
          </IconButton>
          {isAuthenticated ? (
            <NavLink to={ROUTES.PROFILE} aria-label={`Your account, ${user.name}`} className="rounded-full p-1 hover:bg-surface">
              <img src={user.avatar} alt="" className="size-8 rounded-full" />
            </NavLink>
          ) : (
            <IconButton label="Log in" to={ROUTES.LOGIN}>
              <User />
            </IconButton>
          )}
          <IconButton label="Cart" to={ROUTES.CART} count={itemCount}>
            <ShoppingBag />
          </IconButton>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-4 pt-4 pb-6 lg:hidden">
          <SearchField id="mobile-search" className="md:hidden" onSearch={closeMenu} />
          <nav aria-label="Mobile">
            <ul className="mt-2 flex flex-col">
              {[...mainNav, { label: `Wishlist (${wishlistCount})`, to: ROUTES.WISHLIST }].map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to} onClick={closeMenu} className="block border-b border-border py-3.5 font-serif text-xl">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
