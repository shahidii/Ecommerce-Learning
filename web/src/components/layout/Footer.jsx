import { Mail } from 'lucide-react'
import { footerNav } from '@/constants/navigation'

export default function Footer() {
  return (
    <footer className="mt-24 bg-sage-800 text-sage-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-10 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-8">
        <div className="max-w-sm">
          <p className="font-serif text-3xl text-white" style={{ fontVariationSettings: '"SOFT" 100' }}>
            Little Nest
          </p>
          <p className="mt-3 text-sage-100">
            Gentle, carefully chosen essentials for babies and toddlers, from the first cuddle to the first day of preschool.
          </p>

          <form className="mt-8" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="newsletter-email" className="text-sm font-semibold text-white">
              Get tips for each stage and early access to new arrivals
            </label>
            <div className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <Mail aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-sage-300" />
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-full border border-sage-600 bg-sage-700 pr-4 pl-10 text-sm text-white outline-none placeholder:text-sage-300 focus:border-sage-300"
                />
              </div>
              <button type="submit" className="h-11 rounded-full bg-milk px-5 text-sm font-semibold text-sage-800 hover:bg-white">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-sans text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-sage-100">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-sage-700">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-sage-200 sm:px-6 lg:px-8">
          <p>© 2026 Little Nest. A learning project built with React.</p>
          <ul className="flex items-center gap-5" aria-label="Social media">
            <li>
              <a href="#instagram" className="hover:text-white hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#youtube" className="hover:text-white hover:underline">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
