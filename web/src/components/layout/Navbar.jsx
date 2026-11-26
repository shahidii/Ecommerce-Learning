import { useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { IconButton, Logo } from '@/components/ui'
import { mainNav } from '@/constants/navigation'
import { cartItems } from '@/data/cart'
import { wishlistItems } from '@/data/wishlist'

const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

function SearchField({ className }) {
  return (
    // <search> is the HTML element for search areas (screen readers announce it as "search")
    <search className={className}>
      <form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle" />
        <input
          id="site-search"
          type="search"
          placeholder="Search bottles, swaddles, toys…"
          className="h-10 w-full rounded-full border border-border bg-surface-soft pr-4 pl-10 text-sm outline-none placeholder:text-subtle focus:border-sage-500 focus:bg-white focus:ring-3 focus:ring-sage-100"
          />
        </div>
      </form>
    </search>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <IconButton label={isMenuOpen ? 'Close menu' : 'Open menu'} className="lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X /> : <Menu />}
        </IconButton>

        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-[0.95rem] font-medium text-bark-800 transition-colors hover:text-sage-700">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SearchField className="mr-2 hidden w-64 md:block xl:w-80" />
          <IconButton label="Wishlist" count={wishlistItems.length} className="max-sm:hidden">
            <Heart />
          </IconButton>
          <IconButton label="Account">
            <User />
          </IconButton>
          <IconButton label="Cart" count={cartCount}>
            <ShoppingBag />
          </IconButton>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-4 pt-4 pb-6 lg:hidden">
          <SearchField className="md:hidden" />
          <nav aria-label="Mobile">
            <ul className="mt-2 flex flex-col">
              {[...mainNav, { label: 'Wishlist', href: '#wishlist' }].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="block border-b border-border py-3.5 font-serif text-xl">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
